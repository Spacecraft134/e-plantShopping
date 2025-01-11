import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    numItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if(existingItem) {
            existingItem.quantity++;
        }
        else {
            state.items.push({name,image,cost,quantity: 1});
        }
        state.numItems += 1;
    },
    removeItem: (state, action) => {
     const { name, quantity } = action.payload;
       state.items = state.items.filter(item => item.name !== name);
       state.numItems -= quantity;
       if (state.numItems < 0) {
        state.numItems = 0;
    }
       
    },
    updateQuantity: (state, action) => {
        const {name, quantity } = action.payload;
        const item = state.items.find(item => item.name === name);
        if(item) {
            const differenceQuantity = quantity - item.quantity; 
            state.numItems += differenceQuantity;
            item.quantity = quantity;

        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
