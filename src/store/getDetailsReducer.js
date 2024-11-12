import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';

import { getFutureDate } from '../helpers/getFutureDate';

export const initialState = {
    isLoading: false,
    data: {},
    error: false
}

export const getWorkersDetails = createAsyncThunk('workerDetails', async (id) => (
    await fetch(
        `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`
    ).then(response => response.json()).then(data => ({
        data,
        id
    })).catch(err => err)
))

export const getDetailsSlice = createSlice({
    name: 'workerDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWorkersDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getWorkersDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = !isEmpty(state.data)
                ? {
                    ...state.data,
                    [action.payload.id]: {
                        expiresIn: getFutureDate(),
                        isExpired: false,
                        ...action.payload
                    }
                } : {
                    [action.payload.id]: {
                        expiresIn: getFutureDate(),
                        isExpired: false,
                        ...action.payload
                    }
                }
        });
        builder.addCase(getWorkersDetails.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });
    }
})

export const getDetailsReducer = getDetailsSlice.reducer;