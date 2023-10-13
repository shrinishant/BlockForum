import * as React from "react"
import {Button, HStack, Stack, Textarea} from "@chakra-ui/react"
import {constants} from "ethers"
import Avatar from "@davatar/react"
import useCommentsContract from "../hooks/useCommentsContract"
import { useState, useEffect } from "react"
import AuthButton from "./AuthButton"

const Web3 = require('web3')

const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")

interface CommentEditorProps {
    topic: string
}

export default function CommentEditor ({topic} : CommentEditorProps) {

    const [message, setMessage] = useState("")
    const [account, setAccount] = useState("")
    // console.log(await web3.eth.getAccounts())

    const handleSubmit = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const contract = useCommentsContract()

        contract.addComment(topic, message, account)
        .then((result: any) => {
            setMessage("")
            console.log(result)
        })
        .catch((e) => console.log(e))
    }

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
        <>
            <Stack spacing={3}>
                <HStack spacing={3} alignItems="start">
                    {
                        account?.length && (
                            <Avatar
                                size={48}
                                address={account}
                                />
                        )
                    }
                    <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message.."
                    p={3}
                    flex={1}
                    bg="whiteAlpha.100"
                    rounded="2xl"
                    fontSize="lg"
                    />
                </HStack>
                <AuthButton
                    size="sm"
                    colorScheme="pink"
                    alignSelf="flex-end"
                    onClick={() => {
                        handleSubmit()
                    }}
                    // isLoading={mutation.isLoading}
                >
                    Submit
                </AuthButton>
                </Stack>
        </>
    )
}