import React from 'react';
import styles from "./styles/listStyles.module.css";
import ListHeader from "./ListHeader";
import VideoComponent from "../videoComponent/VideoComponent"
const VideosList = ({ exploreVideo, setExploreVideo, videosArray, setCurrentPlayingVideo, currentPlayingVideo }) => {

    

    return (
        <div className={exploreVideo ? styles.listWrapperExpand : styles.listWrapper}>

            <ListHeader exploreVideo={exploreVideo} setExploreVideo={setExploreVideo} />
            <div className={exploreVideo ? styles.listContentWrapperExpand : styles.listContentWrapper}>
                {videosArray.map((videoData, indx) => (
                    <VideoComponent key={indx} exploreVideo={exploreVideo} setExploreVideo={setExploreVideo} videoData={videoData} currentPlayingVideo={currentPlayingVideo} setCurrentPlayingVideo={setCurrentPlayingVideo} />
                ))}
            </div>

        </div>
    )
}

export default VideosList;