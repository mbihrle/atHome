import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bankAccountChildValue: 0,
};

export const bankAccountChildrenSlice = createSlice({
    name: 'bankAccountsChildren',
    initialState,
    reducers: {
        increment: (state) => {(state.bankAccountChildValue += 1)},
        decrement: (state) => {(state.bankAccountChildValue -= 1)},
        payInByAmount: (state, action) => {
            state.bankAccountChildValue += action.payload;
        },
        payOffByAmount: (state, action) => {
            state.bankAccountChildValue -= action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, payInByAmount, payOffByAmount } =
    bankAccountChildrenSlice.actions;

export default bankAccountChildrenSlice.reducer;
