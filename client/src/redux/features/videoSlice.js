import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import * as api from "../api/index";



const initialState = {
    videosData: [],
    isLoading: false,
    action: 'none',
    success: 'none',
}

export const fetchVideosData = createAsyncThunk("vidoes/fetch", async (_, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const res = await api.getAllVideos();
        // console.log(res.data);
        return fulfillWithValue(res.data);
    } catch (error) {
        return rejectWithValue(error);
    }
});

// const constructVideoUrl = (videoFile) => {
//     // Replace this with your actual logic to construct the video URL
//     // For example, you can use a File URL or an object URL
//     // In this example, we'll use a File URL
//     return URL.createObjectURL(videoFile);
// };

export const uploadVideoData = createAsyncThunk("vidoes/upload", async (formData, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        // console.log(formData);
        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });


        const res = await api.postFormData(formData);

        // const videoFile = formData.get('videoFile');
        // const videoUrl = videoFile ? constructVideoUrl(videoFile) : null;


        // await new Promise(resolve => setTimeout(resolve, 10000));

        // const res = {
        //     data: {
        //         _id: '243e852e836437e0b707c4e5',
        //         videoTitle: 'Test video',
        //         videoUrl: videoUrl,
        //         subtitleUrl: 'https://mernvideobucket.s3.amazonaws.com/subtitles/Steve%20Jobs%202006%20Event%20video.vtt',
        //         __v: 0
        //     },
        // };

        // console.log(res.data);
        return fulfillWithValue(res.data);
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