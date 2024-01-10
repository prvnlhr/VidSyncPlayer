import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import appStyles from "./app.module.css";
import Player from './playerComponent/Player';
import VideosList from "./videoListComponent/VideosList";
import AppHeader from './appHeaderComponent/AppHeader';
import UploadFormComponent from './uploadFormComponent/UploadFormComponent';
import { fetchVideosData } from "../redux/features/videoSlice"
import VideoLibrary from './videoLibraryComponent/VideoLibrary';
import { Route, Routes } from "react-router-dom";
import VideoPlayerPage from "./videoPlayerComponent/VideoPlayerPage"

const App = () => {


  const [videosArray, setVideoArray] = useState([]);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);

  const [showPlayer, setShowPlayer] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideosData());
  }, []);

  const [exploreVideo, setExploreVideo] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [currentPlayerVideoData, setCurrentPlayerVideoData] = useState('');

  return (
    <div className={appStyles.app}>
      <div className={appStyles.appInnerWrapper}>
        <AppHeader setShowUploadForm={setShowUploadForm} />
        <div className={appStyles.subComponentWrapper}>
          <Routes>
            <Route path='/'
              element={<VideoLibrary currentPlayerVideoData={currentPlayerVideoData} setCurrentPlayerVideoData={setCurrentPlayerVideoData} />}>
            </Route>
            <Route path='/player'
              element={<VideoPlayerPage currentPlayerVideoData={currentPlayerVideoData} setCurrentPlayerVideoData={setCurrentPlayerVideoData} />}>
            </Route>
            <Route path='/upload'
              element={<UploadFormComponent />}>
            </Route>
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default App


// {
//   showUploadForm ?
//     <UploadFormComponent />
//     :
//     <div className={appStyles.subComponentWrapper}>
//       <VideoLibrary />
//     </div>
// }
{/* <Player exploreVideo={exploreVideo} setExploreVideo={setExploreVideo} currentPlayingVideo={currentPlayingVideo} setCurrentPlayingVideo={setCurrentPlayingVideo} /> */ }
{/* <VideosList exploreVideo={exploreVideo} setExploreVideo={setExploreVideo} videosArray={videosArray} currentPlayingVideo={currentPlayingVideo} setCurrentPlayingVideo={setCurrentPlayingVideo} /> */ }