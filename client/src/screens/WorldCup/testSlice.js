import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    zahl: 0
}

export const testSlice = createSlice({
    name: 'zaehler',
    initialState,
    reducers: {
        plus: (state) => {
            state.zahl += 1;
        },
        minus: (state) => {
            state.zahl -= 1;
        },
    }
})


export const {plus, minus} = testSlice.actions;
export default testSlice.reducer