import express from 'express'
import { createCAN, deleteCAN, getCAN, getTotalCAN, updateCAN } from '../controllers/can.js'
import auth from '../middleware/auth.js'
const router = express.Router()


// GET requests
router.get('', auth, getCAN)
router.get('/count', auth, getTotalCAN)

// DELETE requests (unused)
router.delete('', auth, deleteCAN)

// POST requests
router.post('', auth, createCAN)

// PUT requests (unused)
router.put('', auth, updateCAN)

export default router