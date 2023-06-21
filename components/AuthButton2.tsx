import * as React from 'react'
import toast from 'react-hot-toast'
import { Button, ButtonProps } from '@chakra-ui/react'
const Web3 = require('web3')
import { useEffect, useState } from "react"

interface AuthButtonProps extends ButtonProps {
  text: string
}

const AuthButton: React.FunctionComponent<AuthButtonProps> = ({ text, ...props }) => {
    const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")
    const [account, setAccount] = useState("")
    const [isMetaMask, setIsMetaMask] = useState(false)
    const [btnText, setBtnText] = React.useState('Sign In')


    const accountFun = () => {
        web3.eth.getAccounts()
          .then((accounts: any) => setAccount(accounts[0]))
          .catch((e: any) => console.log(e))
          console.log(account?.length, "length")
      }
      
      useEffect(() => {
          accountFun()
      }, [accountFun])
  
      useEffect(() => {
        // console.log(web3.currentProvider)
        if(typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask){
            setIsMetaMask(true)
            setBtnText(text)
            console.log("metamask installed")
        }else{
          setIsMetaMask(false)
          console.log("no extension")
          setBtnText('Sign In')
          showToast()
        }

        if(typeof web3 !== 'undefined'){
          web3.eth.net.isListening().then(() => {
            console.log("Metamask is connected")
          })
          .catch((error: any) => {
            console.error('Error: ', error)
            console.log("Metamask is not connected")

            console.log(web3.eth.getChainId())
            if(web3.eth.getChainId() !== '0x89'){
              toast.error('Please Connect to the Polygon Mumbai test Network', {
                id: 'network-error'
              })
            }
          })
        }
      }, [text, web3])

      const showToast = () => {
        setTimeout(() => {
          toast.error("MetaMask extension required to sign in")
        }, 300);
      }

  if (isMetaMask) {
    return <Button {...props}>{btnText}</Button>
  } else {
    return (
      <Button
        {...props}
        onClick={async () => {
          !isMetaMask && await window.ethereum.request({ method: 'eth_requestAccounts' })
        }}
      >
        {btnText}
      </Button>
    )
  }
}

export default AuthButton