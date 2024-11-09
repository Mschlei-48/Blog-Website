import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection, query, limit } from 'firebase/firestore';
import { db } from '../Firebase/config';

const initialState = {
    blogs: [],
    status: 'idle', // To track loading status
    error: null
};

// Create an async thunk to fetch blogs
export const getBlogs = createAsyncThunk('data/getBlogs', async () => {
    const querySnapshot = await getDocs(
        query(collection(db, "Medium-Blogs"), limit(3000))
    );
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
});

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default dataSlice.reducer;
