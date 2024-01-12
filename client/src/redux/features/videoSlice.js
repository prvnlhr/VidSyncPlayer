import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index";

const initialState = {
    videosData: [],
    isLoading: false,
    action: 'none',
    success: 'none',
};

export const fetchVideosData = createAsyncThunk("videos/fetch", async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.getAllVideos();
        return fulfillWithValue(res.data);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const uploadVideoData = createAsyncThunk("videos/upload", async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.postFormData(formData);
        return fulfillWithValue(res.data);
    } catch (error) {
        return rejectWithValue(error);
    }
});

const videosSlice = createSlice({
    name: 'videos',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideosData.fulfilled, (state, action) => ({
                ...state,
                videosData: action.payload,
                isLoading: false,
                action: undefined,
            }))
            .addCase(fetchVideosData.pending, (state, action) => ({
                ...state,
                videosData: action.payload,
                isLoading: true,
                action: 'fetching',
            }))
            .addCase(fetchVideosData.rejected, (state, action) => ({
                ...state,
                isLoading: false,
                action: undefined,
            }))
            .addCase(uploadVideoData.fulfilled, (state, action) => ({
                ...state,
                isLoading: false,
                videosData: [action.payload, ...state.videosData],
                action: 'uploading',
                success: true,
            }))
            .addCase(uploadVideoData.pending, (state, action) => ({
                ...state,
                isLoading: true,
                action: 'uploading',
                success: undefined,
            }))
            .addCase(uploadVideoData.rejected, (state, action) => ({
                ...state,
                isLoading: false,
                action: 'uploading',
                success: false,
            }));
    },
});

export default videosSlice.reducer;
