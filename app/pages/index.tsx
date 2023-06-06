import type { NextPage } from "next"
import * as React from "react"
import { Box, Text, Stack, Image } from "@chakra-ui/react"
import useForumContract from "../hooks/useFormContract"
import { useEffect } from "react"
import { BigNumber } from "ethers"
import AuthButton from "../components/AuthButton"

const App : NextPage = () => {

    const contract = useForumContract()

    useEffect(() => {
        const fetchQuestion =async () => {
            console.log(
                "are we connecting to the contract!?: ",
                await contract.getAllQuestions(BigNumber.from(0))
            )

            console.log(
                "answers",
                await contract.getAnswers(BigNumber.from(0))
            )
        }
        fetchQuestion()
    }, [])

    return (
        <Box p={8} maxW="600px" minW="320px" m="0 auto">
            <Stack align="center">
                <Image width={300} src="https://c.tenor.com/ILZS6yuNQ3wAAAAC/yo-chris-farley.gif" />
                <Text align="center">
                    This is the beginning of a journey through the Defi universe
                    <br />
                    with our good friends at Polygon
                </Text>
                <AuthButton>Connect!</AuthButton>
            </Stack>
        </Box>
    )
}

export default App