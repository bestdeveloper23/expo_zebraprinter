import { createSlice, current } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'salesOrderList/state',
    initialState: {
        selectedRows: [],
        selectedRow: [],
        deleteMode: '',
        printShow: false
    },
    reducers: {
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            // const currentState = current(state)
            // if (!currentState.selectedRows.includes(payload)) {
            //     return {
            //         selectedRows: [...currentState.selectedRows, ...payload],
            //     }
            // }
            return {
                selectedRows: payload,
            }
        },
        removeRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                return {
                    selectedRows: currentState.selectedRows.filter(
                        (id) => id !== payload
                    ),
                }
            }
        },
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
        setPrintShow: (state, action) => {
            state.printShow = action.payload
        }
    },
})

export const {
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    toggleDeleteConfirmation,
    setDeleteMode,
    setPrintShow
} = stateSlice.actions

export default stateSlice.reducer
