import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";

import CourseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

//Routes
app.use('/api/course', CourseRoutes);

app.get('/', (req, res) => res.send('Course Management Service is running'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Service is up and running on port: http://localhost:${PORT}`);
})

export default app;