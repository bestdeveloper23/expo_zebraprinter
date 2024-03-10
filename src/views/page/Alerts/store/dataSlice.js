import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetExpoAlerts } from 'services/ExpoService'

export const getAlerts = createAsyncThunk(
    'Alerts/data/getAlerts',
    async (data) => {
        const response = await apiGetExpoAlerts(data)
        return response.data
    }
)

export const setUnread = createAsyncThunk(
    'Alerts/data/setParms',
    async (data) => {
        return data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
    type: 'all',
}

const dataSlice = createSlice({
    name: 'salesProductList/data',
    initialState: {
        loading: false,
        alertList: [],
        tableData: initialTableData,
        filterData: false,
    },
    reducers: {
        updateAlertList: (state, action) => {
            state.alertList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        // setUnread: (state, action) => {
        //     state.unread = action.payload
        // },
    },
    extraReducers: {
        [getAlerts.fulfilled]: (state, action) => {
            state.alertList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getAlerts.pending]: (state) => {
            state.loading = true
        },
        [setUnread.fulfilled]: (state, action) => {
            state.tableData.type = action.payload
        },
    },
})

export const { updateAlertList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
