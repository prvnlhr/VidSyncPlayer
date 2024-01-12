import React from 'react';
import styles from "./styles/videoLibraryStyles.module.css";
import VideoComponent from '../videoComponent/VideoComponent';
import { useSelector } from 'react-redux';
import Skeleton from '../videoComponent/Skeleton';

const VideoLibrary = ({ setCurrentPlayerVideoData }) => {

    // Retrieve the list of videos and loading state from Redux store
    const videoList = useSelector((state) => state.videos.videosData) || [];
    const videoState = useSelector((state) => state.videos);
    const { isLoading, action } = videoState;

    return (
        <div className={styles.libraryComponentWrapper}>

            {/* <------------ Video library header ------------> */}
            <div className={styles.videoLibraryHeaderWrapper}>
                <p className={styles.headerText1}>Explore</p>
                <p className={styles.headerText2}>videos</p>
            </div>

            {/* <----------- Video library content ----------------> */}
            <div className={styles.videoLibraryContentWrapper}>
                {isLoading && action === 'fetching' ? (
                    // Display Skeleton component while videos are being fetched
                    <Skeleton />
                ) : (
                    videoList.map((video) => (
                        <>
                            <VideoComponent
                                key={video._id}
                                videoData={video}
                                setCurrentPlayerVideoData={setCurrentPlayerVideoData}
                            />
                        </>
                    ))
                )}
            </div>
        </div>
    );
}

export default VideoLibrary;
