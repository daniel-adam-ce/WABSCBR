import express from 'express'
import { createCAN, deleteCAN, getCAN, getTotalCAN, updateCAN } from '../controllers/can.js'

const router = express.Router()


// GET requests
router.get('', getCAN)
router.get('/count', getTotalCAN)
// DELETE requests
router.delete('', deleteCAN)

// POST requests
router.post('', createCAN)

// PUT requests
router.put('', updateCAN)

export default router