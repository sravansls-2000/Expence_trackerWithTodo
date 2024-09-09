import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode:false
}

export const modeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state,action) => {
            state.mode = !state.mode
        },
    }
})

export const { toggleTheme } = modeSlice.actions;
export default modeSlice.reducer;