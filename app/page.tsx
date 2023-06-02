"use client";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";
import theme from "./theme";
import Comments from "./components/Comments";

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Box p={8} maxW="600px" minW="320px" m="0 auto">
        <Comments topic="my-blog-post" />
        <Toaster position="bottom-right" />
      </Box>
    </ChakraProvider>
  )
}
