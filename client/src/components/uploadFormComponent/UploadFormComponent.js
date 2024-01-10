import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import styles from "./styles/uploadFormComponentStyles.module.css";
import VideoUploadForm from "./VideoUploadForm";
import SubtitleForm from "./SubtitleForm";
import { uploadFormData } from "../../services/apiServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { uploadVideoData } from "../../redux/features/videoSlice"

const UploadFormComponent = () => {

    const navigate = useNavigate();

    const videosState = useSelector((state) => state.videos);

    const { isLoading, action } = videosState;


    const dispatch = useDispatch();

    const videoRef = useRef(null);

    const [formError, setFormError] = useState('');

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0.01);

    const [sliderTime, setSliderTime] = useState(0);

    const [subtitles, setSubtitles] = useState([]);
    const [showActiveSubtitle, setShowActiveSubtitle] = useState(null);


    const [videoFile, setVideoFile] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');


    const [seekMode, setSeekMode] = useState(true);


    const updateShowSubTitleOverlay = (durationInSeconds) => {

        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        const milliseconds = Math.floor((durationInSeconds % 1) * 1000);

        // console.log(`Duration: ${minutes} minutes, ${seconds} seconds, ${milliseconds} milliseconds`);
        // console.log(subtitles);
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
            // console.log(minutes, ':', seconds, ':', milliseconds, activeSubtitlesForTime)
            setShowActiveSubtitle(activeSubtitlesForTime[0]);
        } else {
            setShowActiveSubtitle(null);
        }
    }

    const handleSeek = () => {
        let currentTime;
        const video = videoRef.current;
        currentTime = video.currentTime;
        currentTime = video.currentTime;
        setStartTime(currentTime);
        setEndTime(currentTime + 0.01);
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

        dispatch(uploadVideoData(formData));
        console.log('Check');
        // navigate("/player");
    };




    return (
        <div className={styles.uploadComponentWrapper}>

            <div className={styles.headerWrapper} >
                <button className={styles.backBtn} type='button' onClick={() => navigate('/')}>
                    <Icon className={styles.backBtIcon} icon="bi:arrow-up" rotate={3} />
                </button>

                {selectedVideo &&
                    <div className={styles.submitBtnContainer} >
                        <button className={styles.submitBtn}
                            onClick={handleFormSubmit}
                            type='button'>
                            {(isLoading && action === 'uploading')
                                ?
                                <p>Uploding</p>
                                :
                                <p>Upload</p>
                            }
                        </button>
                    </div>
                }
            </div>

            <div className={styles.uploadComponentInnerWrapper}>
                <VideoUploadForm formError={formError} videoRef={videoRef} handleSeek={handleSeek} updateShowSubTitleOverlay={updateShowSubTitleOverlay} seekMode={seekMode} setSeekMode={setSeekMode} showActiveSubtitle={showActiveSubtitle} setShowActiveSubtitle={setShowActiveSubtitle} setStartTime={setStartTime} startTime={startTime} setEndTime={setEndTime} endTime={endTime} subtitles={subtitles} setSubtitles={setSubtitles} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} videoTitle={videoTitle} setVideoTitle={setVideoTitle} setSliderTime={setSliderTime} sliderTime={sliderTime} setVideoFile={setVideoFile} videoFile={videoFile} />
                <SubtitleForm videoRef={videoRef} handleSeek={handleSeek} updateShowSubTitleOverlay={updateShowSubTitleOverlay} seekMode={seekMode} setSeekMode={setSeekMode} showActiveSubtitle={showActiveSubtitle} setShowActiveSubtitle={setShowActiveSubtitle} setStartTime={setStartTime} startTime={startTime} setEndTime={setEndTime} endTime={endTime} subtitles={subtitles} setSubtitles={setSubtitles} selectedVideo={selectedVideo} setSliderTime={setSliderTime} sliderTime={sliderTime} />
            </div>
        </div>
    );
};

export default UploadFormComponent;


{/* <div className={styles.submitBtnWrapper}>
{selectedVideo &&
    <>
        <button className={styles.submitBtn}
            onClick={handleFormSubmit}
            type='button'>
            {(isLoading && action === 'uploading')
                ?
                <p>Uploding</p>
                :
                <p>Upload</p>
            }
        </button>

    </>
}
</div> */}