import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'components/ui'
import classNames from 'classnames'

export const RefreshStatus = ({ className, message }) => {
    const [status, setStatus] = useState(message)

    const refreshStatusHandle = () => {
        console.log('Refreshing status')
    }
    return (
        <>
            <Button
                className={classNames(className)}
                size="md"
                color="green"
                variant="solid"
                onClick={refreshStatusHandle}
            >
                Refresh Status
            </Button>
        </>
    )
}
