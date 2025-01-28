import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store,persistor} from './Redux/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {GoogleOAuthProvider} from '@react-oauth/google'



createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='631484824450-70066guejuq7dp63m2qe70r827sij4ua.apps.googleusercontent.com'>
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
  <StrictMode>
    <App />
  </StrictMode>
  </PersistGate>
  </Provider>
  </GoogleOAuthProvider>
)
