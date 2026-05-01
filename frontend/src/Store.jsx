import {configureStore} from '@reduxjs/toolkit'
import  userReducer  from './reduxSlices/userSlice'
import themeReducer from './reduxSlices/themeSlice'
import cartReducer from './reduxSlices/cartSlice'

export const store = configureStore({
    reducer : {  
        cart:cartReducer,
        user:userReducer,
        theme:themeReducer
    }
})