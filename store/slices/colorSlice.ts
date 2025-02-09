'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorState {
  selectedColor: string;
}

const initialState: ColorState = {
  selectedColor: '#F1B317', // Default color
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;
export { colorSlice };
