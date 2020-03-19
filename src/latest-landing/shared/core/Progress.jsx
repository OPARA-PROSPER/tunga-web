import React from "react";

const Progress = ({ message }) => {
  return (
        <div className="loading">
            <img src={require("../../../assets/images/rolling.gif").default} />{" "}
            {message || ""}
        </div>
  );
};

export default Progress;
