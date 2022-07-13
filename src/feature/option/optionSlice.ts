import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type BookingCount = {
  count: string;
};

const initialState: BookingCount = {
  count: "1",
};

export const optionSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    setBookingCount: (
      state,
      action: PayloadAction<{
        count: string;
      }>
    ) => {
      const { count } = action.payload;
      state = { count };
      return state;
    },
  },
});

export const { setBookingCount } = optionSlice.actions;
export default optionSlice.reducer;
