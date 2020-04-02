import React from "react";
import PropTypes from "prop-types";

const RightArrow = ({ width = 16, height = 16, stroke = '#DA3451' }) => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M1 8H15" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 1L15 8L8 15" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

RightArrow.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    stroke: PropTypes.string
};
export default RightArrow;
