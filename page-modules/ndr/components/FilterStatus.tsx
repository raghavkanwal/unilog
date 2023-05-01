import { Divider, Flex, Text } from '@chakra-ui/react'

import { useFilterContext } from '../FilterProvider'
import { useFilters } from '../hooks/queries'
import CustomBadge from './CustomBadge'
import CustomTag from './CustomTag'

export default function FilterStatus() {
    const { pageFilters, customFilters } = useFilterContext()
    const { data, isLoading, isError } = useFilters()

    if (isLoading || isError) return <></>

    return (
        <Flex
            backgroundColor={'white'}
            gap={2}
            fontSize={'sm'}
            height={'2rem'}
            pb={4}
            paddingInline={2}
            overflowX={'auto'}
        >
            {/* DATE RANGE */}
            <CustomTag title={'Orders'}>
                <Divider orientation="vertical" />
                <CustomBadge>{pageFilters.startDate}</CustomBadge>
                <Text> to </Text>
                <CustomBadge>{pageFilters.endDate}</CustomBadge>
            </CustomTag>

            {/* SEARCH BOX */}
            {Boolean(pageFilters.searchText) && (
                <CustomTag title={'Search Text'}>
                    <CustomBadge>{pageFilters.searchText}</CustomBadge>
                </CustomTag>
            )}

            {/* REASONS */}
            {Boolean(pageFilters.ndrReasons.length) && (
                <CustomTag title={'NDR Reasons'}>
                    {pageFilters.ndrReasons.map((reason, index) => (
                        <CustomBadge key={index}>
                            {data.find((obj) => obj.key === 'ndr_status')?.option.find((opt) => opt.key === reason)
                                ?.display || reason}
                        </CustomBadge>
                    ))}
                </CustomTag>
            )}

            {/* CUSTOM FILTERS */}
            {Object.keys(customFilters).map((key) => (
                <CustomTag title={data.find((obj) => obj.key === key)?.display || key} key={key}>
                    {Array.isArray(customFilters[key].value) ? (
                        (customFilters[key].value as []).map((value, index) => (
                            <CustomBadge key={index}>
                                {data.find((obj) => obj.key === key)?.option.find((opt) => opt.key === value)
                                    ?.display || value}
                            </CustomBadge>
                        ))
                    ) : (
                        <CustomBadge>{customFilters[key].value}</CustomBadge>
                    )}
                </CustomTag>
            ))}
        </Flex>
    )
}
