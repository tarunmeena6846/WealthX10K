import React, { useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { userState } from "./store/atoms/user";
import { useRecoilState } from "recoil";

const UserAvatar = ({ userEmail, size = 40 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserState, setCurrentUserState] = useRecoilState(userState);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setCurrentUserState({
          userEmail: currentUserState.userEmail,
          isLoading: currentUserState.isLoading,
          imageUrl: imageUrl,
        });
        setIsEditing(false); // Reset isEditing after handling image change
        // Clear the file input value to allow selecting the same file again
        fileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    // Trigger the click event on the file input when the avatar is clicked
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (isEditing) {
      handleClick();
    }
  }, [isEditing]);

  return (
    <div style={{ position: "relative" }}>
      <Avatar
        alt="User Avatar"
        src={currentUserState.imageUrl}
        style={{ width: size, height: size, cursor: "pointer" }}
        onClick={handleClick}
      />

      <input
        accept="image/*"
        id="avatar-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
        ref={fileInputRef}
      />

      {isEditing && (
        <label htmlFor="avatar-upload">
          <Avatar
            alt="Edit Avatar"
            src={currentUserState.imageUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: size,
              height: size,
            }}
          />
        </label>
      )}
    </div>
  );
};

export default UserAvatar;
