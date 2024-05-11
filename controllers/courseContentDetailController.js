import asyncHandler from 'express-async-handler';
import fs from 'fs';
import Courses from '../models/courseContentDetailModel.js';
import CourseContentDetail from '../models/courseContentDetailModel.js';
import CourseContent from '../models/courseContentModel.js';
import { where } from 'sequelize';


// @desc    Add a new course content detail
// route    POST /api/course/content/detail/create
// @access  Private - Auth Lvl 2
const createCourseContentDetail = asyncHandler(async (req, res) => {
    try {

        const {
            content_id,
            title,
            desc,
            attatchment_type,
            link
        } = req.body;

        let attatchment;
        if(req.file){
            attatchment = req.file.path;
        }
        else {
            attatchment = link
        }
        
        try {
            if(!content_id){
                throw new Error('Course Content Id is required');                
            } else if(!title){
                throw new Error('Course Content Detail Title is required');                
            } else if(!desc){
                throw new Error('Course Content Description is required');                
            } else if(!attatchment){
                throw new Error('Course Content Attatchment is required');                
            } else if(!attatchment_type){
                throw new Error('Course Content Attatchment Type is required');                
            }
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: error.message });
        }

        var courseContent = await CourseContent.findByPk(content_id);

        if(!courseContent){
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Course Content Category Not Found' });
            
        }
    
        let courseContentDetail = await CourseContentDetail.create({
            content_id,
            title,
            desc,
            attatchment_type,
            attatchment
        });
    
        if(courseContentDetail){
            return res.status(201).json({ message: 'Course Content Added Successfully', payload: courseContentDetail });
            
        }else{
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Failed to Add Course Content' });
        }

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: error.message })
    }

});


// @desc    Retrieve All Course Content Details
// route    GET /api/course/content/detail/all
// @access  Private - Auth Lvl 1
const getCourseContentDetailList = asyncHandler(async (req, res) => {
    
    try {

        const page = parseInt(req.query.page)-1;
        const rows = parseInt(req.query.rows);
        const content_id = parseInt(req.query.content_id);

        let courseContent = await CourseContent.findByPk(content_id);
        if(!courseContent){
            return res.status(404).json({ message: 'No Course Content Category not found!' });
        }


        let courseContentDetails = await CourseContentDetail.findAndCountAll({where:{content_id} ,offset: page, limit: rows})

        if(courseContentDetails.count <= 0){
            return res.status(404).json({ message: 'No Course Content Available!' });
            
        }
        
        return res.status(200).json({ message: 'Courses Contents Retreived Successfully', payload: courseContentDetails });

    } catch (error) {

        return res.status(500).json({ message: error.message })

    }

});


// @desc    Delete Course 
// route    DELETE /api/course/content/detail/delete/:id
// @access  Private - Auth Lvl 2
const deleteCourseContentDetail = asyncHandler(async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        let course = await Courses.findByPk(id);
        if(!course){
            return res.status(404).json({ message: "Course Not Found!" })
        }

        let thumbnail = course.thumbnail

        course = await Courses.destroy({
            where: {
                course_id: id,
            },
        });

        
        if(thumbnail){
            fs.unlinkSync(thumbnail);
        }
        return res.status(200).json({ message: 'Course Deleted Successfully' });
        

    } catch (error) {

        return res.status(500).json({ message: error.message })
        

    }
});




export { 
    createCourseContentDetail,
    getCourseContentDetailList,
    deleteCourseContentDetail
};
