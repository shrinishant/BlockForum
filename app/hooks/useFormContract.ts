import { BigNumber } from "ethers"
import ABI from "../../../artifacts/contracts/Forum.sol/Forum.json"
const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const address_we3 = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// owner address:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// user1 address:  0x70997970C51812dc3A010C7d01b50e0d17dc79C8
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")

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

const useForumContract = () => {
    const contract = new web3.eth.Contract(ABI.abi, address)

    const getAllQuestions = async (questionId: BigNumber): Promise<Question> => {
        const questions = await contract.methods.getQuestions().call()
        console.log(questions, "questions")
        return questions
    }

    const getAnswers =async (questionId : BigNumber) : Promise<Answer[]> => {
        const answerIds: BigNumber[] = await contract.methods.getAnswersPerQuestion(questionId).call()
        let ans : Answer[] = []

        for(let i = 0; i < answerIds.length; i++){
            const answer = await contract.methods.answers(answerIds[i]).call()
            ans.push(answer)
        }

        console.log(ans)

        return ans
    }

    return {
        contract,
        getAllQuestions,
        getAnswers
    }
}

export default useForumContract