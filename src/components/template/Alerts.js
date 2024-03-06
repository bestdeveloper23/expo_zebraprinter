import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'components/ui'
import classNames from 'classnames'

export const Alerts = ({ className, message }) => {
    const [alerts, setAlerts] = useState(message)

    const navigate = useNavigate()

    const onView = () => {
        navigate(`/alert/details/`)
    }

    return (
        <>
            <Button
                className={classNames(className)}
                size="md"
                variant="solid"
                onClick={onView}
            >
                Alerts
            </Button>
        </>
    )
}
