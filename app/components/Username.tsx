// =================================

    // Not using this right now because of private network error
    // i.e. ens is not supported on private or local network
    // maybe ye sirf web3 ke saath horra h
    // will look later

// =================================

import * as React from "react"
import {Text, TextProps} from "@chakra-ui/react"
import truncateMiddle from "truncate-middle"
const Web3 = require("web3")
import { useState } from "react"

interface UsernameProps extends TextProps {
    address: string
}

const Username : React.FunctionComponent<UsernameProps> = ({address, ...otherProps}) => {
    
    const [ens, setEns] = useState("")
    
    // const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    // console.log(web3.eth.ens.registry)
    // web3.eth.ens.reverse(address).name()
    //     .then((ens: string) => setEns(ens))
    //     .catch((e : any) => console.log(e))

    return (
        <Text
            display="inline"
            textTransform={ens ? "none" : "uppercase"}
            {...otherProps}
        >
            {ens || truncateMiddle(address || "", 5, 4, "...")}
        </Text>
    )
}

export default Username