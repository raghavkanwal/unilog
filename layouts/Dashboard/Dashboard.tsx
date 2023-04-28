import { Box, CardBody, IconButton, Tab, TabList, Tabs, Text, Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ToolbarProvider from 'page-modules/dashboard/ToolbarProvider'
import Toolbar from 'page-modules/dashboard/ndr/components/Toolbar'
import React, { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiRefreshCw } from 'react-icons/fi'
import PageCard from 'shared/components/PageCard/PageCard'
import { ROUTES } from 'shared/utils/enums'

import { DASHBOARD_ROUTE_MAP, DASHBOARD_ROUTE_PATH } from './dashboard-route-map'
import styles from './dashboard.module.scss'

function TabToolbar(tabIndex: number): ReactNode {
    switch (tabIndex) {
        case 0:
            return (
                <Tooltip label="Refresh" hasArrow>
                    <IconButton
                        size="sm"
                        aria-label={'Refresh'}
                        icon={<FiRefreshCw />}
                        onClick={() => toast('Refreshing...')}
                    />
                </Tooltip>
            )
        case 1:
            return <Toolbar />
    }

    return <></>
}

export default function Dashboard({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [tabIndex, setTabIndex] = useState<number>(0)

    useEffect(() => {
        const tabName: DASHBOARD_ROUTE_PATH = router.pathname.split('/').at(-1) as DASHBOARD_ROUTE_PATH
        setTabIndex(DASHBOARD_ROUTE_MAP[tabName].index)
    }, [router.pathname])

    return (
        <ToolbarProvider>
            <PageCard
                title="Dashboard"
                subtitle="Consolidation of all your data across UniLog."
                toolbar={TabToolbar(tabIndex)}
            >
                <CardBody h={'100%'}>
                    <Tabs
                        isLazy
                        className={styles.dashboardTabsContainer}
                        color="gray.700"
                        index={tabIndex}
                        onChange={setTabIndex}
                        h={'100%'}
                    >
                        <TabList h={'auto'} className={styles.dashboardTabList}>
                            <Tab
                                className={styles.dashboardTab}
                                fontSize="sm"
                                _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                fontWeight="bold"
                            >
                                <Link href={ROUTES.HOME_PAGE}>
                                    <Text paddingBlock={2} paddingInline={4}>
                                        Overview
                                    </Text>
                                </Link>
                            </Tab>
                            <Tab
                                className={styles.dashboardTab}
                                fontSize="sm"
                                _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                fontWeight="bold"
                            >
                                <Link href="/dashboard/ndr">
                                    <Text paddingBlock={2} paddingInline={4}>
                                        NDR
                                    </Text>
                                </Link>
                            </Tab>
                        </TabList>

                        <Box className={styles.dashboardTabPanel} h={'calc(100% - 2.5rem)'}>
                            <Box overflow={'auto'} h={'100%'} zIndex={10}>
                                {children}
                            </Box>
                        </Box>
                    </Tabs>
                </CardBody>
            </PageCard>
        </ToolbarProvider>
    )
}
