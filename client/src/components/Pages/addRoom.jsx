
import React, { useEffect, useState } from "react";
import Navbar from "./llnavbar";
import "../css/llp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddRoom() {
  const [userData, setUserData] = useState({});
  const [newRooms, setNewRooms] = useState({
    type: "",
    email: "",
    photos: [], // Initialize photos as an empty array
    address: "",
    city: "",
    landlord: "",
    status: "",
  });
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("userEmail");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`api/landlord/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const addNewRoom = async (e) => {
    e.preventDefault();
    try {
      // Check if the required fields are populated
      if (!newRooms.type || !newRooms.address || !newRooms.city) {
        // Display an error message or handle the case where required fields are missing
        alert("Please fill out all required fields.");
        return;
      }
      
      // Proceed with adding the room if all required fields are provided
      const formData = new FormData();
      formData.append("type", newRooms.type);
      formData.append("email", email);
      formData.append("address", newRooms.address);
      formData.append("city", newRooms.city);
      formData.append("landlord", newRooms.landlord);
      formData.append("status", newRooms.status);
      newRooms.photos.forEach((photo) => {
        formData.append("photos", photo);
      });
  
      const response = await axios.post(
        `api/room/user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      alert("Room Added Successfully :)");
      navigate("/updateRoom");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (e) => {
    if (e.target.name === "photos") {
      // For file input, use files array
      setNewRooms({ ...newRooms, [e.target.name]: Array.from(e.target.files) }); // Convert FileList to array
    } else {
      setNewRooms({ ...newRooms, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="addRoomPage">
        <div className="formBox">
          <form onSubmit={addNewRoom}>
            <h1 className="addRoomHeading">Enter Room Details</h1>
            <label>Room Type</label>
            <input
              type="text"
              name="type"
              onChange={onChange}
              value={newRooms.type}
            />
            <label>Email:</label>
            <input
              type="text"
              name="email"
              onChange={onChange}
              value={newRooms.email || userData.email}
            />
            <label>Images of the Room:</label>
            <input
              type="file"
              name="photos"
              onChange={onChange}
              multiple // Allow multiple file selection
            />
            <label>Address:</label>
            <input
              type="text"
              name="address"
              onChange={onChange}
              value={newRooms.address}
            />
            <label>City:</label>
            <input
              type="text"
              name="city"
              onChange={onChange}
              value={newRooms.city}
            />
            <label>Id of the Landlord:</label>
            <input
              type="text"
              name="landlord"
              onChange={onChange}
              value={userId}
              readOnly
            />
            <label>Status:</label>
            <input
              type="text"
              name="status"
              onChange={onChange}
              value={newRooms.status}
            />
            <button className="addRoom_btn">Add Room</button>
          </form>
        </div>
      </div>
    </div>
  );
}
