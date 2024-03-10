import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    currentStatus: false,
    breakStatus: true,
    alertsCount: 0,
    message: '',
}

export const statusSlice = createSlice({
    name: 'base/status',
    initialState,
    reducers: {
        setCurrentStatus: (state, action) => {
            state.currentStatus = action.payload
        },
        setBreakStatus: (state, action) => {
            state.breakStatus = action.payload
        },
        setStatusMessage: (state, action) => {
            state.message = action.payload
        },
        setAlertsCount: (state, action) => {
            state.alertsCount = action.payload
        },
    },
})

export const {
    setCurrentStatus,
    setBreakStatus,
    setStatusMessage,
    setAlertsCount,
} = statusSlice.actions

export default statusSlice.reducer
