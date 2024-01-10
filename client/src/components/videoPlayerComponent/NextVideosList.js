import React from 'react'
import styles from "./styles/nextVideoListStyles.module.css";
import nextItemStyles from "./styles/nextVideoItemStyles.module.css"
import { useSelector } from 'react-redux';

const NextVideosList = ({ setCurrentPlayerVideoData }) => {

    const videoList = useSelector((state) => state.videos.videosData) || [];

    const NextVideo = ({ nextVidData }) => {
        return (
            <div className={nextItemStyles.videoWrapper} onClick={() => setCurrentPlayerVideoData(nextVidData)} >
                <div className={nextItemStyles.videoInnerWrapper}   >
                    <video
                        className={nextItemStyles.videoTag}
                        src={nextVidData.videoUrl}
                    />
                </div>
            </div>
        )
    }


    return (
        <div className={styles.nextListWrapper}>
            <div className={styles.nextListHeader}>
                <p className={styles.nextListHeaderText}>Up Next</p>
            </div>
            <div className={styles.nextListContentWrapper}>
                {videoList?.map((vid, indx) => (
                    <NextVideo nextVidData={vid} />
                ))}
            </div>
        </div>
    )
}

export default NextVideosList