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
        const questionHandler = (question: any) => {
            console.log("What's the question?", question)
            updateFun()
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

        return () => {
            QuestionListener.unsubscribe()
        }
    }, [])
}

export default useEvents