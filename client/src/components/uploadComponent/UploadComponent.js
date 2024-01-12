import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles/uploadCompStyles.module.css';
import VideoUploadComponent from './VideoUploadComponent';
import SubtitleInputComponent from './SubtitleInputComponent';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uploadVideoData } from '../../redux/features/videoSlice';

const UploadComponent = ({ setCurrentPlayerVideoData }) => {



    const videoRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();





    const [formError, setFormError] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0.1);
    const [sliderTime, setSliderTime] = useState(0);
    const [subtitles, setSubtitles] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [seekMode, setSeekMode] = useState(true);
    const [overlaySubText, setOverlaySubText] = useState('');



    const updateShowSubTitleOverlay = (durationInSeconds) => {

        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        const milliseconds = Math.floor((durationInSeconds % 1) * 1000);



        const activeSubtitlesForTime = subtitles.filter((subtitle) => {
            const startTimestamp =
                parseFloat(subtitle.startTime.minutes) * 60 +
                parseFloat(subtitle.startTime.seconds) +
                parseFloat(subtitle.startTime.milliseconds) / 1000;

            const endTimestamp =
                parseFloat(subtitle.endTime.minutes) * 60 +
                parseFloat(subtitle.endTime.seconds) +
                parseFloat(subtitle.endTime.milliseconds) / 1000;

            return startTimestamp <= durationInSeconds && endTimestamp >= durationInSeconds;
        });

        if (activeSubtitlesForTime) {
            setOverlaySubText(activeSubtitlesForTime[0]?.text);
        } else {
            setOverlaySubText('');
        }
    }


    const handleSeek = () => {
        let currentTime;
        const video = videoRef.current;
        currentTime = video.currentTime;
        setStartTime(currentTime);
        setEndTime(currentTime + 0.1);
        updateShowSubTitleOverlay(currentTime);
    };



    const generateWebVTT = () => {
        let vttContent = 'WEBVTT\n\n';

        subtitles.forEach((subtitle, index) => {
            const startTime = `${subtitle.startTime.minutes}:${subtitle.startTime.seconds}.${subtitle.startTime.milliseconds}`;
            const endTime = `${subtitle.endTime.minutes}:${subtitle.endTime.seconds}.${subtitle.endTime.milliseconds}`;

            vttContent += `${index + 1}\n${startTime} --> ${endTime}\n${subtitle.text}\n\n`;
        });

        return vttContent;
    };


    const handleFormSubmit = () => {
        if (!videoTitle) {
            setFormError('Title is required');
            return;
        }

        const vttContent = generateWebVTT();
        const formData = new FormData();

        formData.append('videoTitle', videoTitle);
        formData.append('videoFile', videoFile);
        formData.append('subtitleFile', new Blob([vttContent], { type: 'text/vtt' }), 'subtitles.vtt');

        dispatch(uploadVideoData(formData))
            .then((action) => {
                setCurrentPlayerVideoData(action.payload);
            })
            .catch((error) => {
                console.error('Upload failed:', error);
            });

        navigate('/player');
    };



    return (
        <div className={styles.uploadComponentWrapper}>
            <div className={styles.headerWrapper}>
                <button className={styles.backBtn} type="button" onClick={() => navigate('/')}>
                    <Icon className={styles.backBtIcon} icon="bi:arrow-up" rotate={3} />
                </button>


                {selectedVideo && (
                    <button className={styles.submitBtn} onClick={handleFormSubmit} type="button">
                        <div className={styles.btnIconDiv}>
                            <Icon className={styles.btnIcon} icon="tabler:upload" />
                        </div>
                        <div className={styles.btnTextDiv}>
                            <p>Upload</p>
                        </div>
                    </button>
                )}
            </div>

            <div className={styles.uploadComponentInnerWrapper}>

                <VideoUploadComponent
                    videoRef={videoRef}
                    setSeekMode={setSeekMode}
                    overlaySubText={overlaySubText}
                    formError={formError}
                    handleSeek={handleSeek}
                    seekMode={seekMode}
                    selectedVideo={selectedVideo}
                    setSelectedVideo={setSelectedVideo}
                    videoTitle={videoTitle}
                    setVideoTitle={setVideoTitle}
                    setSliderTime={setSliderTime}
                    sliderTime={sliderTime}
                    setVideoFile={setVideoFile}
                />

                <SubtitleInputComponent
                    videoRef={videoRef}
                    updateShowSubTitleOverlay={updateShowSubTitleOverlay}
                    setSeekMode={setSeekMode}
                    setStartTime={setStartTime}
                    startTime={startTime}
                    setEndTime={setEndTime}
                    endTime={endTime}
                    subtitles={subtitles}
                    setSubtitles={setSubtitles}
                    selectedVideo={selectedVideo}
                    setSliderTime={setSliderTime}
                />
            </div>
        </div>
    );
};

export default UploadComponent;