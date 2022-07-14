import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  customerId: string;
};

export type MenuState = {
  starter: MenuItem[];
  main: MenuItem[];
  dessert: MenuItem[];
};

const initialState: MenuState = {
  starter: [],
  main: [],
  dessert: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (
      state,
      action: PayloadAction<{
        id: number;
        customerId: string;
        name: string;
        price: number;
        type: keyof MenuState;
      }>
    ) => {
      const { id, name, price, type, customerId } = action.payload;
      state[type].push({ id, name, price, customerId });
      return state;
    },
    removeMenuItem: (
      state,
      action: PayloadAction<{
        id: number;
        customerId: string;
        type: keyof MenuState;
      }>
    ) => {
      const { type, id } = action.payload;
      const idx = state[type].findIndex((item) => item.id === id);
      state[type].splice(idx, 1);
      return state;
    },
  },
});

export const { addMenuItem, removeMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
