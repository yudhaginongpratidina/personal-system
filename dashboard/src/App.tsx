import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/global.css'

import { store, persistor } from "@/redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import Login from '@/app/login/login.view'
import Register from '@/app/register/register.view'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>,
)
