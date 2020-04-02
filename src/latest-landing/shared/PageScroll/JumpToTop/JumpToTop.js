import React from "react";
import "./JumpToTop.scss";

import Icon from '../../../assets/img/common/icons/icon-jump-to-top.png';


const JumpToTop = ({ goToPage, currentPage, isMobile, force }) =>
    (force || !!currentPage || isMobile) && (
        <a className="JumpToTop" onClick={() => goToPage(0)}>
            <img className="JumpToTop__img" src={Icon}/>
        </a>
    );

export default JumpToTop;
