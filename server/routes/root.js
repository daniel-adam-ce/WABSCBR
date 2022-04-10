import express from 'express'
import { API } from '../controllers/root.js'
const router = express.Router()


// GET requests
router.get('', API);

export default router