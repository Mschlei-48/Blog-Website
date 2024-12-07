import {configureStore,combineReducers} from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import dataSlice from './dataSlice.js'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    storage,
}



const rootReducer=combineReducers({
    auth:authSlice,
    db:dataSlice
})
const persistdReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistdReducer
})

export const persistor=persistStore(store)