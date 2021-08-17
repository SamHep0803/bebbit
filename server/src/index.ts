import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { __prod__ } from "./constants";
import { MyContext } from "./types";
import mikroOrmConfig from "./mikro-orm.config";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);
	await orm.getMigrator().up();

	const app = express();

	const RedisStore = connectRedis(session);
	const redisClient = redis.createClient();

	app.use(
		session({
			name: "qid",
			store: new RedisStore({
				client: redisClient,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
				httpOnly: true,
				sameSite: "lax",
				secure: __prod__,
			},
			saveUninitialized: false,
			secret: "keyboard cat",
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({
		app,
		cors: {
			credentials: true,
		},
	});

	app.listen(4000, () => {
		console.log(
			`🚀 Server running at http://localhost:4000${apolloServer.graphqlPath}`
		);
	});
};
main().catch((err) => console.error(err));
