import express from 'express'
import {addVehicleOrDevice, deleteUser, getUser, getVehiclesAndDevices, googleAuth, createUser, loginUser, verifyToken } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()


// GET requests
router.get('', auth, getUser)
router.get('/vehicles-devices', auth, getVehiclesAndDevices)

// DELETE requests
router.delete('', auth, deleteUser)

// POST requests

router.post('/auth', auth, verifyToken)
router.post('/auth/login', loginUser)
router.post('/auth/register', createUser)
router.post('/auth/google', googleAuth)

// PUT requests
router.put('/add', auth, addVehicleOrDevice)

export default router