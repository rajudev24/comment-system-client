// commentSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const fetchComments = createAsyncThunk('comments/fetchComments', async (queryParams, { rejectWithValue }) => {
    try {
        const { page, limit, sortBy, sortOrder } = queryParams;
        const url = `http://localhost:5000/api/v1/comment?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        const response = await fetch(url);
        const data = await response.json(); // Parse the response body as JSON
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



const commentSlice = createSlice({
    name: 'comments',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default commentSlice.reducer;


