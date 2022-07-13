import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type MenuItem = {
  [key: string]: {
    name: string;
    price: number;
  };
};

export type MenuState = {
  starter: MenuItem;
  main: MenuItem;
  dessert: MenuItem;
};

const initialState: MenuState = {
  starter: {},
  main: {},
  dessert: {},
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        price: number;
        type: keyof MenuState;
      }>
    ) => {
      const { id, name, price, type } = action.payload;
      state[type][id] = {
        name,
        price,
      };
      return state;
    },
    removeMenuItem: (
      state,
      action: PayloadAction<{
        id: string;
        type: keyof MenuState;
      }>
    ) => {
      const { id, type } = action.payload;
      delete state[type][id];
      return state;
    },
  },
});

export const { addMenuItem, removeMenuItem } = menuSlice.actions;

export const starter = (state: RootState) => state.menu.starter;
export const mains = (state: RootState) => state.menu.main;
export const desserts = (state: RootState) => state.menu.dessert;

export default menuSlice.reducer;
