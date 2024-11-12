import { createSlice } from '@reduxjs/toolkit';

import { getFutureDate } from '../helpers/getFutureDate';

export const initialState = {
  expiresIn: getFutureDate()
}

export const updateExpirationTimeSlice = createSlice({
  name: 'expirationTime',
  initialState,
  reducers: {
    resetExpirationTime(state) {
      state.expiresIn = getFutureDate()
    }
  },
})

export const updateExpirationTimeReducer = updateExpirationTimeSlice.reducer;
export const { resetExpirationTime } = updateExpirationTimeSlice.actions;