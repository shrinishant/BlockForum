import "@fontsource/poppins"
import theme from "../utils/theme"
import type { AppProps } from "next/app"
import Navbar from "../components/Navbar"
import { ChakraProvider } from "@chakra-ui/react"
import { Toaster, toast } from "react-hot-toast"
import App from "./index"
import { useEffect, useState } from "react"

function MyApp({Component, pageProps}: AppProps){

    const [refreshKey, setRefreshKey] = useState(0);
    
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: any) => {
              setRefreshKey((prevKey) => prevKey + 1)
              console.log('Active account changed:', accounts[0])
              window.location.reload()
            })
        }
    }, [])

    return(
        <ChakraProvider theme={theme}>
            <Navbar />
            <Component {...pageProps} />
            {/* <App /> */}
            <Toaster position="bottom-right" />
        </ChakraProvider>
    )
}

export default MyApp