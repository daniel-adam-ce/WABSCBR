import express from 'express'
import { createUser, deleteUser, getUser, updateUser } from '../controllers/user.js'

const router = express.Router()


// GET requests
router.get('', getUser)

// DELETE requests
router.delete('', deleteUser)

// POST requests
router.post('', createUser)

// PUT requests
router.put('', updateUser)

export default router