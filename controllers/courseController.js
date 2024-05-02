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

        const thumbnail = req.file.path;
        
        if(!name){
            res.status(400).json({ message: 'Course Name is required' });
            return
        } else if(!desc){
            res.status(400).json({ message: 'Course Description is required' });
            return
        } else if(!subject){
            res.status(400).json({ message: 'Course Subject is required' });
            return
        } else if(!start_date){
            res.status(400).json({ message: 'Course Start Date is required' });
            return
        } else if(!duration){
            res.status(400).json({ message: 'Course Duration is required' });
            return
        }

        var course = await Courses.findOne({ where: { name } });

        if(course){
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ message: 'Course Already Exists' });
            return
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
            res.status(201).json({ message: 'Course Created Successfully', data: course });
            return
        }else{
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ message: 'Course Creation Unsuccessful' });
            return
        }

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: error.message })
        return
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
            res.status(404).json({ message: 'No Courses Available!' });
            return
        }
        
        res.status(200).json({ message: 'Courses Retreived Successfully', data: courses });

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

});


// @desc    Retrieve Courses By Id
// route    GET /api/course/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
    
    try {

        const id = parseInt(req.params.id);

        let course = await Courses.findByPk(id)

        if(!course){
            res.status(404).json({ message: 'Course Not Found!' });
            return
        }
        
        res.status(200).json({ message: 'Courses Retreived Successfully', data: courses });
        return

    } catch (error) {

        res.status(500).json({ message: error.message })
        return

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
            thumbnail,
            published
        } = req.body;
    
        let course = await Courses.findByPk(course_id)
    
        if (!course) {
            res.status(404).json({ message: 'Course Not Found!' })
            return;
        }
    
        course = await Courses.update(
            { 
                name: name || course.name, 
                desc: desc || course.desc, 
                subject: subject || course.subject, 
                language: language || course.language, 
                type: type || course.type, 
                skills: skills || course.skills, 
                level: level || course.level,
                start_date: start_date || course.start_date,
                duration: duration || course.duration,
                price: price || course.price,
                thumbnail: thumbnail || course.thumbnail,
                published: published || course.published
            },
            {
              where: {
                course_id: course_id,
              },
            },
        );
    
        res.status(200).json({ message: 'Course Updated Successfully' });
        return

    } catch (error) {

        res.status(500).json({ message: error.message })
        return

    }
});


// @desc    Delete Course 
// route    DELETE /api/course/delete/:id
// @access  Private - Auth Lvl 3
const deleteCourse = asyncHandler(async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        let course = await Courses.destroy({
            where: {
                course_id: id,
            },
        });

        if(!course){
            res.status(404).json({ message: "Course Not Found!" })
            return
        }
        
        res.status(200).json({ message: 'Course Deleted Successfully' });
        return

    } catch (error) {

        res.status(500).json({ message: error.message })
        return

    }
});




export { 
    createCourse,
    getCourseList,
    getCourseById,
    updateCourse,
    deleteCourse
};
