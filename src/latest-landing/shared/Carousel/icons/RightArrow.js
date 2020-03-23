import React, { Component } from "react";

const RightArrow = ({ width = 16, height = 16, stroke = '#DA3451' }) => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M1 8H15" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 1L15 8L8 15" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

RightArrow.propTypes = {};
export default RightArrow;
