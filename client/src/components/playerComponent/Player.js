import React, { useEffect, useState } from 'react'
import playerStyles from "./styles/player.module.css";
import subsrc from "./sub.vtt";
const Player = ({ exploreVideo, setExploreVideo, setCurrentPlayingVideo, currentPlayingVideo }) => {

    const handleVideoError = (event) => {
        console.error('Video error:', event.target.error);
    };

    return (
        <div className={!exploreVideo ? playerStyles.playerWrapper : playerStyles.playerWrapperShrink}>
            {currentPlayingVideo?.videoUrl &&
                <video className={playerStyles.videoTag} controls onError={handleVideoError}>
                    <source src={currentPlayingVideo?.videoUrl} type="video/mp4" />
                    <track kind="subtitles" src="./sub.vtt" srcLang="en" label="English" />
                </video>
            }
        </div>
    )
}

export default Player