import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import appStyles from './app.module.css';
import AppHeader from './appHeaderComponent/AppHeader';
import UploadComponent from './uploadComponent/UploadComponent';
import VideoLibrary from './videoLibraryComponent/VideoLibrary';
import VideoPlayerPage from './videoPlayerComponent/VideoPlayerPage';
import { fetchVideosData } from '../redux/features/videoSlice';

const App = () => {

  const dispatch = useDispatch();

  // State to store data of the currently playing video
  const [currentPlayerVideoData, setCurrentPlayerVideoData] = useState('');

  // Fetch video data from the Redux store on component mount
  useEffect(() => {
    dispatch(fetchVideosData());
  }, []);

  return (
    <div className={appStyles.app}>
      <div className={appStyles.appInnerWrapper}>

        {/* Main app header */}
        <AppHeader />

        <div className={appStyles.subComponentWrapper}>
          {/* React Router for handling different routes */}
          <Routes>
            {/* Route for displaying the video library */}
            <Route
              path='/'
              element={<VideoLibrary currentPlayerVideoData={currentPlayerVideoData} setCurrentPlayerVideoData={setCurrentPlayerVideoData} />}
            />

            {/* Route for displaying the video player page */}
            <Route
              path='/player'
              element={<VideoPlayerPage currentPlayerVideoData={currentPlayerVideoData} setCurrentPlayerVideoData={setCurrentPlayerVideoData} />}
            />

            {/* Route for displaying the video upload form */}
            <Route
              path='/upload'
              element={<UploadComponent setCurrentPlayerVideoData={setCurrentPlayerVideoData} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
