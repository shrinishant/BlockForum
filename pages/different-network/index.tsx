import * as React from "react"
import { Box, Center, Spinner, Stack, Heading, Button } from "@chakra-ui/react"
import Question from "@/components/Question"
import useForumContract from "@/hooks/useFormContract"
import {useState, useEffect} from "react"
import { BigNumber } from "ethers"
import QuestionEditor from "@/components/QuestionEditor"
import useEvents from "@/hooks/useEvents"
import useAccount from "@/hooks/useAccount"
import AuthButton from "@/components/AuthButton2"
const Web3 = require('web3')
import { useRouter } from "next/router"

export interface QuestionProps {
    questionId: BigNumber;
    message: string;
    creatorAddress: string;
    timeStamp: BigNumber;
}

const DifferentNetwork: React.FunctionComponent = () => {
    const [ques, setQues] = useState<QuestionProps[]>([])
    const forumContract = useForumContract()
    const account = useAccount()
    const [isUserReady, setIsUserReady] = useState(false)
    const router = useRouter()

    const updateQuestions = React.useCallback(async () => {
        if((await account.callCheckWallet()).status){
            forumContract.getAllQuestions()
                .then((results: any) => {
                    console.log(results)
                    const ques = results.map((r: QuestionProps) => {
                        const q : QuestionProps = {
                            questionId: r.questionId,
                            message: r.message,
                            creatorAddress: r.creatorAddress,
                            timeStamp: r.timeStamp
                        }
                        return q
                    })
                    console.log(ques)
                    setQues(ques)
                })
                .catch((e: any) => console.log(e))
            setIsUserReady(true)
        }else{
            setIsUserReady(false)
        }
    }, [])

    const updated = useEvents({}, updateQuestions)
    
    useEffect(() => {
        updateQuestions()
    }, [isUserReady])

    const handleNetworkChange = async () => {
        try {
            const networkId = 31337
            const hexNetworkId = '0x' + networkId.toString(16);
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: hexNetworkId }]
            });
            console.log('Network changed successfully');
            router.push("/")
        } catch (error) {
            console.error('Failed to change network:', error);
        }
    }

    return (
        <Box>
            {
                <Box p={8} maxW="600px" minW="320px" m="0 auto" textAlign="center">
                    <Box position='relative' pt='5' mb='5'>
                        <Heading lineHeight='tall' mb='2'>
                            You're not connected to the Polygon Network. Please click below to connect to Required Network
                        </Heading>
                    </Box>
                    <AuthButton
                        text='Change Network'
                        
                        onClick={handleNetworkChange}
                        />
                </Box>
            }
        </Box>
    )
}

export default DifferentNetwork