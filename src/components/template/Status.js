import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'components/ui'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

export const Status = ({ className, message }) => {
    const [status, setStatus] = useState(message)
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/status/monitor/`)
    }

    return (
        <>
            <Button
                className={classNames(className)}
                size="md"
                color="green"
                variant="solid"
                onClick={onView}
            >
                Status
            </Button>
        </>
    )
}
