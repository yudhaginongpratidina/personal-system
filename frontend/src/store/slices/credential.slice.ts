import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Credentials {
    id: string | number
}

interface CredentialsState {
    credentials: Credentials | null
    isAuthenticated: boolean
}

const initialState: CredentialsState = {
    credentials: null,
    isAuthenticated: false
}

const CredentialSlice = createSlice({
    name: "credentials",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<Credentials>) => {
            state.credentials = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.credentials = null
            state.isAuthenticated = false
        }
    }
})

export const { loginSuccess, logout } = CredentialSlice.actions
export default CredentialSlice.reducer