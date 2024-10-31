import {configureStore,combineReducers} from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import dataSlice from './dataSlice.js'

const rootReducer=combineReducers({
    auth:authSlice,
    db:dataSlice
})

export const store=configureStore({
    reducer:rootReducer
})