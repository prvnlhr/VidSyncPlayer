import React, { useEffect, useState } from 'react'
import playerStyles from "./styles/player.module.css";

import videoo from "./sampleVid.mp4"
import subtt from "./sub.vtt"
const Player = ({ exploreVideo, setExploreVideo, setCurrentPlayingVideo, currentPlayingVideo }) => {

    const handleVideoError = (event) => {
        console.error('Video error:', event.target.error);
    };

    return (
        <div className={!exploreVideo ? playerStyles.playerWrapper : playerStyles.playerWrapperShrink}>
            {currentPlayingVideo?.videoUrl &&
                <video className={playerStyles.videoTag} controls autoPlay crossorigin="anonymous">
                    <source src={currentPlayingVideo.videoUrl} type="video/mp4" />
                    <track kind="subtitles" src={currentPlayingVideo.subtitleUrl} srcLang="en" label="English" defaults />
                </video>
            }
        </div>
    )
}

export default Player
