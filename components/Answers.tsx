import * as React from 'react';
import { Box, Center, Spinner, Stack } from '@chakra-ui/react';
import Answer from './Answer'
import type { BigNumber } from 'ethers';
import useForumContract, { Answer as AnswerStruct } from "../hooks/useFormContract"

interface AnswersProps {
  questionId: BigNumber;
}

const Answers: React.FunctionComponent<AnswersProps> = ({ questionId }) => {
  const [sortedAnswers, setSortedAnswers] = React.useState<AnswerStruct[]>([]);

  const query = useForumContract()

  React.useEffect(() => {
    query.getAnswers(questionId).then((r) => {
        const sortAnswers = r.sort((a, b) => (a.upVotes > b.upVotes ? -1 : 1))
        setSortedAnswers(sortAnswers)
    }).catch((e) => console.log(e))
    console.log(sortedAnswers, "sorted")
  }, [])

  return (
    <Box>
      <Stack spacing={2}>
        {sortedAnswers?.map((answer, i) => (
          <Answer  answer={answer}  />
        ))}
      </Stack>
    </Box>
  );
};

export default Answers;