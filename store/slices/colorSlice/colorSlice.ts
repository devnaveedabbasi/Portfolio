'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorState {
  selectedColor: string;
}

let initialColor = "#F1B317";  // Default color

// Check if running in the browser
if (typeof window !== 'undefined') {
  const storedColor = localStorage.getItem('selectedColor');
  if (storedColor) {
    initialColor = storedColor;
  }
}

const initialState: ColorState = {
  selectedColor: initialColor,
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedColor', action.payload);
      }
    },
  },
});

export const { setColor } = colorSlice.actions;

export default colorSlice.reducer;
export { colorSlice };
