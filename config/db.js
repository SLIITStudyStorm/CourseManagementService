import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Database Connected`);
    } catch (error) {
        console.error(`DB Error: ${error.message}`);
        process.exit(1);
    }
}


(async () => {
    await sequelize.sync({ force: true });
})();

export { connectDB, sequelize };
