import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
	return (
		<>
			<NavBar />
			<div>Hello World</div>
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
