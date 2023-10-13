import {makeNum} from "../utils/number-utils"
import type { BigNumber } from "ethers"
import ABI from "../ABI/Token.json"

const address = "0x321aC693099C9FEc5E27e3E245D8A85B793abC6b"
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")

export enum TokenEvent {
    Transfer = 'Transfer',
    Mint = 'Mint',
}

export type Amount = BigNumber

export interface Transfer {
    from: string;
    to: string;
    amount: BigNumber;
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

const useTokenContract = () => {
    const contract = new web3.eth.Contract(ABI.abi, address)

    // const getBalance =async (address:string) : Promise<string> => {
    //     const userBalanceBN = await contract.methods.balanceOf(address).call()
    //     return makeNum(userBalanceBN)
    // }

    const approve =async (address:string, amount: BigNumber) : Promise<void> => {
        const tx = await contract.methods.approve(address, amount).send({
            from: account
        })
    }

    const mint = async (amount:BigNumber): Promise<void> => {
        console.log("inside mint function")
        const tx = await contract.methods.mint(amount).send({
            from: account
        })
    }

    return {
        contract,
        mint,
        approve,
        // getBalance
    }
}

export default useTokenContract