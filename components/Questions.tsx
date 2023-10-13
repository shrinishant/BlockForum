import * as React from "react"
import { Box, Center, Spinner, Stack } from "@chakra-ui/react"
import Question from "./Question"
import useForumContract from "../hooks/useFormContract"
import {useState, useEffect} from "react"
import { BigNumber } from "ethers"
import QuestionEditor from "./QuestionEditor"
import useEvents from "@/hooks/useEvents"

export interface QuestionProps {
    questionId: BigNumber;
    message: string;
    creatorAddress: string;
    timeStamp: BigNumber;
}

const Questions: React.FunctionComponent = () => {
    const [ques, setQues] = useState<QuestionProps[]>([])
    const forumContract = useForumContract()

    const updateQuestions = React.useCallback(() => {
        forumContract.getAllQuestions()
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
    }, [forumContract])

    const updated = useEvents({}, updateQuestions)
    
    useEffect(() => {
        updateQuestions()
    }, [updateQuestions])

    return (
        <Box>
            {
                ques.length > 0 && <Stack spacing={4}>
                    {
                        ques?.map((q : QuestionProps) => (
                            <Question {...q} key={q?.questionId.toString()} />
                        ))
                    }
                    {<QuestionEditor />}
                </Stack>
            }
        </Box>
    )
}

export default Questions