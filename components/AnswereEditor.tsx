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
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  
  const [contractBalance, setContractBalance] = useState('0')
  const [accountBalance, setAccountBalance] = useState('0')

  const accountFun = () => {
    web3.eth.getAccounts()
      .then((accounts: any) => setAccount(accounts[0]))
      .catch((e: any) => console.log(e))
      console.log(account?.length, "length")
  }
  
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

  const updateBalance = () => {
    web3.eth.getBalance(contractAddress).then((data: any) => {
        console.log(data)
        setContractBalance(data)
    }).catch((e: any) => console.log(e))

    //need to use accountfun() again only while working on emitted funciton
    accountFun()
    console.log(account)
    if(account){
        web3.eth.getBalance(account).then((data: any) => {
            console.log(data, makeNum(data))
            setAccountBalance(makeNum(data))
        }).catch((e: any) => console.log(e))
    }
  }

  const questionId = questionid

  useEvents({questionId}, updateBalance)

  useEffect(() => {
    updateBalance()
  }, [account])

  return (
    <Stack spacing={3}>
      <HStack spacing={3} alignItems='start'>
        <Image borderRadius='full' boxSize='50px' fit='contain' src='../polygon-logo.png' alt='Polygon Logo' />
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