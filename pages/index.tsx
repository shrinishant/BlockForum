import type { NextPage } from "next"
import * as React from "react"
import { Box, Text, Stack, Image } from "@chakra-ui/react"
import useForumContract from "../hooks/useFormContract"
import { useEffect, useState } from "react"
import { BigNumber } from "ethers"
import AuthButton from "../components/AuthButton"
import Questions from "../components/Questions"
const Web3 = require('web3')

const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")

const App : NextPage = () => {

    const [account, setAccount] = useState("")
    const contract = useForumContract()

    useEffect(() => {
        const fetchQuestion =async () => {
            console.log(
                "are we connecting to the contract!? ",
                await contract.getAllQuestions()
            )

            console.log(
                "answers",
                await contract.getAnswers(BigNumber.from(0))
            )

            // console.log(
            //     "post question",
            //     await contract.postQuestion("Is this sexy?", account)
            // )
        }
        fetchQuestion()
    }, [])

    const accountFun = () => {
        web3.eth.getAccounts()
        .then((accounts: any) => {
            setAccount(accounts[0])
        })
        .catch((e: any) => console.log(e))
    }
    
    useEffect(() => {
        accountFun()
    }, [])

    return (
        <Box p={8} maxW="600px" minW="320px" m="0 auto">
            <Box p={8} maxW="600px" minW="320px" m="0 auto">
                <Questions />
            </Box>
            {/* <Stack align="center">
                <Image width={300} src="https://c.tenor.com/ILZS6yuNQ3wAAAAC/yo-chris-farley.gif" />
                <Text align="center">
                    This is the beginning of a journey through the Defi universe
                    <br />
                    with our good friends at Polygon
                </Text>
                <AuthButton>Connect!</AuthButton>
            </Stack> */}
        </Box>
    )
}

export default App