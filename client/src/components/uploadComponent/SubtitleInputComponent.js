import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import styles from "./styles/subTitleInputCompStyles.module.css";

const SubtitleInputComponent = ({
    videoRef,
    updateShowSubTitleOverlay,
    setSeekMode,
    setStartTime,
    startTime,
    setEndTime,
    endTime,
    subtitles,
    setSubtitles,
    selectedVideo,
    setSliderTime
}) => {



    const [subtitleText, setSubtitleText] = useState('');


    // Function to format time in minutes, seconds, and milliseconds
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 1000);
        return {
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
            milliseconds: String(milliseconds).padStart(3, '0'),
        };
    };


    // Event handler for subtitle text input change

    const handleSubtitleTextChange = (e) => {
        setSubtitleText(e.target.value);
    };


    // Handler to add the inputted subtitle along with its timestamp
    const handleAddSubtitle = () => {


        // 1. Create new object of subtitle
        const newSubtitle = {
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            text: subtitleText,
        };

        // 2. Put in list of subtitles state
        setSubtitles([newSubtitle, ...subtitles]);



        // 3. Clear the subtitle text input
        setSubtitleText('');


        //4.  After adding new subtitle, update the startTime for next subtitle input
        setStartTime((parseFloat(newSubtitle.endTime.minutes) * 60) +
            parseFloat(newSubtitle.endTime.seconds) +
            parseFloat(newSubtitle.endTime.milliseconds) / 1000 + 0.10); // Add 150 milliseconds

        // 5. Also update the end time
        setEndTime(
            (parseFloat(newSubtitle.endTime.minutes) * 60) +
            parseFloat(newSubtitle.endTime.seconds) +
            parseFloat(newSubtitle.endTime.milliseconds) / 1000 +
            0.10 + 0.1 // Add 150 milliseconds and additional 100 milliseconds
        );


    };


    // When user changes the  values in START TIME input field, this function does:
    // 1. updates the startTime state
    // 2. Also moves the video to that time
    const handleStarTimeIncrement = (unit) => {

        setSeekMode(true);
        const video = videoRef.current;
        let newTime;

        switch (unit) {
            case 'minutes':
                newTime = parseFloat(startTime) + 60;
                break;
            case 'seconds':
                newTime = parseFloat(startTime) + 1;
                break;
            case 'milliseconds':
                // newTime = parseFloat(startTime) + 0.001; // 1 millisec
                // newTime = parseFloat(startTime) + 0.01; // 10 millisec
                newTime = parseFloat(startTime) + 0.1;     // 100 milli
                break;
            default:
                break;
        }

        if (video) {
            setStartTime(newTime);
            // setEndTime(newTime + 0.1); // Not in use. now endTime is automatically changed with useEffect
            video.currentTime = newTime;
            setSliderTime(newTime);
        }
    };


    // This is function is similar to above start time increment, except it decrements start time
    const handleStarTimeDecrement = (unit) => {

        setSeekMode(true);

        const video = videoRef.current;
        let newTime;

        switch (unit) {
            case 'minutes':
                newTime = Math.max(0, parseFloat(startTime) - 60); // Decrement by 60 seconds (1 minute), ensuring it doesn't go below 0
                break;
            case 'seconds':
                newTime = Math.max(0, parseFloat(startTime) - 1); // Decrement by 1 second, ensuring it doesn't go below 0
                break;
            case 'milliseconds':
                newTime = Math.max(0, parseFloat(startTime) - 0.1); // Decrement by 0.1 second (100 milliseconds), ensuring it doesn't go below 0
                break;
            default:
                break;
        }

        setStartTime(newTime);
        // setEndTime(newTime + 0.01); 
        video.currentTime = newTime;
        setSliderTime(newTime);

    };


    // This is same as above but work for END TIME incrementing
    const handleIncrementEndTime = (unit) => {

        setSeekMode(false);

        const video = videoRef.current;
        let newEndTime;

        switch (unit) {
            case 'minutes':
                newEndTime = parseFloat(endTime) + 60;
                break;
            case 'seconds':
                newEndTime = parseFloat(endTime) + 1;
                break;
            case 'milliseconds':
                newEndTime = parseFloat(endTime) + 0.1;
                break;
            default:
                break;
        }

        setEndTime(newEndTime);
        video.currentTime = newEndTime;
        setSliderTime(newEndTime);

    };


    // This is same as above but work for END TIME decrementing
    const handleDecrementEndTime = (unit) => {


        setSeekMode(false);

        const video = videoRef.current;
        let newEndTime;

        switch (unit) {
            case 'minutes':
                newEndTime = Math.max(startTime, parseFloat(endTime) - 60); // Decrement by 60 seconds (1 minute), ensuring it doesn't go below startTime
                break;
            case 'seconds':
                newEndTime = Math.max(startTime, parseFloat(endTime) - 1); // Decrement by 1 second, ensuring it doesn't go below startTime
                break;
            case 'milliseconds':
                newEndTime = Math.max(startTime, parseFloat(endTime) - 0.1); // Decrement by 0.1 second (100 milliseconds), ensuring it doesn't go below startTime
                break;
            default:
                break;
        }

        setEndTime(newEndTime);
        video.currentTime = newEndTime;
        setSliderTime(newEndTime);
    };


    // When the item from list of all added subtitles is clicked this functions
    // shows them on video and also move the video time accordingly
    const handleListSubtitleClicked = (clickedSub) => {

        setSeekMode(false);
        // Update startTime and endTime states with the clicked subtitle's start and end times
        setStartTime(parseFloat(clickedSub.startTime.minutes) * 60 +
            parseFloat(clickedSub.startTime.seconds) +
            parseFloat(clickedSub.startTime.milliseconds) / 1000);

        setEndTime(parseFloat(clickedSub.endTime.minutes) * 60 +
            parseFloat(clickedSub.endTime.seconds) +
            parseFloat(clickedSub.endTime.milliseconds) / 1000);

        setSliderTime(parseFloat(clickedSub.startTime.minutes) * 60 +
            parseFloat(clickedSub.startTime.seconds) +
            parseFloat(clickedSub.startTime.milliseconds) / 1000);

        // Seek the video player to the start time of the clicked subtitle
        const video = videoRef.current;
        video.currentTime = parseFloat(clickedSub.startTime.minutes) * 60 +
            parseFloat(clickedSub.startTime.seconds) +
            parseFloat(clickedSub.startTime.milliseconds) / 1000;


        // This is the actual function which will show the subtitles
        updateShowSubTitleOverlay(video.currentTime);
    };




    return (
        <div className={styles.subtitleInputWrapper}>

            <div className={styles.subtitleInputInnerWrapper} >

                <div className={styles.timeSubInputFormWrapper}>


                    {/* <-------- START TIME input field ---------------------------------------------------------> */}

                    <div className={styles.startTimeWrapper}>
                        <div className={styles.startTimeContainer}>

                            <div className={styles.labelWrapper}>
                                <p style={{ color: selectedVideo ? 'var(--ui-scheme-color)' : '#98A2B3' }}>START TIME</p>
                            </div>
                            <div className={styles.inputWrapper}>
                                <div className={`${styles.timeWrapper} ${styles.minWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeIncrement('minutes')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={`${styles.timeInput}`}
                                        value={formatTime(startTime).minutes}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(e.target.value) * 60) + parseFloat(formatTime(startTime).seconds) + (parseFloat(formatTime(startTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeDecrement('minutes')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>

                                <div className={`${styles.timeWrapper} ${styles.secWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeIncrement('seconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={`${styles.timeInput}`}
                                        value={formatTime(startTime).seconds}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(formatTime(startTime).minutes) * 60) + parseFloat(e.target.value) + (parseFloat(formatTime(startTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeDecrement('seconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>

                                <div className={`${styles.timeWrapper} ${styles.milliSecWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeIncrement('milliseconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        className={` ${styles.timeInput}`}
                                        value={formatTime(startTime).milliseconds}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(formatTime(startTime).minutes) * 60) + parseFloat(e.target.value) + (parseFloat(formatTime(startTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeDecrement('milliseconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <--------   END TIME input field -------------------------------------------------------> */}

                    <div className={styles.endTimeWrapper}>
                        <div className={styles.endTimeContainer}>
                            <div className={styles.labelWrapper}>
                                <p style={{ color: selectedVideo ? 'var(--ui-scheme-color)' : '#98A2B3' }}>END TIME</p>
                            </div>
                            <div className={styles.inputWrapper}>
                                <div className={`${styles.timeWrapper} ${styles.minWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleIncrementEndTime('minutes')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={`${styles.timeInput}`}
                                        value={formatTime(endTime).minutes}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(e.target.value) * 60) + parseFloat(formatTime(endTime).seconds) + (parseFloat(formatTime(endTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleDecrementEndTime('minutes')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>

                                <div className={`${styles.timeWrapper} ${styles.secWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleIncrementEndTime('seconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={`${styles.timeInput}`}
                                        value={formatTime(endTime).seconds}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(formatTime(endTime).minutes) * 60) + parseFloat(e.target.value) + (parseFloat(formatTime(endTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleDecrementEndTime('seconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>

                                <div className={`${styles.timeWrapper} ${styles.milliSecWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleIncrementEndTime('milliseconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={` ${styles.timeInput}`}
                                        value={formatTime(endTime).milliseconds}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(formatTime(endTime).minutes) * 60) + parseFloat(e.target.value) + (parseFloat(formatTime(endTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleDecrementEndTime('milliseconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <------  Subtitle input field -----------------------------------------------------------------> */}
                    <div className={styles.subtitleTextInputWrapper}>
                        <div className={styles.subtitleTextInputContainer}>
                            <div className={styles.labelWrapper}>
                                <p style={{ color: selectedVideo ? 'var(--ui-scheme-color)' : '#98A2B3' }}>SUBTITLE TEXT</p>
                            </div>
                            <div className={styles.subInputWrapper}>
                                <input
                                    style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                    disabled={selectedVideo ? false : true}
                                    className={styles.subtitleTextInput}
                                    value={subtitleText}
                                    onChange={(e) => {
                                        handleSubtitleTextChange(e);
                                    }}
                                />
                            </div>
                            <div className={styles.addBtnWrapper}>
                                {subtitleText.length !== 0 &&
                                    <button type='button' className={styles.addBtn} onClick={handleAddSubtitle}>
                                        <Icon className={styles.addBtnIcon} icon="radix-icons:arrow-up" rotate={1} />
                                    </button >
                                }
                            </div>
                        </div>
                    </div>
                </div>


                {/* <------------ List of all added subtiles ---------------------------------------------------------> */}

                <div className={styles.add_list_and_header_wrapper}>

                    <div className={styles.addedListHeaderWraper}>
                        <p>Added Subtitles</p>
                    </div>

                    <div className={styles.addedSubsListWrapper}>
                        {subtitles && subtitles.length > 0 ? (
                            subtitles.map((subtitle, index) => (
                                <div
                                    className={styles.addListItemWrapper}
                                    onClick={() => handleListSubtitleClicked(subtitle)}>
                                    <div className={styles.startTimeStampDiv}>
                                        <p>{`${subtitle.startTime.minutes}: ${subtitle.startTime.seconds}:${subtitle.startTime.milliseconds}`}</p>
                                    </div>
                                    <div className={styles.endTimeStampDiv}>
                                        <p>{`${subtitle.endTime.minutes}: ${subtitle.endTime.seconds}:${subtitle.endTime.milliseconds}`}</p>
                                    </div>
                                    <div className={styles.subtitleTextDiv}>
                                        <div className={styles.subtitleTextInnerDiv}>
                                            <p className={styles.subtitleText}> {subtitle.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noSubMessageText}> • Add subtitles to show</p>

                        )}
                    </div>


                </div>
            </div>

        </div >
    )
}

export default SubtitleInputComponent
