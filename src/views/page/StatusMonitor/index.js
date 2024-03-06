import React from 'react'
import { RefreshStatus } from './refresh'
import StatusForm from './StatusForm'

const SignIn = () => {
    return (
        <>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800 py-20">
                <div className="xl:min-w-[650px] px-8 flex flex-row gap-9">
                    <RefreshStatus />
                    <StatusForm disableSubmit={false} />
                </div>
            </div>
        </>
    )
}

export default SignIn
