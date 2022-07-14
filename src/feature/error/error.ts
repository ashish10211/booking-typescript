import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ErrorTypes } from "../../rulesEngine/rules";

// type ErrorNames =
//   | "Cannot have prawn cocktail and salmon fillet "
//   | "Cannot have more than one same course"
//   | "Please select atleast one main course"
//   | "Please select atleast two course"
//   | " Sorry no cheescake left";

export type ErrorState = {
  errors: ErrorTypes[];
};

const initialState: ErrorState = {
  errors: [],
};

export const optionSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{
        errors?: ErrorTypes[];
      }>
    ) => {
      const { errors } = action.payload;
      state.errors = errors || [];
      return state;
    },
  },
});

export const { setError } = optionSlice.actions;
export default optionSlice.reducer;
