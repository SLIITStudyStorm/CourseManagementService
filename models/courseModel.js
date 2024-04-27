import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const course = sequelize.define(
    'courses',
    {
        coursecode: {
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
        startdate: {
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

(async () => {
    await sequelize.sync({ alter: true });
})();

export default course;