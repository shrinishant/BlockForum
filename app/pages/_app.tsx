import "@fontsource/poppins"
import theme from "../theme"
import type { AppProps } from "next/app"
import Navbar from "../components/Navbar"
import { ChakraProvider } from "@chakra-ui/react"
import { Toaster, toast } from "react-hot-toast"


function MyApp({Component, pageProps}: AppProps){
    return(
        <ChakraProvider theme={theme}>
            <Navbar />
            <Component {...pageProps} />
            <Toaster position="bottom-right" />
        </ChakraProvider>
    )
}

export default MyApp