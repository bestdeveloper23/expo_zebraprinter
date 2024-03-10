import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'components/ui'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentStatus, setBreakStatus, setAlertsCount } from 'store/base/statusSlice'
import { apiGetExpoDashboardData } from 'services/ExpoService'
import axios from 'axios'

export const Status = ({ className }) => {
    const [status, setStatus] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/status/monitor/`)
    }

    useEffect(() => {
        const fetchData = async () => {
            const statusResponse = await apiGetExpoDashboardData()
            setStatus(statusResponse.data.status['online-ordering-enabled'])
            dispatch(setCurrentStatus(statusResponse.data.status['online-ordering-enabled']))
            dispatch(setBreakStatus(statusResponse.data.status['break-enabled']))
            let alerts = statusResponse.data.alerts
            dispatch(setAlertsCount(alerts.length))
        };
    
        // Call the async function
        fetchData();

    },[])

    return (
        <>
            <Button
                className={classNames(className)}
                size="md"
                color={status ? "green" : "red"}
                variant="solid"
                onClick={onView}
            >
                Status
            </Button>
        </>
    )
}
