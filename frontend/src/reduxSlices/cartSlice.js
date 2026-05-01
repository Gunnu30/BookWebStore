import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    items:[],
    state:"idle"
}
const addToCartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setBookToCart : (state,action)=>{
            const {id, quantity} = action.payload;
            console.log(quantity)

            const isExist = state.items.find((each) => each.id == id);

            if(isExist){
                isExist.quantity += quantity
            }else{
                console.log(action.payload)
                state.items.push(action.payload);
            }
        },
        clearCart:(state)=>{
            state.items = []
        }
    }

})

export const {setBookToCart,clearCart} = addToCartSlice.actions
export default addToCartSlice.reducer;