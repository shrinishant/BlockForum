import * as React from 'react'
import { HStack, Stack, Flex, Textarea, Image, Spacer } from '@chakra-ui/react'
import AuthButton2 from './AuthButton2'
import useForumContract from '@/hooks/useFormContract';

const QuestionEditor: React.FunctionComponent = () => {
  const [message, setMessage] = React.useState('');

  const query = useForumContract()

  const handleSubmit = async () => {
    await query.postQuestion(message)
    setMessage('');
  }

  return (
    <Stack spacing={3}>
      <HStack spacing={3} alignItems='start'>
        <Image borderRadius='full' boxSize='50px' fit='contain' src='polygon-logo.png' alt='Polygon Logo' />
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Submit question.'
          p={3}
          flex={1}
          bg='whiteAlpha.400'
          rounded='md'
          fontSize='lg'
        />
      </HStack>
      <Flex alignItems='center'>
        <Spacer />
        <AuthButton2
          text='Submit'
          
          onClick={handleSubmit}
        //   isLoading={addQuestion.isLoading}
        />
      </Flex>
    </Stack>
  );
};

export default QuestionEditor