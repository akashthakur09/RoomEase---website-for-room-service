import React, { useEffect, useState } from "react";
import Navbar from "./llnavbar";
import '../css/homePage.css';
import { NavLink } from "react-router-dom";
import SharingRoomPhoto from "../data/sharing.avif";
import axios from "axios";

const UpdateRoom = () => {
  const [userRoom, setUserRoom] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/room/all", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const responseData = Array.isArray(response.data) ? response.data : [response.data];
        setUserRoom(responseData);
        // setUserRoom(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const deleteRoom = async (roomId) => {
    console.log('Deleting room with id:', roomId);
    if (!roomId) {
      console.error('Invalid room ID');
      return;
    }
    try {
      const response = await axios.delete(`api/room/user/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Room deleted successfully');
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="updatepagecss">
        <button className="updatepagebtn">
          <NavLink to="/addRoom" style={{ textDecoration: "none", color: "white" }}>
            Add Room
          </NavLink>
        </button>

        <h2>User Rooms</h2>

        {userRoom.length === 0 ? (
          <p>Your rooms count is zero first add room.</p>
        ) : (
          <div className='room-list'>
            {userRoom.map((room) => (
              (room.landlord === userId && room.type && room.address && room.status) && (
                <div className='room-card' key={room.id}>
                  <div className='forImage'>
                    <img src={SharingRoomPhoto} alt="Profile" className="Room-photo" />
                  </div>
                  <div className='roomDetails'>
                    <p>Type: {room.type}</p>
                    <p>Address: {room.address}</p>
                    <p>City: {room.city}</p>
                    <p>Status: {room.status}</p>
                    <button className="updateAndDelete_btn" onClick={() => deleteRoom(room._id)}> Delete</button>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateRoom;
