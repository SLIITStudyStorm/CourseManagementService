import express from 'express';
import { createCourse, deleteCourse, getCourseById, getCourseList, updateCourse } from '../controllers/courseController.js';
import { authLvl1, authLvl2, authLvl3 } from '../middleware/authMiddleware.js';

const router = express.Router();

// Course Routes
router.post('/create', authLvl3, createCourse)
router.get('/all', getCourseList)
router.get('/:id', getCourseById)
router.put('/update', authLvl3, updateCourse)
router.delete('/delete/:id', authLvl3, deleteCourse)

export default router;
