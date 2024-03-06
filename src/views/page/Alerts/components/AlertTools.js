import React, { useState } from 'react'
import { Radio } from 'components/ui'

const AlertTools = () => {
    const [value, setValue] = useState('all')

    const onChange = (val) => {
        setValue(val)
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <Radio.Group value={value} onChange={onChange}>
                <Radio value={'all'}>All</Radio>
                <Radio value={'unread'}>Unread</Radio>
            </Radio.Group>
        </div>
    )
}

export default AlertTools
