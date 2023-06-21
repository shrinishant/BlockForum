import * as React from 'react'
import { useEffect } from 'react'
import { Icon } from '@chakra-ui/react'
import { FaArrowUp } from 'react-icons/fa'
import { Button, ButtonProps, Text } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import useForumContract from '../hooks/useFormContract'
import useTokenContract from '@/hooks/useTokenContract'
import toast from 'react-hot-toast'
import { makeBig } from '@/utils/number-utils'
import Web3 from 'web3'
import { useState } from "react"
const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

interface UpvoteButtonProps extends ButtonProps {
  answerId: BigNumber
}

const Upvote: React.FunctionComponent<UpvoteButtonProps> = ({ answerId, ...props }) => {
  const [upvoteCount, setUpvoteCount] = React.useState<Number>(0)

  const upvoteCountText = upvoteCount === 1 ? '1 Upvote' : `${upvoteCount} Upvotes`

  const query = useForumContract()
  const queryToken = useTokenContract()

  const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.maticvigil.com")
  const [account, setAccount] = useState("")

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
    const fetchUpvoteCount = async () => {
        query.getUpVotes(answerId).then((r) => {
          console.log(r)
          setUpvoteCount(r)
        })
        .catch((e) => console.log(e))
    }
    fetchUpvoteCount()
  }, [answerId, query])

  const handleClick = async () => {
    try {
      await queryToken.approve(address, makeBig(1000))
      await query.upVoteAnswer(answerId, account)
      toast.success('UpVoted')
    }catch (e: any){
      toast.error(e.data?.message || e.message)
    }
  }

  return (
    <>
      <Text fontSize='sm' color='gray.500' mx={3}>
        {upvoteCountText}
      </Text>
      <Button {...props}  onClick={handleClick}>
        <Icon as={FaArrowUp} />
      </Button>
    </>
  )
}

export default Upvote