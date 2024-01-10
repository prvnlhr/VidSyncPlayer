import React, { useState, useEffect, useRef } from 'react';
import styles from "./styles/videoPlayerPageStyles.module.css";
import playerStyles from "./styles/playerStyles.module.css";
import pageHeaderStyles from "./styles/pageHeaderStyles.module.css";
import NextVideosList from "./NextVideosList";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';



const VideoPlayerPage = ({ currentPlayerVideoData, setCurrentPlayerVideoData }) => {

    const videoRef = useRef(null);
    const navigate = useNavigate();

    const handleBackBtnClicked = () => {
        navigate("/");
    };


    const Player = () => {

        return (
            <div className={playerStyles.playerWrapper}>
                <div className={playerStyles.playerContainer}>
                    <div className={playerStyles.videoWrapper}>

                        <video
                            className={` ${playerStyles.playerVideoTag}`}
                            crossOrigin="anonymous"
                            controls
                            autoPlay
                            ref={videoRef}>
                            <source src={currentPlayerVideoData.videoUrl} type="video/mp4" />
                            <track default kind="metadata" type="text/vtt" src={currentPlayerVideoData.subtitleUrl} />
                        </video>
                    </div>
                    <div className={playerStyles.titleWrapper}>
                        <p>{currentPlayerVideoData.videoTitle}</p>
                    </div>
                    {/* <div className={playerStyles.subtitleOverlay}>
                        <p>sample subtitle</p>
                    </div> */}

                </div>
            </div>
        );
    };

    const PageHeader = () => {
        return (
            <div className={pageHeaderStyles.pageHeaderWrapper}>
                <button className={pageHeaderStyles.backBtn} type='button' onClick={handleBackBtnClicked}>
                    <Icon className={pageHeaderStyles.backBtIcon} icon="bi:arrow-up" rotate={3} />
                </button>
            </div>
        );
    };

    return (
        <div className={styles.videoPlayerPageWrapper}>
            <PageHeader />
            <Player />
            <NextVideosList setCurrentPlayerVideoData={setCurrentPlayerVideoData} />
        </div>
    );
};

export default VideoPlayerPage;
