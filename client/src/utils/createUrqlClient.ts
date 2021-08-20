import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import {
	LoginMutation,
	MeQuery,
	MeDocument,
	RegisterMutation,
	LogoutMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
	url: "http://localhost:4000/graphql",
	fetchOptions: {
		credentials: "include" as const,
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			updates: {
				Mutation: {
					login: (result, args, cache, info) => {
						betterUpdateQuery<LoginMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							result,
							(r, q) => {
								if (r.login.errors) {
									return q;
								} else {
									return {
										me: r.login.user,
									};
								}
							}
						);
					},
					register: (result, args, cache, info) => {
						betterUpdateQuery<RegisterMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							result,
							(r, q) => {
								if (r.register.errors) {
									return q;
								} else {
									return {
										me: r.register.user,
									};
								}
							}
						);
					},
					logout: (result, args, cache, info) => {
						betterUpdateQuery<LogoutMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							result,
							() => ({ me: null })
						);
					},
				},
			},
		}),
		fetchExchange,
		ssrExchange,
	],
});
