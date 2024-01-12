import React from 'react';
import styles from "./styles/videoStyles.module.css";
import { useNavigate } from "react-router-dom";

const VideoComponent = ({
    videoData,
    setCurrentPlayerVideoData
}) => {

    const navigate = useNavigate();

    // Function to handle when a video is clicked
    const handleVideoClicked = () => {

        // Navigate to the '/player' route
        navigate('/player');

        // Set the current player video data using the provided function
        setCurrentPlayerVideoData(videoData);
    }

    return (
        <div className={styles.videoWrapper} >

            <div className={styles.videoInnerWrapper} onClick={handleVideoClicked} >
                {/* <----------- Video tag displaying the video from the provided data ------------------> */}
                <video
                    className={styles.videoTag}
                    src={videoData.videoUrl}
                />

                {/* <--------- Display the video title --------------> */}
                <div className={styles.videoTitleDiv} >
                    <p>{videoData.videoTitle}</p>
                </div>
            </div>
        </div>
    );
}

export default VideoComponent;
