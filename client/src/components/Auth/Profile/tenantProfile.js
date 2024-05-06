import React, { useState, useEffect } from "react";
import Navbar from "../../Pages/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [selectedOption, setSelectedOption] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [tenantRoom, setTenantRoom] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `api/tenant/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `api/tenant/profile/room/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTenantRoom(response.data);
        // console.log(tenantRoom);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // fetchRoomData();

    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!profilePhoto) {
      alert("Please select a profile photo.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("profilePhoto", profilePhoto);

      const response = await axios.post(
        `api/upload/tenant/profile/photo/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Profile photo uploaded successfully");
      console.log("Profile photo uploaded successfully:", response.data);

      // Update the user's profile photo in the frontend
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePhoto: response.data.filePath, // Assuming the response contains the file path
      }));
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      // Handle error appropriately (e.g., display error message to the user)
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "PersonalDetails":
        return (
          <div className="renderbox">
            <div className="second-heading">
              <h1>Your Personal Details</h1>
            </div>
            <div className="second-content">
              <p className="label">Name:</p>
              <p className="InputField">{userData?.name}</p>

              <p className="label">Email Id:</p>
              <p className="InputField">{userData?.email}</p>

              <p className="label">Contact Details:</p>
              <p className="InputField"> {userData?.contactNumber}</p>

              <p className="label">Aadhar Number:</p>
              <p className="InputField"> {userData?.aadharNumber}</p>
            </div>
          </div>
        );
      
      case "RoomDetails":
        return (
          <div className="renderbox">
            <div className="second-heading">
              <h1>Your Room Details</h1>
            </div>
            <div className="second-content">
              {tenantRoom ? (
                <>
                  <p className="label">Room Type:</p>
                  <p className="InputField">{tenantRoom.type}</p>

                  <p className="label">Landlord Email Id:</p>
                  <p className="InputField">{tenantRoom.email}</p>

                  <p className="label">Address of the Room:</p>
                  <p className="InputField"> {tenantRoom.address}</p>
                </>
              ) : (
                <p className="no-room-message">You don't have any room.</p>
              )}
            </div>
            {tenantRoom && (
              <div className="second-btn">
                <button className="profile-btn">Release Room</button>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="renderbox" style={{ overflow: "auto" }}>
            <div className="second-heading">
              <h1>Your Personal Details</h1>
            </div>
            <div className="second-content">
              <p className="label">Name:</p>
              <p className="InputField">{userData?.name}</p>

              <p className="label">Email Id:</p>
              <p className="InputField">{userData?.email}</p>

              <p className="label">Contact Details:</p>
              <p className="InputField"> {userData?.contactNumber}</p>

              <p className="label">Aadhar Number:</p>
              <p className="InputField"> {userData?.aadharNumber}</p>
            </div>
          </div>
        );
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(
        `api/tenant/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      window.localStorage.clear();
      console.log("User deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="firstsec">
          <ul>
            <li onClick={() => setSelectedOption("PersonalDetails")}>
              Personal Details
            </li>
            <li onClick={() => setSelectedOption("RoomDetails")}>
              Room Details
            </li>
            <button onClick={deleteAccount} className="profile-btn">
              Delete Account
            </button>
          </ul>
        </div>
        <div className="second">
          {renderContent()}
          <div className="second-btn"></div>
        </div>
        <div className="profile-section" style={{ border: "2px solid red" }}>
          {userData && userData.profilePhoto && (
            <img
              src={userData.profilePhoto}
              alt="Profile"
              className="profile-photo"
            />
          )}
          <form onSubmit={handleFormSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ backgroundColor: "#f20674" }}
            />
            <button type="submit" className="profile-btn">
              Upload Profile Photo
            </button>
          </form>
          <div className="ratings">
            <h3>Your Ratings</h3>
            <p>5 stars</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
