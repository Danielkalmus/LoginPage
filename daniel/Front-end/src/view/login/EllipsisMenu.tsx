import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EllipsisMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as Element).closest(".ellipsis-button") === null) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        className="ellipsis-button"
        onClick={toggleMenu}
        style={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
          borderRadius: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          height={"40px"}
          src="https://icons.veryicon.com/png/128/miscellaneous/hang/more-three-points.png"
          alt=""
        />{" "}
      </button>
      {isOpen && (
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            backgroundColor: "#f1f1f1",
            minWidth: "160px",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: 1,
          }}
        >
          <a
            href="#changePassword"
            onClick={() => navigate("/changePassword")}
            style={{
              color: "black",
              padding: "12px 16px",
              display: "block",
            }}
          >
            Change Password 🛠
          </a>
          <a
            href="#deleteAccount"
            onClick={() => navigate("/DeleteAccount")}
            style={{
              color: "black",
              padding: "12px 16px",
              display: "block",
            }}
          >
            Delete Account{" "}
            <img
              height={"20px"}
              src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/delete-448.png"
              alt="Delete"
            />
          </a>
        </div>
      )}
    </>
  );
};

export default EllipsisMenu;
