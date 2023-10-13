import * as React from "react"
import { Text, Badge, HStack, Stack, Flex, Spacer } from "@chakra-ui/react"
import TimeAgo from "react-timeago"
import Avatar from "@davatar/react/dist/Avatar"
import {Answer as AnswerStruct} from  "../hooks/useFormContract"
// import Username from "./Username"
import Upvote from "./Upvote"

interface AnswerProps {
    answer: AnswerStruct;
    first?: boolean;
}

const Answer: React.FunctionComponent<AnswerProps> = ({answer, first}) => {
    
    return (
        <HStack spacing={3} alignItems="start">
            <Avatar size={48} address={answer.creatorAddress} />
            <Stack spacing={1} flex={1} bg={first ? "purple.900" : "whiteAlpha.300"} rounded="md" p={3}>
                <Text color="white" fontSize="lg">
                    {answer.message}
                </Text>
                <Flex alignItems="center" w="100%">
                    <Badge borderRadius="full" px="5" color="purple.400" colorScheme="purple">
                        {/* <Username address={answer.creatorAddress} /> */}
                    </Badge>
                    <Text px="8px" fontSize="sm" color="gray.500">
                        {/* <TimeAgo date={answer.timeStamp.toNumber() * 1000} /> */}
                    </Text>
                    <Spacer />
                    <Upvote answerId={answer.answerId} alignSelf="flex-end" size="sm"></Upvote>
                </Flex>
            </Stack>
        </HStack>
    )
}

export default Answer