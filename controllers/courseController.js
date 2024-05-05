import asyncHandler from 'express-async-handler';
import fs from 'fs';
import Courses from '../models/courseModel.js';


// @desc    Register a new Course
// route    POST /api/course/create
// @access  Private - Auth Lvl 3
const createCourse = asyncHandler(async (req, res) => {
    try {

        const {
            name,
            desc,
            subject,
            language,
            type,
            level,
            duration,
            skills,
            start_date,
            price,
            published
        } = req.body;

        const thumbnail = req.file?.path;
        
        try {
            if(!name){
                throw new Error('Course Name is required');                
            } else if(!desc){
                throw new Error('Course Description is required');                
            } else if(!subject){
                throw new Error('Course Subject is required');                
            } else if(!start_date){
                throw new Error('Course Start Date is required');                
            } else if(!duration){
                throw new Error('Course Duration is required');                
            }
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: error.message });
        }

        var course = await Courses.findOne({ where: { name } });

        if(course){
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Course Already Exists' });
            
        }
    
        course = await Courses.create({
            name,
            desc,
            subject,
            language,
            type,
            level,
            duration,
            skills,
            start_date,
            price,
            thumbnail,
            published
        });
    
        if(course){
            return res.status(201).json({ message: 'Course Created Successfully', payload: course });
            
        }else{
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Course Creation Unsuccessful' });
        }

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: error.message })
    }

});


// @desc    Retrieve All Courses
// route    GET /api/course/all
// @access  Public
const getCourseList = asyncHandler(async (req, res) => {
    
    try {

        const page = parseInt(req.query.page)-1;
        const rows = parseInt(req.query.rows);

        let courses = await Courses.findAndCountAll({offset: page, limit: rows,})

        if(courses.count <= 0){
            return res.status(404).json({ message: 'No Courses Available!' });
            
        }
        
        return res.status(200).json({ message: 'Courses Retreived Successfully', payload: courses });

    } catch (error) {

        return res.status(500).json({ message: error.message })

    }

});


// @desc    Retrieve Courses By Id
// route    GET /api/course/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
    
    try {

        const id = parseInt(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({ message: 'Invalid Course Id!' });
             
        }

        let course = await Courses.findByPk(id)

        if(!course){
            return res.status(404).json({ message: 'Course Not Found!' });
        }

        course.skills = course.skills.split(',');

        return res.status(200).json({ message: 'Courses Retreived Successfully', payload: course });

    } catch (error) {

        return res.status(500).json({ message: error.message })
        

    }

});


// @desc    Update Course Details
// route    PUT /api/course/update
// @access  Private - Auth Lvl 3
const updateCourse = asyncHandler(async (req, res) => {

    try {

        const {
            course_id,
            name,
            desc,
            subject,
            language,
            type,
            level,
            duration,
            skills,
            start_date,
            price,
            published
        } = req.body;

        const thumbnail = req.file?.path;
    
        let course = await Courses.findByPk(course_id)
    
        if (!course) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ message: 'Course Not Found!' })
        }

        let oldThumbnail = course.thumbnail;
    
        course = await Courses.update(
            { 
                name: name || course.name, 
                desc: desc || course.desc, 
                subject: subject || course.subject, 
                language: language || course.language, 
                type: type || course.type, 
                skills: skills || null, 
                level: level || course.level,
                start_date: start_date || course.start_date,
                duration: duration || course.duration,
                price: price || course.price,
                thumbnail: thumbnail || null,
                published: published || course.published
            },
            {
              where: {
                course_id: course_id,
              },
            },
        );
    
        if (oldThumbnail) {
            fs.unlinkSync(oldThumbnail);
        }
        return res.status(200).json({ message: 'Course Updated Successfully' });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: error.message })
    }
});


// @desc    Delete Course 
// route    DELETE /api/course/delete/:id
// @access  Private - Auth Lvl 3
const deleteCourse = asyncHandler(async (req, res) => {

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
    createCourse,
    getCourseList,
    getCourseById,
    updateCourse,
    deleteCourse
};
