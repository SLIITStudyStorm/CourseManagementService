import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const courseContentDetail = sequelize.define(
    'coursecontentdetails',
    {
        detail_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content_id: {
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
        attatchment: {
            type: DataTypes.STRING, 
            required: false
        },
        attatchment_type: {
            type: DataTypes.STRING, 
            required: false
        },
    }, {
        timestamps: true
    }
);

(async () => {
    await sequelize.sync({ force: true });
})();

export default courseContentDetail;