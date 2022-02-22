import express from 'express'
import {addVehicleOrDevice, deleteUser, getUser, getVehiclesAndDevices, googleAuth, createUser, loginUser } from '../controllers/user.js'

const router = express.Router()


// GET requests
router.get('', getUser)
router.get('/vehicles-devices', getVehiclesAndDevices)

// DELETE requests
router.delete('', deleteUser)

// POST requests

router.post('/auth/login', loginUser)
router.post('/auth/register', createUser)
router.post('/auth/google', googleAuth)

// PUT requests
router.put('/add', addVehicleOrDevice)

export default router