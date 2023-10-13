"use client";
import * as React from "react"
import NextLink from "next/link"
import { Icon } from "@chakra-ui/react"
import { Tabs, TabList, Tab } from "@chakra-ui/react"
import {FaBalanceScale, FaCommentAlt} from "react-icons/fa"
import { usePathname} from "next/navigation"

const Navbar : React.FunctionComponent = () => {

    const currentRoute = usePathname()

    return(
        <nav>
            <Tabs
                pt={1}
                size={"lg"}
                index={currentRoute !== '/amm' ? 0 : 1}
                align="center"
                colorScheme="gray"
            >
                <TabList>
                    <NextLink href="/" passHref><Tab><Icon as={FaCommentAlt} /></Tab></NextLink>
                    <NextLink href="/amm" passHref><Tab><Icon as={FaBalanceScale} /></Tab></NextLink>
                </TabList>
            </Tabs>
        </nav>
    )
}

export default Navbar