import { BigNumber, Contract, constants } from "ethers"
import { useEffect } from "react"
import useTokenContract, {TokenEvent} from "./useTokenContract"
import useForumContract, {Answer, ForumEvent} from "./useFormContract"
import { makeNum } from "@/utils/number-utils"
import truncateMiddle from "truncate-middle"

interface useEventsQuery {
    questionId?: BigNumber
}

const useEvents = ({questionId}: useEventsQuery, updateFun: any) => {
    const forumContract = useForumContract()
    const tokenContract = useTokenContract()

    useEffect(() => {

        console.log(tokenContract.contract.events.Transfer)

        const questionHandler = (question: any) => {
            console.log("What's the question?", question)
            updateFun()
        }

        const answerHandler = (answer: any) => {
            console.log(answer.returnValues.answer['questionId'])
            if(questionId){
                const answerQIdNumber = answer.returnValues.answer['questionId']
                const questionIdNumber = questionId.toString()
                const answerIdNumber = answer.returnValues.answer['answerId']

                console.log(answerQIdNumber, questionIdNumber)
                if(answerQIdNumber !== questionIdNumber){
                    return
                }

                // this function should be called from correct components for answered and upvoted
                updateFun()
            }
        }

        const transferHandler = (emittedEvent: any) => {
            // console.log("transfer handler called")  ---- Dunno why but these funcitons are getting called 36 time when emitted
            console.log(emittedEvent)
            const from = emittedEvent.returnValues['from']
            const to = emittedEvent.returnValues['to']
            const amount = emittedEvent.returnValues['value']

            console.log(from, to, amount)

            if(to === forumContract.contract.address){
                console.log(`Transferred ${makeNum(amount)} Token to Forum Contract`)
            }else if(from === constants.AddressZero){
                console.log(`Minted ${makeNum(amount)} Token to : ${truncateMiddle(to, 6, 5, '...')}`)
            }else{
                console.log(`Transferred ${makeNum(amount)} Token to : ${truncateMiddle(to, 6, 5, '...')}`)
            }
        }

        const QuestionListener = forumContract.contract.events.QuestionAdded({}, (err: any, event: any) => {
            if(err) {
                console.log(err)
            }
        })
        .on("connected", function(subscriptionId: any) {
            console.log(subscriptionId)
        })
        .on("data", questionHandler)

        const AnswerListener = forumContract.contract.events.AnswerAdded({}, (err: any, event: any) => {
            if(err) {
                console.log(err)
            }
        })
        .on("connected", function(subscriptionId: any) {
            console.log(subscriptionId)
        })
        .on("data", answerHandler)

        const upVotedListener = forumContract.contract.events.AnswerUpvoted({}, (err: any, event: any) => {
            if(err) {
                console.log(err)
            }
        })
        .on("connected", function(subscriptionId: any) {
            console.log(subscriptionId)
        })
        .on("data", answerHandler)

        const transferListener = tokenContract.contract.events.Transfer({}, (err: any, event: any) => {
            if(err) {
                console.log(err)
            }
        })
        .on("connected", function(subscriptionId: any) {
            console.log(subscriptionId)
        })
        .on("data", transferHandler)

        return () => {
            QuestionListener.unsubscribe()
            AnswerListener.unsubscribe()
            upVotedListener.unsubscribe()
            transferListener.unsubscribe()
        }
    }, [questionId])
}

export default useEvents