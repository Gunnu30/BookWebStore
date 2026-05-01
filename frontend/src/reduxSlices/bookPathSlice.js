import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    path : '/books'
}
const bookPathSlice = createSlice({
    name:'bookPath',
    initialState,
    reducers:{
        setBookPath : (state,action) =>{
            state.path = action.payload
        },
        clearBookPath: (state) =>{
            state.path = initialState.path
        }
    }
});

export const {setBookPath,clearBookPath} = bookPathSlice.actions;
export default bookPathSlice.reducer;