import React from "react";
import { useNavigate } from "react-router-dom";

const ArrowButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleClick} style={styles}>
      <img
        style={{height:'40px', width:'60px'}}
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/return-149.png"
        alt="arrow"
      />{" "}
    </button>
  );
};

const styles = {
  position: "fixed",
  left: "50px",
  top: "50px",
};

export default ArrowButton;
