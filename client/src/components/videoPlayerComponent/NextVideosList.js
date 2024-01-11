import React from 'react'
import styles from "./styles/nextVideoListStyles.module.css";
import nextItemStyles from "./styles/nextVideoItemStyles.module.css"
import { useSelector } from 'react-redux';

const NextVideosList = ({ setCurrentPlayerVideoData, currentPlayerVideoData }) => {

    const videoList = useSelector((state) => state.videos.videosData) || [];

    const filteredVideoList = currentPlayerVideoData
        ? videoList.filter(vid => vid._id !== currentPlayerVideoData?._id)
        : videoList;

    const NextVideo = ({ nextVidData }) => {
        return (
            <div className={nextItemStyles.videoWrapper} onClick={() => setCurrentPlayerVideoData(nextVidData)} >
                <div className={nextItemStyles.videoInnerWrapper}   >
                    <video
                        className={nextItemStyles.videoTag}
                        src={nextVidData.videoUrl}
                    />
                    <div className={nextItemStyles.videoTitleDiv} >
                        <p>{nextVidData.videoTitle}</p>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.nextListWrapper}>
            <div className={styles.nextListHeader}>
                <p className={styles.nextListHeaderText}>Other Videos</p>
            </div>
            <div className={styles.nextListContentWrapper}>
                {filteredVideoList?.map((vid, indx) => (
                    <NextVideo nextVidData={vid} />
                ))}
            </div>
        </div>
    )
}

export default NextVideosList