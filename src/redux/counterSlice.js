import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  counterName: "Tally Counter",
  counterNumber: 1,
  counters: [1],
};

export const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state, action) => {
      state.count += 1;
    },
    decrementCounter: (state, action) => {
      state.count -= 1;
    },
    resetCounter: (state, action) => {
      state.count -= 1;
    },
    setCounterName: (state, action) => {
      state.counterName = action.payload;
    },
    setInitialValue: (state, action) => {
      state.count = action.payload;
    },
    addCounter: (state, action) => {
      state.counters = [...state.counters, state.counterNumber + 1];
      state.counterNumber += 1;
    },
    removeCounter: (state, action) => {
      console.log(action.payload);
      state.counters = state.counters.filter((id) => id != action.payload);
    },
  },
});

export const {
  incrementCounter,
  decrementCounter,
  resetCounter,
  setCounterName,
  setInitialValue,
  addCounter,
  removeCounter,
} = slice.actions;

export const selectValue = (state) => state.counter.count;

export const selectCounter = (state) => state.counter.counters;

export const selectCounterName = (state) => state.counter.counterName;

export default slice.reducer;
