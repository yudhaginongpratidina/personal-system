import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { store, persistor } from "@/store/index"
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import '@/assets/css/global.css'

import Login from '@/app/auth/login/login.view'
import Register from '@/app/auth/register/register.view'

import Dashboard from '@/app/admin/dashboard/dashboard.view'
import Users from '@/app/admin/users/users.view'
import UsersCreate from '@/app/admin/users/users.create.view'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <BrowserRouter>
                    <Routes>

                        <Route path="/" element={<Login />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/create" element={<UsersCreate />} />

                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>
)
