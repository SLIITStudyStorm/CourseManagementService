import express from 'express';
import { createCourseContentDetail } from '../controllers/courseContentDetailController.js';
import { authLvl1, authLvl2, authLvl3 } from '../middleware/authMiddleware.js';
import { uploadCourseContent } from '../middleware/multer.js';

const router = express.Router();

// Course Routes
router.post('/create', authLvl2, uploadCourseContent.single('attatchment'), createCourseContentDetail)
// router.get('/all', getCourseList)
// router.get('/instructor/all', authLvl2, getCourseListByInstructor)
// router.get('/one/:id', getCourseById)
// router.put('/update', authLvl2, uploadThumbnail.single('thumbnail'), updateCourse)
// router.patch('/approve/:id/:approve', authLvl3, approveCourse)
// router.delete('/delete/:id', authLvl2, deleteCourse)

export default router;
