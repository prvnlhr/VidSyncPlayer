import React, { useEffect, useState } from 'react';
import appStyles from "./app.module.css";
import Player from './playerComponent/Player';
import VideosList from "./videoListComponent/VideosList";
import AppHeader from './appHeaderComponent/AppHeader';
import UploadFormComponent from './uploadFormComponent/UploadFormComponent';
import { fetchVideos } from "../services/apiServices"
const App = () => {


  const [videosArray, setVideoArray] = useState([]);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);


  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetchVideos();
        console.log("All Videos:", response.data);

        // Update state with the fetched videos
        setVideoArray(response.data);

      } catch (error) {
        console.error("Error fetching all videos:", error.message);
      }
    };

    getVideos();
  }, []); // Empty dependency array ensures that this effect runs only once, equivalent to componentDidMount


  const [exploreVideo, setExploreVideo] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  return (
    <div className={appStyles.app}>
      <div className={appStyles.appInnerWrapper}>
        <AppHeader setShowUploadForm={setShowUploadForm} />
        {
          showUploadForm ?
            <UploadFormComponent />
            :
            <div className={appStyles.subComponentWrapper}>
              <Player exploreVideo={exploreVideo} setExploreVideo={setExploreVideo} currentPlayingVideo={currentPlayingVideo} setCurrentPlayingVideo={setCurrentPlayingVideo} />
              <VideosList exploreVideo={exploreVideo} setExploreVideo={setExploreVideo} videosArray={videosArray} currentPlayingVideo={currentPlayingVideo} setCurrentPlayingVideo={setCurrentPlayingVideo} />
            </div>

        }
      </div>

    </div>
  )
}

export default App