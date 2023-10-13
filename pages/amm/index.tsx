import { Box, Divider, AbsoluteCenter, Heading, Highlight } from "@chakra-ui/react"

const Amm = () => {
    return (
        <Box p={8} maxW="600px" minW="320px" m="0 auto" textAlign="center">
            <Box position='relative' pt='5' mb='5'>
                <Heading lineHeight='tall' mb='2'>
                    <Highlight
                        query='Amm'
                        styles={{ px: '4', py: '1', rounded: 'full', bg: 'teal.100' }}
                    >
                        AMM
                    </Highlight>
                </Heading>
                <Divider margin='auto' width='120px' />
                <AbsoluteCenter px='4' />
            </Box>
            Coming Soon
        </Box>
    )
}

export default Amm