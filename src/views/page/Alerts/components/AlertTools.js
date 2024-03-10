import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUnread } from '../store/dataSlice'
import { Radio } from 'components/ui'

const AlertTools = () => {
    const dispatch = useDispatch()
    const { type } = useSelector((state) => state.Alerts.data.tableData)
   
    const onChange = (val) => {
       dispatch(setUnread(val))
    }
    
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <Radio.Group value={type} onChange={onChange}>
                <Radio value={'all'}>All</Radio>
                <Radio value={'unread'}>Unread</Radio>
            </Radio.Group>
        </div>
    )
}

export default AlertTools
