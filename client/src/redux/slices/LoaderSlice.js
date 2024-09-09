import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   Loader:false
}

export const loderSlice = createSlice({
    name: "Loader",
    initialState,
    reducers: {
        showLoader: (state,action) => {
            state.Loader = action.payload
        }
    }
})

export const { showLoader } = loderSlice.actions;
export const Loader = (state) => state;

export default loderSlice.reducer;