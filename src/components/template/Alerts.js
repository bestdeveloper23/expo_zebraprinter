import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Badge } from 'components/ui'
import { AlertBadge } from './AlertBadge'
import classNames from 'classnames'
import { apiGetExpoDashboardData } from 'services/ExpoService'

export const Alerts = ({ className }) => {
    
    const { alertsCount } = useSelector((state) => state.base.status)
    const [alerts, setAlerts] = useState(alertsCount)
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/alert/details/`)
    }
    
    return (
        <>
            <Button
                className={classNames(className, 'relative')}
                size="md"
                variant="solid"
                onClick={onView}
            >
                Alerts
                <AlertBadge count={alertsCount} />
            </Button>
        </>
    )
}
