import * as React from "react"
import {Button, ButtonProps} from "@chakra-ui/react"
import toast from "react-hot-toast"
const Web3 = require('web3')
import { useEffect, useState } from "react"

interface AuthButtonProps extends ButtonProps {}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function AuthButton(props : ButtonProps) {
    
    const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")

    useEffect(() => {
      // console.log(web3.currentProvider.isMetaMask)
      if(typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask){
          console.log("metamask installed")
      }else{
        console.log("no extension")
        toast.error("MetaMask extension required to sign in")
      }
    }, [])

    // console.log(accounts)

    const [account, setAccount] = useState("")

    const accountFun = () => {
      web3.eth.getAccounts()
        .then((accounts: any) => setAccount(accounts[0]))
        .catch((e: any) => console.log(e))
        console.log(account?.length, "length")
    }
    
    useEffect(() => {
        accountFun()
    }, [])

    const handleSignIn = async () => {
      const ethereum = window.ethereum as any
      ethereum.request({ method: "eth_requestAccounts" })
      .then((r: any) => {
        console.log(r)
        accountFun()
      }).catch((e: any) => console.log(e))
      // window.ethereum.request({ method: "eth_requestAccounts" });
    }

    if(!account?.length){
      return(
        <Button
          {...props}
          onClick={() => {
            handleSignIn()
          }}
        >
           Sign In
        </Button>
      )
    }
    return ( <Button {...props}>{props.children}</Button> )
  }