import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import postRouter from './routes/post.routes.js';
import followRouter from './routes/followers.routes.js';
import storyRouter from './routes/story.routes.js';


dotenv.config();

const app = express();
const PORT =  8000;

// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
}))


// Routes
app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)
app.use('/api/post' , postRouter)
app.use('/api/follow' , followRouter)
app.use('/api/story', storyRouter);





// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});