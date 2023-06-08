"use client";

import "@fontsource/poppins"
import theme from "./theme"
import { AppProps } from "next/app"
import Navbar from "./components/Navbar"
import { ChakraProvider } from "@chakra-ui/react"
import { Toaster, toast } from "react-hot-toast"
import App from "./pages";
import Question from "./components/Question"


function MyApp({Component, pageProps}: AppProps){
    return(
        <ChakraProvider theme={theme}>
            <Navbar />
            {/* <Component {...pageProps} /> */}
            <Toaster position="bottom-right" />
            {/* <Question /> */}
            <App />
        </ChakraProvider>
    )
}

export default MyApp











// import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
// import { Toaster, toast } from "react-hot-toast";
// import theme from "./theme";
// import Comments from "./components/Comments";

// export default function Home() {
//   return (
//     <ChakraProvider theme={theme}>
//       <Box p={8} maxW="600px" minW="320px" m="0 auto">
//         <Comments topic="my-blog-post" />
//         <Toaster position="bottom-right" />
//       </Box>
//     </ChakraProvider>
//   )
// }
