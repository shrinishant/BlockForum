import * as React from "react"
import { Box, Center, Spinner, Stack } from "@chakra-ui/react"
import Question from "./Question"
import useForumContract from "../hooks/useFormContract"
import {useState, useEffect} from "react"
import { BigNumber } from "ethers"

export interface QuestionProps {
    questionId: BigNumber;
    message: string;
    creatorAddress: string;
    timeStamp: BigNumber;
}

const Questions: React.FunctionComponent = () => {
    const [ques, setQues] = useState<QuestionProps[]>([])
    
    useEffect(() => {
        useForumContract().getAllQuestions()
        .then((results) => {
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
        .catch((e) => console.log(e))
    }, [])

    return (
        <Box>
            {
                ques.length > 0 && <Stack spacing={4}>
                    {
                        ques?.map((q : QuestionProps) => (
                            <Question {...q} key={q?.questionId.toNumber()} />
                        ))
                    }
                </Stack>
            }
        </Box>
    )
}

export default Questions