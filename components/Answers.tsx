import * as React from 'react'
import { Box, Center, Spinner, Stack } from '@chakra-ui/react'
import Answer from './Answer'
import type { BigNumber } from 'ethers'
import useForumContract, { Answer as AnswerStruct } from "../hooks/useFormContract"
import AnswerEditor from './AnswereEditor'
import useEvents from '@/hooks/useEvents'

interface AnswersProps {
  questionId: BigNumber
}

const Answers: React.FunctionComponent<AnswersProps> = ({ questionId }) => {
  const [sortedAnswers, setSortedAnswers] = React.useState<AnswerStruct[]>([])

  const query = useForumContract()

  const updateAnswers = () => {
    query.getAnswers(questionId).then((r) => {
        const sortAnswers = r.sort((a, b) => (a.upVotes > b.upVotes ? -1 : 1))
        setSortedAnswers(sortAnswers)
    }).catch((e) => console.log(e))
    console.log(sortedAnswers, "sorted")
  }

  useEvents({questionId}, updateAnswers)

  React.useEffect(() => {
    updateAnswers()
  }, [])

  return (
    <Box>
      <Stack spacing={2}>
        {sortedAnswers?.map((answer, i) => (
          <Answer  answer={answer}  />
        ))}
        <AnswerEditor questionid={questionId} />
      </Stack>
    </Box>
  )
}

export default Answers