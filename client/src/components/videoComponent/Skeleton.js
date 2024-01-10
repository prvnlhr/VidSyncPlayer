import React from 'react';
import styles from "./styles/skeletonStyles.module.css";

const Skeleton = () => {
    const Shimmer = () => {
        return (
            <div className={styles.shimmerWrapper}>
                <div className={styles.shimmer}></div>
            </div>
        )
    }
    return (
        <div className={styles.videoWrapper} >
            <Shimmer />
        </div>
    )
}

export default Skeleton