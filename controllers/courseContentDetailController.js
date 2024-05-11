import asyncHandler from 'express-async-handler';
import fs from 'fs';
import Courses from '../models/courseContentDetailModel.js';
import CourseContentDetail from '../models/courseContentDetailModel.js';
import CourseContent from '../models/courseContentModel.js';


// @desc    Register a new Course
// route    POST /api/course/content/detail/create
// @access  Private - Auth Lvl 2
const createCourseContentDetail = asyncHandler(async (req, res) => {
    try {

        const {
            content_id,
            title,
            desc,
            attatchment_type
        } = req.body;

        const attatchment = req.file?.path;

        console.log(req.body);
        console.log(attatchment);
        
        try {
            if(!content_id){
                throw new Error('Course Content Id is required');                
            } else if(!title){
                throw new Error('Course Content Detail Title is required');                
            } else if(!desc){
                throw new Error('Course Content Description is required');                
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
// route    GET /api/course/pne/:id
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

        return res.status(200).json({ message: 'Course Retreived Successfully', payload: course });

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


// @desc    Publish Course
// route    PATCH /api/course/publish/:id
// @access  Private - Auth Lvl 2
const publishCourse = asyncHandler(async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({ message: 'Invalid Course Id!' });    
        }
    
        let course = await Courses.findByPk(id)
    
        if (!course) {
            return res.status(404).json({ message: 'Course Not Found!' })
        }
    
        course = await Courses.update(
            { 
                published: !course.published
            },
            {
              where: {
                course_id: id,
              },
            },
        );
        
        return res.status(200).json({ message: 'Course Published Successfully' });

    } catch (error) {
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
    createCourseContentDetail,
    getCourseList,
    getCourseById,
    updateCourse,
    publishCourse,
    deleteCourse
};
