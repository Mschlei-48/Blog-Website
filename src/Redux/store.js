import {configureStore,combineReducers} from '@reduxjs/toolkit'
import authSlice from './authSlice.js'

const rootReducer=combineReducers({
    auth:authSlice
})

export const store=configureStore({
    reducer:rootReducer
})