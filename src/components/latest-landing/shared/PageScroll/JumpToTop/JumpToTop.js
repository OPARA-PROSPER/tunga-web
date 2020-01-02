import React, { Component } from "react";

import Icon from '../../../assets/img/common/icons/icon-jump-to-top.png';


const JumpToTop = ({ goToPage, topSelector }) =>
    (
        <a className="JumpToTop" onClick={(e) => goToPage(topSelector, e)}>
            <img className="JumpToTop__img" src={Icon}/>
        </a>
    );

export default JumpToTop;
