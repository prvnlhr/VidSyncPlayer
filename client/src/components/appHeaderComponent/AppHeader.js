import React from 'react';
import styles from "./styles/appHeaderStyle.module.css";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

const AppHeader = ({ setShowUploadForm }) => {

    const navigate = useNavigate();





    return (
        <div className={styles.appHeaderWrapper} >
            <div className={styles.appLogoWrapper} > </div>
            <div className={styles.headerBtnWrapper}>
                <button className={styles.uploadBtn} onClick={() => navigate("/upload")}>
                    <p>Upload</p>
                </button>
            </div>
        </div>
    )
}

export default AppHeader