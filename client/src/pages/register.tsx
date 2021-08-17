import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { gql, useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

interface RegisterProps {}

const REGISTER_MUTATION = gql`
	mutation Register($username: String!, $password: String!) {
		register(options: { username: $username, password: $password }) {
			errors {
				field
				message
			}
			user {
				id
				username
			}
		}
	}
`;

const Register: React.FC<RegisterProps> = ({}) => {
	const [, register] = useMutation(REGISTER_MUTATION);
	return (
		<Wrapper varient="small">
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={(values) => {
					console.log(values);
					return register(values);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name="username"
							placeholder="username"
							label="Username"
						/>
						<Box mt={2}>
							<InputField
								name="password"
								placeholder="password"
								label="Password"
								type="password"
							/>
						</Box>
						<Button
							mt={4}
							type="submit"
							colorScheme="teal"
							isLoading={isSubmitting}
						>
							register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
