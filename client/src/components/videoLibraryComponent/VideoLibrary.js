import React from 'react'
import styles from "./styles/videoLibraryStyles.module.css";
import VideoComponent from '../videoComponent/VideoComponent';
import { useSelector } from 'react-redux';

const VideoLibrary = ({ currentPlayerVideoData, setCurrentPlayerVideoData }) => {


    const videoList = useSelector((state) => state.videos.videosData) || [];

    return (
        <div className={styles.libraryComponentWrapper}>
            <div className={styles.videoLibraryHeaderWrapper}>
                <p className={styles.headerText1}>Explore</p>
                <p className={styles.headerText2}>vidoes</p>
            </div>
            <div className={styles.videoLibraryContentWrapper}>

                {videoList.map((video) => (
                    <VideoComponent videoData={video} currentPlayerVideoData={currentPlayerVideoData} setCurrentPlayerVideoData={setCurrentPlayerVideoData} />
                ))}
            </div>
        </div>
    )
}

export default VideoLibrary