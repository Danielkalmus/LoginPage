import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface EllipsisMenuProps {
  userId: number;
}

const EllipsisMenu: React.FC<EllipsisMenuProps> = ({ userId }) => {
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
          src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/more-to-circle.png"
          alt="More"
        />
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
          <button
            onClick={() => {
              navigate(`/RegisterOrUpdate`, { state: { userId, mode: "update" } });
              setIsOpen(false);
            }}
            style={{
              color: "black",
              padding: "12px 16px",
              display: "block",
              cursor: "pointer",
            }}
          >
            Update User{" "} 
            <img
              height={"20px"}
              src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/modify-37.png"
              alt="Update"
            />
          </button>
          <button
            onClick={() => {
              navigate(`/DeleteAccount`, { state: { userId } });
              setIsOpen(false);
            }}
            style={{
              color: "black",
              padding: "12px 16px",
              display: "block",
              cursor: "pointer",
            }}
          >
            Delete Account{" "}
            <img
              height={"20px"}
              src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/delete-448.png"
              alt="Delete"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default EllipsisMenu;
