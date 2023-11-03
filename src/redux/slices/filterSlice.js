import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	searchValue: "",
	categoryId: 0,
	pageCount: 1,
	sort: { name: "популярности", sortProperty: "rating" },
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setPageCount(state, action) {
			state.pageCount = action.payload;
		},
	},
});

export const { setCategoryId, setSort, setPageCount, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
