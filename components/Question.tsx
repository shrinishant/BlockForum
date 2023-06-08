import * as React from "react"
import NextLink from "next/link"
import { Box, Heading, HStack, Flex, Badge, Spacer, Text, LinkBox, LinkOverlay } from "@chakra-ui/react"
import TimeAgo from "react-timeago"
// import Username from "./Username"
import Avatar from "@davatar/react/dist/Avatar"
import useForumContract, {Question as QuestionStruct} from "../hooks/useFormContract"
import useAnswers from "../hooks/useFormContract"
import Username from "./Username"
import { useState, useEffect } from "react"
import { Answer } from "../hooks/useFormContract"

interface QuestionProps extends QuestionStruct {
    answerPage?: boolean;
}

const Question: React.FunctionComponent<QuestionProps> = ({
    questionId,
    message,
    creatorAddress,
    timeStamp,
    answerPage
}) => {

    const [answers, setAnswers] = useState<Answer[]>([])

    useEffect(() => {
        const query = useForumContract().getAnswers(questionId)
        .then((r) => {
            console.log(r)
            setAnswers(r)
        })
        .catch((e) => console.log(e))
    }, [])

    return(
        <>
            { !answerPage ? (
                <HStack spacing={3} alignItems="center">
                    {/* <Avatar size={48} address={creatorAddress} /> */}
                    <LinkBox as="article" flex={1} borderWidth="1px" rounded="md" p={3}>
                        <Box>
                            <TimeAgo date={Number(timeStamp) * 1000} />
                        </Box>
                        <Heading size="md" my="2">
                            <NextLink href="/question/[id]" as={`/question/${questionId}`} passHref>
                                <p>{message}</p>
                            </NextLink>
                        </Heading>
                        <Flex alignItems="center" w="100%">
                            <Badge borderRadius="full" px={5} color="purple.400" colorScheme="purple">
                                <Username address={creatorAddress} />
                            </Badge>
                            <Spacer />
                            {
                                answers.length > 0 && (
                                    <Badge px="5" borderRadius="full" colorScheme="gray">
                                        <Text color="gray.500">{answers.length} answers</Text>
                                    </Badge>
                                )
                            }
                        </Flex>
                    </LinkBox>
                </HStack>
            )
            :
            (
                <HStack spacing={3} alignItems='center'>
                    {/* <Avatar size={48} address={creatorAddress} /> */}
                    <LinkBox as='article' flex={1} borderWidth='1px' rounded='md' p={3}>
                        <NextLink href='/' as="/" passHref>
                            <LinkOverlay>
                                <Text color='white' fontSize='lg'>
                                {message} {"Nishant"}
                                </Text>
                            </LinkOverlay>
                        </NextLink>
                        <Flex alignItems='center' w='100%'>
                        <Badge borderRadius='full' px='5' color='purple.400' colorScheme='purple'>
                            <Username address={creatorAddress} />
                        </Badge>
                        <Text px='8px' fontSize='sm'>
                            <TimeAgo date={Number(timeStamp) * 1000} />
                        </Text>
                        <Spacer />
                        </Flex>
                    </LinkBox>
                </HStack>
            )}
        </>
    )
}

export default Question