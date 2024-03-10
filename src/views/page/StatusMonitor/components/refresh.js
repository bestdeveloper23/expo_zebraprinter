import React, { useEffect, useState } from 'react'
import { Button } from 'components/ui'
import classNames from 'classnames'
import { apiGetExpoDashboardData } from 'services/ExpoService'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentStatus, setBreakStatus, setAlertsCount } from 'store/base/statusSlice'

export const RefreshStatus = ({ className }) => {
    const { currentStatus } = useSelector((state) => state.base.status)
    const [status, setStatus] = useState(currentStatus)
    const dispatch = useDispatch()
    const refreshStatusHandle = async () => {
        const statusResponse = await apiGetExpoDashboardData()
        setStatus(statusResponse.data.status['online-ordering-enabled'])
        dispatch(
            setCurrentStatus(
                statusResponse.data.status['online-ordering-enabled']
            )
        )
        dispatch(setBreakStatus(statusResponse.data.status['break-enabled']))
        let alerts = statusResponse.data.alerts
        dispatch(setAlertsCount(alerts.length))
    }
    useEffect(() => {
        setInterval(() => {
            refreshStatusHandle()
        }, 10000)
    }, [])

    return (
        <>
            <Button
                className={classNames(className)}
                size="md"
                color={status ? 'green' : 'red'}
                variant="solid"
                onClick={refreshStatusHandle}
            >
                Refresh Status
            </Button>
        </>
    )
}
