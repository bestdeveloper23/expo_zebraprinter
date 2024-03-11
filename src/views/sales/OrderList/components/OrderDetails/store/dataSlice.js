import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetExpoLiveOrders,
    apiGetExpoOrderDetails,
    apiGetExpoHistoryOrders,
} from 'services/ExpoService'

export const getOrderItems = createAsyncThunk(
    'expoOrderItems/data/getOrderItems',
    async (data) => {
        const response = await apiGetExpoOrderDetails(data)
        return response.data
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
}

const dataSlice = createSlice({
    name: 'expoOrderItems/data',
    initialState: {
        loading: false,
        itemList: [],
        tableData: initialTableData,
    },
    reducers: {
        setItemList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getOrderItems.fulfilled]: (state, action) => {
            state.itemList = action.payload.data
            state.tableData.total = action.payload.data.length
            state.tableData.pageSize = action.payload.data.length
            state.loading = false
        },
        [getOrderItems.pending]: (state) => {
            state.loading = true
        },
        [getOrderItems.rejected]: (state, action) => {
            state.loading = false
        },
    },
})

export const { setItemList, setTableData } = dataSlice.actions

export default dataSlice.reducer
