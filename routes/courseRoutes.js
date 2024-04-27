import express from 'express';
// import {  } from '../controllers/courseController.js';
import courseContent from '../models/courseContentModel.js';
import courseContentDetail from '../models/courseContentDetailModel.js';
import course from '../models/courseModel.js';
import {  authLvl1 } from '../middleware/authMiddleware.js';

const router = express.Router();

// Course Routes
router.get('/get', authLvl1, ()=> {})

export default router;
