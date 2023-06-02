import * as React from "react"
import { Text, Heading, HStack, Stack } from "@chakra-ui/react"
import TimeAgo from "react-timeago"
import Avatar from "@davatar/react"
import {BigNumber} from "ethers"
// import Username from "./Username"

export interface CommentStruct {
    c: {
        id: string;
        topic: string;
        message: string;
        creator_address: string;
        created_at: BigNumber;
    }
}

export default function Comment (c : CommentStruct) {
    return (
        <HStack spacing={3} alignItems="start">
          <Avatar size={48} address={c.c.creator_address} />
          <Stack spacing={1} flex={1} bg="whiteAlpha.100" rounded="2xl" p={3}>
            <Heading color="whiteAlpha.900" fontSize="lg">
            {/* <Username address={c.c.creator_address} /> */}
              {c.c.creator_address}
            </Heading>
            <Text color="whiteAlpha.800" fontSize="lg">
              {c.c.message}
            </Text>
            <Text color="whiteAlpha.500" fontSize="md">
              <TimeAgo date={BigNumber.from(c.c.created_at).toNumber() * 1000} />
            </Text>
          </Stack>
        </HStack>
    )
}
