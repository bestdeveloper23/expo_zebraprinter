import { createSlice, current } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'salesOrderList/state',
    initialState: {
        selectedRows: [],
        selectedRow: [],
    },
    reducers: {
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
    },
})

export const {
    setSelectedRows,
    setSelectedRow,
} = stateSlice.actions

export default stateSlice.reducer
