import { configureStore } from '@reduxjs/toolkit'
import videoSlice from '../features/videoSlice'

const store = configureStore({
    reducer: {
        videos: videoSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store