import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const course = sequelize.define(
    'courses',
    {
        course_id: {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING, 
            required: true
        },
        desc: {
            type: DataTypes.STRING, 
            required: true
        },
        benefits: {
            type: DataTypes.STRING, 
            required: false
        },
        level: {
            type: DataTypes.STRING, 
            required: true,
            defaultValue: 'Beginner'
        },
        start_date: {
            type: DataTypes.STRING, 
            required: true
        },
        duration: {
            type: DataTypes.DATE, 
            required: true
        },
        price: {
            type: DataTypes.DOUBLE, 
            required: true
        },
    }, {
        timestamps: true
    }
);

export default course;