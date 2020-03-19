import React from "react";
import Progress from "./Progress";

const BootLogo = ({}) => {
  return (
        <div className="boot-logo">
            <div>
                <img src={require("../../../assets/images/logo_new_color.png").default} />
            </div>
            <Progress />
        </div>
  );
};

export default BootLogo;
