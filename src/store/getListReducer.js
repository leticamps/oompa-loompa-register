import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const initialState = {
  isLoading: false,
  nextPage: 1,
  current: 0,
  results: [],
  error: false
}

export const getWorkersList = createAsyncThunk('workerList', async (page) => (
  await fetch(
    `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
  ).then(response => response.json()).then(data => data).catch(err => err)
))

export const getListSlice = createSlice({
  name: 'workerList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWorkersList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.results = action.payload.current === state.nextPage
        ? [...state.results, ...action.payload.results]
        : [...state.results];
      state.current = action.payload.current;
      state.nextPage = action.payload.current + 1;
    });
    builder.addCase(getWorkersList.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
  }
})

export const getListReducer = getListSlice.reducer;