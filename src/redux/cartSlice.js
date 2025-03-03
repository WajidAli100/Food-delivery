import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            let existItem = state.cart.find((item) => item.id === action.payload.id);
            if (existItem) {
                existItem.qty += 1; // ✅ Increase quantity when the same product is added again
            } else {
                state.cart.push({ ...action.payload, qty: 1 }); // ✅ Add new product if not in cart
            }
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        clearCart: (state) => {
            state.cart = []
        },
        Increment: (state, action) => {
            let existItem = state.cart.find((item) => item.id === action.payload);
            existItem.qty += 1
        },
        Decrement: (state, action) => {
            let existItem = state.cart.find((item) => item.id === action.payload);
            if (existItem.qty === 1) {
                state.cart = state.cart.filter((item) => item.id !== action.payload)
            } else {
                existItem.qty -= 1
            }
        }
    }
})

export const { addToCart, removeFromCart, clearCart, Increment, Decrement } = cartSlice.actions
export default cartSlice.reducer