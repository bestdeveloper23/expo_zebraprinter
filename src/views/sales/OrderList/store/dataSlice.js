import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetExpoLiveOrders, apiGetExpoOrderDetails, apiGetExpoHistoryOrders } from 'services/ExpoService'

export const getOrders = createAsyncThunk(
    'salesProductList/data/getOrders',
    async (data) => {
        const response = await apiGetExpoLiveOrders(data)
        return response.data
    }
)

export const getHistoryOrders = createAsyncThunk(
    'salesProductList/data/getHistoryOrders',
    async (data) => {
        const response = await apiGetExpoHistoryOrders(data)
        return response.data
    }
)

export const getOrderDetail = async (data) => {
    const response = await apiGetExpoOrderDetails(data)
    return response.data
}

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
    name: 'salesOrderList/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData } = dataSlice.actions

export default dataSlice.reducer
