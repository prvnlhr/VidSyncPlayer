import React from 'react'
import listHeaderStyles from './styles/listHeaderStyles.module.css'
const ListHeader = ({ exploreVideo, setExploreVideo }) => {
    return (
        <div className={exploreVideo ? listHeaderStyles.listHeaderWrapperExpand : listHeaderStyles.listHeaderWrapper}>
            <div className={exploreVideo ? listHeaderStyles.textBoxExpand : listHeaderStyles.textBox} onClick={() => setExploreVideo((prev) => !prev)}>
                <p className={listHeaderStyles.listHeaderText1}>Explore</p >
                <p className={listHeaderStyles.listHeaderText2}>videos</p>
                <div className={exploreVideo ? listHeaderStyles.listIndicatorDivExpand : listHeaderStyles.listIndicatorDiv}></div>
            </div>


        </div >
    )
}

export default ListHeader