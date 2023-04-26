import { Flex, IconButton, Select, Text } from '@chakra-ui/react'
import { PaginationState } from '@tanstack/react-table'
import { Dispatch, SetStateAction } from 'react'
import { AiFillCaretDown, AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'

import styles from './PaginationBar.module.scss'

type Props = {
    pageIndex: number
    pageSize: number
    pageCount: number
    setPagination: Dispatch<SetStateAction<PaginationState>>
}
export default function PaginationBar({ pageIndex, pageSize, pageCount, setPagination }: Props) {
    return (
        <Flex className={styles.PaginationBar}>
            <Flex alignItems={'center'}>
                <Text fontSize={'xs'}>Show:&nbsp;</Text>
                <Select
                    size={'xs'}
                    fontSize={'small'}
                    background={'white'}
                    borderRadius={'0.3rem'}
                    icon={<AiFillCaretDown fontSize={'14px'} />}
                    value={pageSize}
                    onChange={(e) => {
                        setPagination((prev) => ({ ...prev, pageSize: Number(e.target.value) }))
                    }}
                >
                    {[10, 20, 30, 40, 50].map((_pageSize) => (
                        <option key={_pageSize} value={_pageSize}>
                            {_pageSize}
                        </option>
                    ))}
                </Select>
            </Flex>
            <Flex alignItems={'center'} gap={2}>
                <IconButton
                    aria-label="Previous page"
                    onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))}
                    isDisabled={pageIndex === 0}
                    icon={<AiOutlineCaretLeft />}
                    backgroundColor={'transparent'}
                    _hover={{ backgroundColor: 'transparent' }}
                ></IconButton>
                <Flex alignItems={'center'} gap={1} fontSize={'sm'}>
                    <Text>Page</Text>
                    <Text fontWeight={'bold'}>
                        <Text as={'span'}>
                            {pageIndex + 1} of {pageCount}
                        </Text>
                    </Text>
                </Flex>
                <IconButton
                    aria-label="Next page"
                    onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
                    isDisabled={pageIndex === pageCount - 1}
                    icon={<AiOutlineCaretRight />}
                    backgroundColor={'transparent'}
                    _hover={{ backgroundColor: 'transparent' }}
                ></IconButton>
            </Flex>
        </Flex>
    )
}
