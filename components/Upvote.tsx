import * as React from 'react';
import { useEffect } from 'react';
import { Icon } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { Button, ButtonProps, Text } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import useForumContract from '../hooks/useFormContract';

interface UpvoteButtonProps extends ButtonProps {
  answerId: BigNumber;
}

const Upvote: React.FunctionComponent<UpvoteButtonProps> = ({ answerId, ...props }) => {
  const [upvoteCount, setUpvoteCount] = React.useState<Number>(0);

  const upvoteCountText = upvoteCount === 1 ? '1 Upvote' : `${upvoteCount} Upvotes`;

  const query = useForumContract()

  useEffect(() => {
    const fetchUpvoteCount = async () => {
        query.getUpVotes(answerId).then((r) => {
          console.log(r)
          setUpvoteCount(r)
        })
        .catch((e) => console.log(e))
    };
    fetchUpvoteCount();
  }, [answerId]);

  const handleClick = async () => { };

  return (
    <>
      <Text fontSize='sm' color='gray.500' mx={3}>
        {upvoteCountText}
      </Text>
      <Button {...props}  onClick={handleClick}>
        <Icon as={FaArrowUp} />
      </Button>
    </>
  );
};

export default Upvote;