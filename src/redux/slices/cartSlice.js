import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	totalPrice: 0,
	items: [],
	quantity: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},

		minusItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload);

			if (findItem) {
				if (findItem.count > 1) {
					findItem.count--;
					state.totalPrice = state.items.reduce((sum, obj) => {
						return obj.price * obj.count - sum;
					}, 0);
				}
			}
		},
		removeItem(state, action) {
			state.items = state.items.filter(obj => obj.id !== action.payload);
		},
		clearItem(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { minusItem, addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
