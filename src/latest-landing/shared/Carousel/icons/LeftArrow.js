import React from "react";
import PropTypes from "prop-types";

const LeftArrow = ({ width = 16, height = 16, stroke = '#DA3451' }) => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M15 8H1" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 15L1 8L8 1" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

LeftArrow.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    stroke: PropTypes.string
};
export default LeftArrow;

