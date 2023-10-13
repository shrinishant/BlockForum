import { BigNumber } from "ethers"
import ABI from "../ABI/Forum.json"

const address = "0x23206B5d3967dA1eCAe53cbA3f728deB1d246FEc"

const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")

export enum ForumEvent {
    QuestionAdded = 'QuestionAdded',
    AnswerAdded = 'AnswerAdded',
    AnswerUpvoted = 'AnswerUpvoted',
}

export interface Question {
    questionId: BigNumber;
    message: string;
    creatorAddress: string;
    timeStamp: BigNumber;
}

export interface Answer {
    answerId: BigNumber;
    questionId: BigNumber;
    creatorAddress: string;
    message: string;
    timeStamp: BigNumber;
    upVotes: BigNumber;
}

let account: String = ""

const accountFun = () => {
    web3.eth.getAccounts()
    .then((accounts: any) => {
        account = accounts[0]
    })
    .catch((e: any) => console.log(e))
}

accountFun()

const useForumContract = () => {
    const contract = new web3.eth.Contract(ABI.abi, address)

    const getAllQuestions = async (): Promise<Question[]> => {
        const query = await contract.methods.getQuestions().call()
        console.log(query, "questions")
        const questions : Question [] = query.map((q : Question) => {
            const question: Question = {
                questionId: q.questionId,
                message: q.message,
                creatorAddress: q.creatorAddress,
                timeStamp: q.timeStamp
            }
            return question
        })
        console.log(questions, "questions formatted")
        return questions
    }

    const getAnswers =async (questionId : BigNumber) : Promise<Answer[]> => {
        const answerIds: BigNumber[] = await contract.methods.getAnswersPerQuestion(questionId).call()
        let ans : Answer[] = []

        for(let i = 0; i < answerIds.length; i++){
            const answer = await contract.methods.answers(answerIds[i]).call()
            const ansr: Answer = {
                questionId: answer.questionId,
                message: answer.message,
                creatorAddress: answer.creatorAddress,
                timeStamp: answer.timeStamp,
                upVotes: answer.upVotes,
                answerId: answer.answerId
            }
            ans.push(ansr)
        }

        console.log(ans)
        return ans
    }

    const getUpVotes = async (answerId: BigNumber) : Promise<Number> => {
        const upVotes = await contract.methods.getUpVotes(answerId).call()
        // console.log(answerId, upVotes)
        return upVotes
    }

    const postQuestion =async (message: string) : Promise<void> => {
        const post = await contract.methods.postQuestion(message).send({
            from: account
        })
    }

    const postAnswer =async (questionId:BigNumber, message: string, account: string) : Promise<void> => {
        const answer = await contract.methods.postAnswer(questionId, message).send({
            from: account
        })
    }

    const upVoteAnswer =async (answerId:BigNumber, account: string) : Promise<void> => {
        const tx = await contract.methods.upvoteAnswer(answerId).send({
            from: account
        })
    }

    return {
        contract,
        getAllQuestions,
        getAnswers,
        getUpVotes,
        postQuestion,
        postAnswer,
        upVoteAnswer,
    }
}

export default useForumContract