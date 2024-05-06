const express = require('express');
const Tenant = require('../models/tenantModel'); 
const validateToken = require('../middleware/validateTokenHandler');
const Room = require('../models/roomModel');

const router = express.Router();


// Get tenant profile by ID
router.get('/profile/:id',validateToken, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// get tenant room details
router.get('/profile/room/:id',validateToken, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    
    const room= await Room.findById(tenant.rentedRoom);
    if(!room){
      return res.status(404).json({ message: 'Tenants rentedRoom not found' });
    }


    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update tenant profile by ID
router.put('/profile/:id',validateToken, async (req, res) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json(updatedTenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete tenant profile by ID
router.delete('/profile/:id',validateToken, async (req, res) => {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!deletedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
