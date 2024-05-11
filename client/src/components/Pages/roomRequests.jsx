import React, { useState, useEffect } from 'react';
import Navbar from './llnavbar';
import '../css/RoomSearch.css';
import axios from 'axios';

const RoomRequests = () => {
  const [request, setRequest] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRoomRequests = async () => {
      try {
        const response = await axios.get(`api/request/all/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching room requests:', error);
      }
    };

    fetchRoomRequests();
  }, [userId]);

  const updateStatusOfRoom = async (requestId, status) => {
    try {
      const response = await axios.put(`api/request/${requestId}`, { status }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Room status updated successfully');
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='requestPage'>
        <div className='room-list_requestPage'>
          {request.length === 0 ? (
            <p>No requests available for the current landlord.</p>
          ) : (
            request.map((req) => (
              (req.landlord === userId) && (
                <div className='room-card_requestPage' key={req._id} style={{width:"600px"}}>
                  <div className='roomDetails'>
                    <p className='lable'>Tenant Id:</p>
                    <p className='inputFields'>{req.tenant}</p>

                    <p className='lable'>Landlord Id: </p>
                    <p className='inputFields'>{req.landlord}</p>

                    <p className='lable'>Room Id: </p>
                    <p className='inputFields'>{req.room}</p>

                    <p className='lable'>Status: </p>
                    <p className='inputFields'>{req.status}</p>
                  </div>
                  <div className='updateButtons_box'>
                    <button className='updateAndDelete_btn' onClick={() => updateStatusOfRoom(req._id, 'accepted')}>Accept</button>
                    <button className='updateAndDelete_btn' onClick={() => updateStatusOfRoom(req._id, 'rejected')}>Reject</button>
                  </div>
                </div>
              )
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomRequests;
