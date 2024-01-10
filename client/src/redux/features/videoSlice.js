import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import * as api from "../api/index";



const initialState = {
    videosData: [],
    isLoading: false,
    action: undefined,
    success: undefined,
}

export const fetchVideosData = createAsyncThunk("vidoes/fetch", async (_, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const res = await api.getAllVideos();
        console.log(res.data);
        return fulfillWithValue(res.data);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const uploadVideoData = createAsyncThunk("vidoes/upload", async (formData, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        console.log(formData);
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        const res = await api.postFormData(formData);
        console.log(res.data);
        return fulfillWithValue(res.data);
        // return fulfillWithValue([]);
    } catch (error) {
        return rejectWithValue(error);
    }
});


const cardsSlice = createSlice({
    name: 'videos',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchVideosData.fulfilled, (state, action) => {
                return {
                    ...state,
                    videosData: action.payload,
                    isLoading: false,
                    action: undefined,
                }
            })
            .addCase(fetchVideosData.pending, (state, action) => {
                return {
                    ...state,
                    videosData: action.payload,
                    isLoading: true,
                    action: 'fetching',
                }
            })
            .addCase(fetchVideosData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: undefined,
                }
            })
            .addCase(uploadVideoData.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    videosData: [action.payload, ...state.videosData],
                    action: 'uploading',
                    success: true
                }
            })
            .addCase(uploadVideoData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'uploading',
                    success: undefined,
                }
            })
            .addCase(uploadVideoData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: 'uploading',
                    success: false
                }
            })
    }
})


export default cardsSlice.reducer;