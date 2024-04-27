import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Courses = sequelize.define(
    'courses',
    {
        course_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        benefits: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        level: {
            type: DataTypes.STRING, 
            allowNull: false,
            defaultValue: 'Beginner'
        },
        start_date: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE, 
            allowNull: false,
            defaultValue: 0.0
        },
    }, {
        timestamps: true
    }
);

export default Courses;