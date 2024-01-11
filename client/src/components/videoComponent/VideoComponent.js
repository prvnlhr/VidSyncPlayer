import React from 'react'
import styles from "./styles/videoStyles.module.css";
import { useNavigate } from "react-router-dom";

const VideoComponent = ({ videoData, currentPlayerVideoData, setCurrentPlayerVideoData }) => {
    const navigate = useNavigate();

    const handleVideoClicked = (videoData) => {
        navigate('/player');
        console.log(videoData);
        setCurrentPlayerVideoData(videoData);
    }

    return (
        <div className={styles.videoWrapper} >
            <div className={styles.videoInnerWrapper} onClick={() => handleVideoClicked(videoData)} >
                <video
                    className={styles.videoTag}
                    src={videoData.videoUrl}
                />

                <div className={styles.videoTitleDiv} >
                    <p>{videoData.videoTitle}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoComponent