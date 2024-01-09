import React from 'react'
import styles from "./styles/videoStyles.module.css";
import VideoThumbnail from 'react-video-thumbnail';
const VideoComponent = ({ exploreVideo, setExploreVideo, videoData, setCurrentPlayingVideo, currentPlayingVideo }) => {

    const { videoTitle, videoUrl, subtitleUrl } = videoData;
    return (
        <div className={exploreVideo ? styles.videoWrapperShrink : styles.videoWrapper} >
            <div className={styles.thumbnailWrapper} onClick={() => setCurrentPlayingVideo(videoData)}>
                <video
                    src={videoUrl}
                    alt={videoTitle}
                    className={styles.videoThumbnail}
                    controls={false}
                />
            </div>
        </div>
    )
}

export default VideoComponent