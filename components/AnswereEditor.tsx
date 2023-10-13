import * as React from 'react'
import { HStack, Stack, Flex, Textarea, Image, Text, Spacer, Button, useToken } from '@chakra-ui/react'
import type { BigNumber } from 'ethers'
import {ethers} from "ethers"
import AuthButton2 from './AuthButton2'
import toast from 'react-hot-toast'
import useTokenContract from '@/hooks/useTokenContract'
import useForumContract from '@/hooks/useFormContract'
import { useEffect, useState } from 'react'
import { makeBig, makeNum } from '@/utils/number-utils'
import useEvents from '@/hooks/useEvents'

const Web3 = require('web3')

interface AnswerEditorProps {
  questionid: BigNumber
}


const AnswerEditor: React.FunctionComponent<AnswerEditorProps> = ({ questionid }) => {
  const [message, setMessage] = React.useState('')
  const query = useTokenContract()
  const queryForum = useForumContract()
  const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")
  const [account, setAccount] = useState("")
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  
  const [contractBalance, setContractBalance] = useState('0')
  const [accountBalance, setAccountBalance] = useState('0')

  const accountFun = React.useCallback(async () => {
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])
    if(accounts[0]){
      updateBalance(accounts[0])
    }
      console.log(accounts?.length, "length")
  }, [])
  
  useEffect(() => {
      accountFun()
  }, [])

  const isUserTippable = async () => {
    const data = await web3.eth.getBalance(account)
    const balance = Number(data)
    return balance >= 10
    
  }

  const handleFocus = async () => {
    if (!account) {
      toast.error('Please sign in to submit an answer')
      return
    }
    const tippable = await isUserTippable()
    if (!tippable) {
      toast.error(`Keep your Goflow balance above 10 tokens to receive tips 🧧`)
    } else {
      toast.success('Your balance is sufficient to receive tips 💸')
    }
  }

  const handleMint = async () => {
    try {
        const data = makeBig(10)
        await query.mint(data)
        toast.success(`Minted 10 tokens for you :) Import the GOFLOW token address to your wallet`)
    } catch (e: any) {
      toast.error(e.message)
      console.log(e)
    }
  }

  const handleClick = async () => {
    try {
      await queryForum.postAnswer(questionid, message, account)
      setMessage('')
    } catch (e: any) {
      toast.error(e.data?.message || e.message)
    }
  }

  const updateBalance = React.useCallback(async (account: string) => {
    const contractBalance = await web3.eth.getBalance(contractAddress)
    console.log(contractBalance)
    if(contractBalance){
        setContractBalance(contractBalance)
    }
    

    //need to use accountfun() again only while working on emitted funciton
    // accountFun()
    console.log(account)
    if(account){
        const accBalance = await web3.eth.getBalance(account)
        console.log(accBalance)
        if(accountBalance){
          console.log(accBalance, makeNum(accBalance))
            setAccountBalance(makeNum(accBalance))
        }
    }
  }, [])

  const questionId = questionid

  useEvents({questionId}, updateBalance)


  return (
    <Stack spacing={3}>
      <HStack spacing={3} alignItems='start'>
        <Image borderRadius='full' boxSize='50px' fit='contain' src='/matic-logo.png' alt='Polygon Logo' />
        <Textarea
          value={message}
          onFocus={handleFocus}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Submit an Answer..'
          p={3}
          flex={1}
          bg='whiteAlpha.400'
          rounded='md'
          fontSize='lg'
        />
      </HStack>
      <Flex alignItems='center'>
        <Spacer />
        <Button size='sm' mx='5px' onClick={handleMint} alignSelf='flex-end'>
          💰 Goflow Fauce
        </Button>
        <AuthButton2
          text='Submit'
          size='sm'
          colorScheme='purple'
          alignSelf='flex-end'
          onClick={handleClick}
        //   isLoading={addAnswer.isLoading}
        />
      </Flex>
      {true && (
        <Flex direction='column' alignItems='flex-end'>
          <Text fontSize='sm' mx='5px'>
            Contract Balance: {contractBalance}{' '}
          </Text>
          <Text fontSize='sm' mx='5px'>
            User Balance: {accountBalance}{' '}
          </Text>
        </Flex>
      )}
    </Stack>
  )
}

export default AnswerEditor