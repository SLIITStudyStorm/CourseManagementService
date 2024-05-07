import express from 'express';
import { createCourse, deleteCourse, getCourseById, getCourseList, updateCourse } from '../controllers/courseController.js';
import { authLvl1, authLvl2, authLvl3 } from '../middleware/authMiddleware.js';
import { uploadThumbnail } from '../middleware/multer.js';

const router = express.Router();

// Course Routes
router.post('/create', authLvl3, uploadThumbnail.single('thumbnail'), createCourse)
router.get('/all', getCourseList)
router.get('/one/:id', getCourseById)
router.put('/update', authLvl2, uploadThumbnail.single('thumbnail'), updateCourse)
router.delete('/delete/:id', authLvl3, deleteCourse)

export default router;
