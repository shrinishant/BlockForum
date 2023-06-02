import * as React from "react"
import {Box, Stack} from "@chakra-ui/react"
import commentsContract from "../hooks/useCommentsContract"
import useCommentsContract from "../hooks/useCommentsContract"
import { useState } from "react"
import Comment from "./Comment"
import {BigNumber} from "ethers"
import CommentEditor from "./CommentEditor"

interface CommentsProps {
    topic: string
}

export interface CommentStruct {
    id: string;
    topic: string;
    message: string;
    creator_address: string;
    created_at: BigNumber;
}

export default function Comments ({topic} : {topic: string}) {
    const [comments, setComments] = useState<CommentStruct[]>([])
    const contract = useCommentsContract()
    contract.getComments(topic).then((result) => {
        setComments(result)
    })

    return (
        <>
            <Stack spacing={4}>
                {comments.map((c, i) => (
                    <Comment key={i} c={c} />
                ))}
                <CommentEditor topic={topic} />
            </Stack>
            {/* {query.map(q => (<h1>{JSON.stringify(q)}</h1>))} */}
        </>
    )
}