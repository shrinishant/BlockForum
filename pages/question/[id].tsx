import type { NextPage } from 'next'
import * as React from 'react'
import { Box, Center, Icon, Spinner, Stack } from '@chakra-ui/react'
import { FaCommentDollar } from 'react-icons/fa'
import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import Question from '../../components/Question'
import Answers from '../../components/Answers'
import useForumContract, {Question as QuestionStruct} from '@/hooks/useFormContract'

const QuestionPage: NextPage = () => {
  const [questionId, setQuestionId] = React.useState<BigNumber>(BigNumber.from(0))
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
  }, [query])

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
            <Question {...questions[questionId?.toNumber()]} answerPage={true} />
          </Box>
          <Center pt='8px' height='20px'>
            <Icon as={FaCommentDollar} alignSelf='center' />
          </Center>
          <Box p={8} maxW='600px' minW='320px' m='0 auto'>
            {!!questionId && <Answers questionId={questionId} />}
          </Box>
        </Stack>
      )}
    </Box>
  )
}

export default QuestionPage