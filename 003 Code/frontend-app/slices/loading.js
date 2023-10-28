import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startLoading(state, action) {
            state[action.payload] = true
        },
        finishLoading(state, action) {
            state[action.payload] = false
        }
    }
});

export default loadingSlice.reducer;
export const {
    startLoading,
    finishLoading
} = loadingSlice.actions;