import { combineReducers } from '@reduxjs/toolkit'
import common from './commonSlice'
import status from './statusSlice'

const reducer = combineReducers({
    common,
    status,
})

export default reducer
