import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import styles from "./styles/videoUploadFormStyles.module.css";
import { uploadFormData } from "../../services/apiServices";

const VideoUploadForm = ({ overlaySubTitle, setOverlaySubtitle, videoRef, formError, handleSeek, updateShowSubTitleOverlay, seekMode, setSeekMode, showActiveSubtitle, setShowActiveSubtitle, setStartTime, startTime, setEndTime, endTime, subtitles, setSubtitles, selectedVideo, setSelectedVideo, videoTitle, setVideoTitle, setSliderTime, sliderTime, setVideoFile, videoFile }) => {



    const [currFocusField, setCurrFocusField] = useState(undefined);
    const onFocus = (val) => {
        setCurrFocusField(val)
    }


    const [isPlaying, setIsPlaying] = useState(false);
    const playPauseHandler = () => {
        const video = videoRef.current;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };


    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleTimeUpdate = () => {
                setSliderTime(video.currentTime);
            };

            video.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [isPlaying, videoRef]);



    const videoInputRef = useRef(null);

    const selectVideo = () => {
        videoInputRef.current.click();
    };

    const previewVideo = () => {
        const videoInput = videoInputRef.current;
        const selectedVideo = videoInput.files[0];
        setVideoFile(selectedVideo);
        if (selectedVideo && selectedVideo.type.includes('video')) {
            const videoURL = URL.createObjectURL(selectedVideo);
            setSelectedVideo(videoURL);
        }
    };




    return (
        <div className={styles.vidComponentWrapper}>

            <div className={styles.vidComponentInnerWrapper} >

                <div className={`${styles.uploadPreviewBox} ${selectedVideo && styles.uploadPreviewBox_hiddenBorder}`} onClick={selectVideo}>
                    <input
                        type="file"
                        ref={videoInputRef}
                        style={{ display: 'none' }}
                        accept="video/*"
                        onChange={previewVideo}
                    />
                    {selectedVideo ? (
                        <video className={styles.previewVideoTag}
                            ref={videoRef}
                            onTimeUpdate={seekMode ? handleSeek : null}
                            onMouseEnter={() => setSeekMode(true)}
                        >

                            <source src={selectedVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) :
                        <div className={styles.selectPlaceholderContainer}>
                            <Icon className={styles.clickIcon} icon="ph:cursor-click-light" />
                            <p className={styles.selectText}>Click to select a video</p>
                            <p className={styles.supportedFormatText}>
                                Supported formats: <span>MP4, AVI, MKV, MOV, WMV, FLV, WebM, 3GP, OGG</span>
                            </p>
                        </div>
                    }
                    {selectedVideo &&
                        <div className={styles.vidSubtitleDiv}>
                            {/* <p>{overlaySubTitle}</p> */}
                        </div>
                    }
                </div>

                <div className={styles.videoControlsWrapper} >
                    {selectedVideo &&
                        <div className={styles.controlsInnerContainer}>
                            <div className={styles.playPauseBtnWrapper} onClick={playPauseHandler}>
                                <Icon
                                    className={styles.playPauseIcon}
                                    icon={isPlaying ? 'bi:pause-fill' : 'bi:play-fill'}
                                    rotate={4} />
                            </div>
                            <div className={styles.rangeSliderWrapper}>
                                <input
                                    className={styles.rangeInputSlider}
                                    type="range"
                                    min="0"
                                    max={videoRef.current ? videoRef.current.duration : 0}
                                    step="0.0001"
                                    value={sliderTime}
                                    onChange={(e) => {
                                        const newTime = parseFloat(e.target.value);
                                        setSliderTime(newTime);
                                        videoRef.current.currentTime = newTime;
                                    }}
                                />
                            </div>
                        </div>

                    }
                </div>

                <div className={styles.vidTitleInputWrapper}>
                    <div className={styles.vidTitleInputContainer} style={{ border: formError && (videoTitle.length === 0) ? '2px solid red' : '' }}>
                        <div className={`${styles.vidTitleInputInnerContainer} ${(currFocusField === 1) && styles.focusFieldStyle} `}  >
                            <div className={styles.labelWrapper} >
                                <p style={{ color: selectedVideo ? 'var(--ui-scheme-color)' : '#98A2B3' }} className={styles.labelText}>VIDEO TITLE</p>
                            </div>
                            <div className={styles.inputWrapper}>
                                <input
                                    disabled={selectedVideo ? false : true}
                                    className={styles.inputField}
                                    required
                                    type="text"
                                    id="name"
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                    onFocus={() => onFocus(1)}
                                    placeholder={formError ? formError : ''}

                                />
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default VideoUploadForm

