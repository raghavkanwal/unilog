import { Center, Flex, Icon, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { ReactNode } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { useAuthProvider } from 'shared/providers/AuthProvider'

import accessDeniedImage from './../../public/access-error.png'
import Loading from './Loading/Loading'

export default function AuthGuard({ children }: { children: ReactNode }) {
    const { allowedURLs } = useAuthProvider()

    if (!allowedURLs)
        return (
            <Center w={'100%'} h={'80vh'}>
                <Loading />
            </Center>
        )

    // if (allowedURLs.includes('/all_urls') || allowedURLs.includes(router.pathname)) return <>{children}</>
    if (true) return <>{children}</>

    return (
        <Center w={'100%'} h={'100%'}>
            <Flex flexDir="column" gap={4} align="center" justifyContent={`center`}>
                <Image src={accessDeniedImage} alt={'Access Denied'} width="250"></Image>
                <Flex justify={`space-between`} align="center" maxW={`450px`}>
                    <Icon
                        as={AiOutlineWarning}
                        fontSize="1.5rem"
                        fontWeight="normal"
                        display="inline-block"
                        verticalAlign="middle"
                        ms={6}
                    />
                    <Text w={`85%`} fontSize="sm">
                        You seem to lack the privileges required to access this content. To fix this, please contact the
                        account administrator.
                    </Text>
                </Flex>
            </Flex>
        </Center>
    )
}
