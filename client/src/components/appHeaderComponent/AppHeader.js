import React from 'react';
import styles from "./styles/appHeaderStyle.module.css";
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from "react-router-dom";
const AppHeader = ({ setShowUploadForm }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const shouldRender = location.pathname === '/';

    return (
        <div className={styles.appHeaderWrapper} >
            <div className={styles.appLogoWrapper} > </div>
            <div className={styles.headerBtnWrapper}>
                {shouldRender &&
                    <button className={styles.uploadBtn} onClick={() => navigate("/upload")}>
                        <p>Upload</p>
                    </button>
                }
            </div>
        </div>
    )
}

export default AppHeader