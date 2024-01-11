import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import appStyles from './app.module.css';
import AppHeader from './appHeaderComponent/AppHeader';
import UploadFormComponent from './uploadFormComponent/UploadFormComponent';
import VideoLibrary from './videoLibraryComponent/VideoLibrary';
import VideoPlayerPage from './videoPlayerComponent/VideoPlayerPage';
import { fetchVideosData } from '../redux/features/videoSlice';

const App = () => {
  const videoState = useSelector((state) => state.videos);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [currentPlayerVideoData, setCurrentPlayerVideoData] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideosData());
  }, []);

  return (
    <div className={appStyles.app}>
      <div className={appStyles.appInnerWrapper}>
        <AppHeader setShowUploadForm={setShowUploadForm} />
        <div className={appStyles.subComponentWrapper}>
          <Routes>
            <Route path='/' element={<VideoLibrary currentPlayerVideoData={currentPlayerVideoData} setCurrentPlayerVideoData={setCurrentPlayerVideoData} />} />
            <Route path='/player' element={<VideoPlayerPage currentPlayerVideoData={currentPlayerVideoData} setCurrentPlayerVideoData={setCurrentPlayerVideoData} />} />
            <Route path='/upload' element={<UploadFormComponent setCurrentPlayerVideoData={setCurrentPlayerVideoData} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
