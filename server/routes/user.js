import express from 'express'
import {addVehicle, deleteUser, getUser, googleAuth } from '../controllers/user.js'

const router = express.Router()


// GET requests
router.get('', getUser)

// DELETE requests
router.delete('', deleteUser)

// POST requests
// router.post('', createUser)
router.post('/auth', googleAuth)

// PUT requests
router.put('/add-vehicle', addVehicle)

export default router