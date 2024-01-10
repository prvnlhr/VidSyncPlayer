import React, { useState, useEffect, useRef } from 'react';
import styles from "./styles/videoPlayerPageStyles.module.css";
import playerStyles from "./styles/playerStyles.module.css";
import pageHeaderStyles from "./styles/pageHeaderStyles.module.css";
import NextVideosList from "./NextVideosList";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';

const VideoPlayerPage = ({ currentPlayerVideoData, setCurrentPlayerVideoData }) => {
    const videoRef = useRef(null);
    const customTrackRef = useRef(null);
    const navigate = useNavigate();

    const [cues, setCues] = useState([]);
    const [isCuesLoaded, setIsCuesLoaded] = useState(false);

    const handleBackBtnClicked = () => {
        navigate("/");
    };

    const preprocessCues = (vttText) => {
        const cueStrings = vttText.split('\n\n').filter(Boolean);

        return cueStrings.map((cueString) => {
            const lines = cueString.split('\n');
            if (lines.length >= 2) {
                const [timeString, content] = lines.slice(1);
                const [startTime, endTime] = timeString.split(' --> ').map(timeStringToSeconds);

                return {
                    startTime,
                    endTime,
                    text: content,
                };
            }
            return null;
        }).filter(Boolean);
    };


    const timeStringToSeconds = (timeString) => {
        const [minutes, seconds, milliseconds] = timeString.split(/[:.]/).map(parseFloat);

        return (
            (minutes || 0) * 60 +
            (seconds || 0) +
            (milliseconds || 0) / 1000
        );
    };

    const createVTTFile = (cues) => {
        return `WEBVTT\n\n${cues
            .map(
                (cue, index) =>
                    `${index + 1}\n${formatTime(cue.startTime)} --> ${formatTime(cue.endTime)}\n${cue.text}\n\n`
            )
            .join('')}`;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(
            milliseconds
        ).padStart(3, '0')}`;
    };


    const loadSubtitle = async () => {
        try {
            if (!currentPlayerVideoData || !currentPlayerVideoData.subtitleUrl) {
                console.error('Subtitle URL is undefined or empty.');
                return;
            }

            const response = await fetch(currentPlayerVideoData.subtitleUrl);
            if (response.ok) {
                const vttText = await response.text();
                const parsedCues = preprocessCues(vttText);
                setCues(parsedCues);
                setIsCuesLoaded(true);
            } else {
                console.error(`Failed to fetch subtitle: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching subtitle:', error);
        }
    };

    useEffect(() => {
        loadSubtitle();
    }, [currentPlayerVideoData]);




    const Player = () => {

        return (
            <div className={playerStyles.playerWrapper}>
                <div className={playerStyles.playerContainer}>
                    <div className={playerStyles.videoWrapper}>
                        <video
                            className={` ${playerStyles.playerVideoTag}`}
                            controls
                            ref={videoRef}
                        >
                            <source src={currentPlayerVideoData.videoUrl} type="video/mp4" />
                            <track
                                label="English"
                                kind="captions"
                                srcLang="en"
                                src={`data:text/vtt;base64,${btoa(createVTTFile(cues))}`}
                                default
                            />
                        </video>
                    </div>
                    <div className={playerStyles.titleWrapper}>
                        <p>{currentPlayerVideoData.videoTitle}</p>
                    </div>
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
