import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
	varient?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
	children,
	varient = "regular",
}) => {
	return (
		<Box
			mt={8}
			mx="auto"
			maxW={varient === "regular" ? "800px" : "300px"}
			w="100%"
		>
			{children}
		</Box>
	);
};
