import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import styles from "./styles/videoUploadFormStyles.module.css";
import { uploadFormData } from "../../services/apiServices";
import subtt from "../playerComponent/sub.vtt"


const VideoUploadForm = ({ videoRef, handleSeek, updateShowSubTitleOverlay, seekMode, setSeekMode, showActiveSubtitle, setShowActiveSubtitle, setStartTime, startTime, setEndTime, endTime, subtitles, setSubtitles, selectedVideo, setSelectedVideo, videoTitle, setVideoTitle, setSliderTime, sliderTime, setVideoFile, videoFile }) => {



    const [currFocusField, setCurrFocusField] = useState(undefined);
    const onFocus = (val) => {
        setCurrFocusField(val)
    }


    let isDarkMode = false;

    const handleFileChange = (e) => {


        const file = e.target.files[0];
        setVideoFile(file);
        // Validate if the selected file is a video
        if (file && file.type.includes('video')) {
            setSelectedVideo(URL.createObjectURL(file));
        } else {
            alert('Please select a valid video file.');
        }
    };




    // ---------------------------------------


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


    /*
    When play/pause btn is clicked it add timeupdate event listner to range slider 
    because isPlaying is in useEffect dep. array.

    But let say without playing the video if change the start and end time from input
    it does not change range input values because be has not added event listner
*/

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

    const [imgFile, setImgFile] = useState();
    const [previewImg, setPreviewImg] = useState("");

    const previewFile = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        };
    };
    // const handleChange = (e) => {
    //     const file = e.target.files[0];
    //     setImgFile(file);
    //     previewFile(file);
    // };

    // const handleUpload = () => {
    //     const data = new FormData();
    //     data.append("imageTitle", 'This is sample img title');
    //     data.append("imageFile", imgFile);
    //     uploadFormData(data);
    // }



    return (
        <div className={styles.videoUploadWrapper}>

            <div className={styles.videoUploadInnerWrapper}>

                <div className={styles.videoSelectPreviewWrapper}>

                    <div className={styles.selectPreviewContainer}>
                        {/* <input
                            type="file"
                            id="file"
                            className={styles.imgFileInput}
                            onChange={handleChange}
                        /> */}

                        <label className={styles.videoLabelTag} htmlFor="video-input">
                            {
                                selectedVideo ?
                                    (
                                        <div className={styles.videoPreviewContainer}>
                                            <video
                                                className={styles.previewVideoTag}
                                                controls
                                                ref={videoRef}
                                                onTimeUpdate={seekMode ? handleSeek : null}
                                                onMouseEnter={() => setSeekMode(true)}>
                                                <source src={selectedVideo} type="video/mp4" />
                                                <track kind="subtitles" src="../playerComponent/sub.vtt" srclang="en-us" label="English" />
                                                Your browser does not support the video tag.
                                            </video>

                                            <div className={styles.subTitleOverlayDiv}>
                                                {showActiveSubtitle &&
                                                    <p>{showActiveSubtitle.text}</p>
                                                }

                                            </div>

                                        </div>
                                    )
                                    :
                                    (
                                        <div className={styles.uploadContainer}>
                                            <svg className={styles.uploadIcon} viewBox="0 0 42 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M40.0066 25.5892C40.0066 35.6663 31.4385 43.8355 20.8693 43.8355C10.3 43.8355 1.73193 35.6663 1.73193 25.5892" stroke={isDarkMode ? 'white' : 'black'} stroke-width="2.4178" stroke-linecap="round" />
                                                <path d="M19.8087 30.9293C19.8154 31.5969 20.362 32.1327 21.0296 32.1261C21.6972 32.1194 22.2331 31.5728 22.2264 30.9052L19.8087 30.9293ZM21.5681 0.371786C21.0913 -0.0955891 20.3259 -0.0879618 19.8585 0.388822L12.2422 8.15848C11.7748 8.63527 11.7824 9.40066 12.2592 9.86804C12.736 10.3354 13.5014 10.3278 13.9688 9.851L20.7388 2.94464L27.6452 9.71471C28.122 10.1821 28.8874 10.1745 29.3547 9.69768C29.8221 9.22089 29.8145 8.4555 29.3377 7.98812L21.5681 0.371786ZM22.2264 30.9052L21.9306 1.22304L19.513 1.24713L19.8087 30.9293L22.2264 30.9052Z" fill={isDarkMode ? 'white' : 'black'} />
                                            </svg>
                                            <p className={styles.fileLabelText1} >Click to choose file</p>
                                            <p className={styles.fileLabelText2}>Supported file types are <span className={styles.spanText} >video files</span></p>
                                        </div>
                                    )}
                        </label>
                        <input
                            className={styles.videoInputTag}
                            type="file"
                            id="video-input"
                            accept="video/*"
                            onChange={handleFileChange}
                            required
                        />
                        {/* <button type='button' onClick={handleUpload}>Upload</button> */}
                    </div>


                    <div className={styles.controlsContainer}>

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
                </div>

                <div className={styles.videoTitleInputWrapper}>
                    <div className={`${styles.vidTitleInputContainer} ${(currFocusField === 1) && styles.focusFieldStyle} `}>
                        <div className={styles.labelWrapper} >
                            <p style={{ color: selectedVideo ? '#7F56D9' : '#98A2B3' }} className={styles.labelText}>VIDEO TITLE</p>
                        </div>
                        <div className={styles.inputWrapper} >
                            <input
                                disabled={selectedVideo ? false : true}
                                // disabled={imgFile ? false : true}
                                className={styles.inputField}
                                required
                                type="text"
                                id="name"
                                onChange={(e) => setVideoTitle(e.target.value)}
                                onFocus={() => onFocus(1)}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default VideoUploadForm

