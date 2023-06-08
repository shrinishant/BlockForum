import type { NextPage } from 'next'
import * as React from 'react'
import { Box, Center, Icon, Spinner, Stack } from '@chakra-ui/react'
import { FaCommentDollar } from 'react-icons/fa'
import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import useForumContract, {Question as QuestionStruct} from '@/app/hooks/useFormContract'

const Test: NextPage = () => {
  const [questionId, setQuestionId] = React.useState<BigNumber | undefined>()
  const router = useRouter()

  const query = useForumContract()
  const [questions, setQuestions] = React.useState<QuestionStruct[]>([])

  React.useEffect(() => {
    // If we refresh the URL `/question/[id]` in our browser,
    // router.query.id may be undefined for a moment. Therefore,
    // we wait for the useRouter hook before setting the questionId
    if (router.isReady) {
      setQuestionId(BigNumber.from(router.query.id))
    }
  }, [router.isReady, router.query.id])

  React.useEffect(() => {
    query.getAllQuestions().then((r) => {
        setQuestions(r)
    })
    .catch((e) => console.log(e))
  }, [])

  return (
    <Box p={3} pt={8} maxW='600px' minW='320px' m='0 auto'>
      {/* {questionQuery.isLoading && (
        <Center p={8}>
          <Spinner />
        </Center>
      )} */}
      {questions.length > 0 && (
        <Stack spacing={2}>
          <Box mb={5}>
            {/* <Question {...questions} /> */}
          </Box>
          <Center pt='8px' height='20px'>
            <Icon as={FaCommentDollar} alignSelf='center' />
          </Center>
          <Box p={8} maxW='600px' minW='320px' m='0 auto'>
            Nishant
          </Box>
        </Stack>
      )}
    </Box>
  )
}

export default Test