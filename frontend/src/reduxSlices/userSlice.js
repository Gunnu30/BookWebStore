import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    role: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // Add a check: only destructure if payload is NOT null/undefined
            if (action.payload) {
                const { username, role } = action.payload;
                state.user = username;
                state.role = role;
            } else {
                // If payload is null, treat it like a logout/clear
                state.user = null;
                state.role = null;
            }
        },
        clearUser: (state) => {
            state.user = null;
            state.role = null;
            
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer