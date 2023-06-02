const Web3 = require('web3')
const ABI = require("../../utils/Comments.json")
const address = "0x87baF730110fdc308aDc5bC73453927b33ca1e73"
const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")
import type { BigNumber } from "ethers";

const contract = new web3.eth.Contract(ABI.abi, address)

// console.log(await web3.eth.getAccounts())
// console.log(web3.givenProvider)
// const ethereum = window
// ethereum.request({ method: 'eth_requestAccounts' }).then((r: any) => console.log(r)).catch((e : any) => console.log(e))

export interface Comment {
    id: string;
    topic: string;
    message: string;
    creator_address: string;
    created_at: BigNumber;
}

export enum EventType {
    CommentAdded = "CommentAdded",
}

const useCommentsContract  = () => {
    const contract = new web3.eth.Contract(ABI.abi, address)

    const getComments =async (topic: string): Promise<Comment[]> => {
        const query = await contract.methods.getComments(topic).call()
        const comments : Comment [] = query.map((q : any) => {
            const comment: Comment = {
                id: q.id,
                topic: q.topic,
                message: q.message,
                creator_address: q.creator_address,
                created_at: q.created_at
            }
            return comment
        })
        return comments
        // return [{"id": "2", topic: "ldjfkjl"}]
    }

    const addComment =async (topic: string, message: string, account: string): Promise<void> => {
            const tx = await contract.methods.addComment(topic, message)
            .send({
                from: account
            })

            
            // await tx.wait()
    }

    return {
        contract,
        getComments,
        addComment
    }
}

export default useCommentsContract