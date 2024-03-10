import { combineReducers } from '@reduxjs/toolkit'
import state from '../../OrderList/store/stateSlice'
import data from './dataSlice'

const reducer = combineReducers({
    state,
    data,
})

export default reducer
