import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ErrorNames =
  | "Cannot have prawn cocktail and salmon fillet "
  | "Cannot have more than one same course"
  | "Please select atleast one main course"
  | "Please select atleast two course"
  | " Sorry no cheescake left";

export type ErrorState = {
  success: boolean;
  errors?: string[];
};

const initialState: ErrorState = {
  success: true,
};

export const optionSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{
        success: boolean;
        errors?: string[];
      }>
    ) => {
      const { success, errors } = action.payload;
      state = { ...state, success, errors };
      return state;
    },
  },
});

export const { setError } = optionSlice.actions;
export default optionSlice.reducer;
