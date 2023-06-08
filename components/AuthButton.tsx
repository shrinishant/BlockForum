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

export default function AuthButton(props : ButtonProps, text: string) {
    
    const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")
    const [account, setAccount] = useState("")
    const [isMetaMask, setIsMetaMask] = useState(false)

    // console.log(accounts)


    const accountFun = () => {
      web3.eth.getAccounts()
        .then((accounts: any) => setAccount(accounts[0]))
        .catch((e: any) => console.log(e))
        console.log(account?.length, "length")
    }
    
    useEffect(() => {
        accountFun()
    }, [])

    useEffect(() => {
      // console.log(web3.currentProvider)
      if(typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask){
          setIsMetaMask(true)
          console.log("metamask installed")
      }else{
        setIsMetaMask(false)
        console.log("no extension")
        showToast()
      }
    }, [])

    const showToast = () => {
      setTimeout(() => {
        toast.error("MetaMask extension required to sign in")
      }, 300);
    }

    const handleSignIn = async () => {
      if(isMetaMask){
        const ethereum = window.ethereum as any
        ethereum.request({ method: "eth_requestAccounts" })
        .then((r: any) => {
          console.log(r)
          accountFun()
        }).catch((e: any) => console.log(e))
        // window.ethereum.request({ method: "eth_requestAccounts" });
      }else{
        showToast()
      }
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