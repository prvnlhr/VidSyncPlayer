import React from 'react';
import styles from "./styles/appHeaderStyle.module.css";
import { Icon } from '@iconify/react';

const AppHeader = ({ setShowUploadForm }) => {

    return (
        <div className={styles.appHeaderWrapper} >
            <div className={styles.appLogoWrapper} > </div>
            <div className={styles.headerBtnWrapper}>
                <button className={styles.uploadBtn} onClick={() => setShowUploadForm((prev) => !prev)}>
                    <Icon className={styles.uploadIcon} icon="mingcute:upload-2-line" />
                    <p>Upload</p>
                </button>
            </div>
        </div>
    )
}

export default AppHeader