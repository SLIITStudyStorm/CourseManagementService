import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const courseContent = sequelize.define(
    'coursecontents',
    {
        contentid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        coursecode: {
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
            required: true
        },
    }, {
        timestamps: true
    }
);

(async () => {
    await sequelize.sync({ alter: true });
})();

export default courseContent;