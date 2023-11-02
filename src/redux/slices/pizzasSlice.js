import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzasStatus",
	async params => {
		const { category, sortBy, order, search, pageCount } = params;
		const res = await axios.get(
			`https://6470c3d33de51400f724e622.mockapi.io/items?page=${pageCount}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
		);
		return res.data;
	}
);

const initialState = {
	items: [],
	status: "loading",
};

const pizzasSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state, action) => {
			state.status = "loading";
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = "success";
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.status = "error";
			state.items = [];
		},
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
