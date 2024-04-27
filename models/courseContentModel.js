import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const courseContent = sequelize.define(
    'coursecontents',
    {
        content_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        course_id: {
            type: DataTypes.STRING,
            required: true
        },
        title: {
            type: DataTypes.STRING, 
            required: true
        },
        subtitle: {
            type: DataTypes.STRING, 
            required: false
        },
        desc: {
            type: DataTypes.STRING, 
            required: false
        },
    }, {
        timestamps: true
    }
);

export default courseContent;