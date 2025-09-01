# Social Media Backend Development - Class 1 Notes

## Project Overview
Building a social media website backend using Node.js, Express.js, and MongoDB with Mongoose ODM.

## Project Structure
```
social/
└── server/
    ├── config/
    │   └── db.js                 # Database connection configuration
    ├── controllers/
    │   └── auth.controllers.js   # Authentication logic
    ├── models/
    │   └── user.model.js         # User data schema
    ├── routes/
    │   └── auth.routes.js        # Authentication routes
    ├── index.js                  # Main server file
    ├── package.json              # Project dependencies
    └── package-lock.json         # Dependency lock file
```

## Key Technologies & Dependencies

### Core Dependencies
- **Express.js (v5.1.0)**: Web application framework
- **Mongoose (v8.18.0)**: MongoDB ODM (Object Document Mapper)
- **MongoDB (v6.19.0)**: Database driver
- **bcryptjs (v3.0.2)**: Password hashing library
- **dotenv (v17.2.1)**: Environment variable management
- **cors (v2.8.5)**: Cross-Origin Resource Sharing middleware
- **nodemon (v3.1.10)**: Development server auto-restart tool

## Database Configuration (`config/db.js`)

### Key Features
- **Asynchronous Connection**: Uses `async/await` pattern
- **Environment Variables**: Database URL stored in `.env` file
- **Error Handling**: Graceful error handling with process exit
- **Connection Feedback**: Console logging for connection status

### Code Breakdown
```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.dbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);  // Exit process if DB connection fails
  }
};
```

## User Model (`models/user.model.js`)

### Schema Structure
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  bio: { type: String, default: "" },
  followers: [],      // Array to store follower IDs
  following: [],      // Array to store following IDs
  posts: [],         // Array to store post IDs
  reels: [],         // Array to store reel IDs
  story: []          // Array to store story IDs
}, { timestamps: true });
```

### Key Features
- **Required Fields**: name, userName, email, password
- **Unique Constraints**: userName and email must be unique
- **Default Values**: Empty strings for profilePic and bio
- **Social Features**: Arrays for followers, following, posts, reels, stories
- **Timestamps**: Automatic createdAt and updatedAt fields

## Authentication Controller (`controllers/auth.controllers.js`)

### Sign Up Functionality

#### Validation Steps
1. **Field Validation**: Checks if all required fields are provided
2. **Email Uniqueness**: Verifies email isn't already registered
3. **Username Uniqueness**: Verifies username isn't already taken
4. **Password Length**: Ensures password is at least 6 characters

#### Security Implementation
```javascript
// Password hashing with bcrypt
const salt = await bcrypt.genSalt(10);
const hasedPassword = await bcrypt.hash(password, salt);
```

#### Error Handling
- **400 Bad Request**: For validation errors
- **500 Internal Server Error**: For unexpected server errors



```javascript

await User.create({ name, userName, email, password: hasedPassword });


```

## Routes Configuration (`routes/auth.routes.js`)

### Current Routes
- **POST /signup**: User registration endpoint

### Route Structure
```javascript
import express from 'express';
import { signUp } from '../controllers/auth.controllers.js';

const authRouter = express.Router();
authRouter.post('/signup', signUp);
```

## Main Server Configuration (`index.js`)

### Server Setup
- **Port**: Fixed at 8000
- **Middleware**: JSON parsing enabled
- **Routes**: Authentication routes mounted at `/api/auth`
- **Database**: Connection established on startup

### Key Configuration
```javascript
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// Server startup
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Development Setup

### Environment Variables Required
```env
dbUrl=mongodb://localhost:27017/social-media
# or MongoDB Atlas connection string
```

### Running the Project
```bash
npm run dev  # Starts server with nodemon for auto-restart
```

## API Endpoints

### POST /api/auth/signup
**Purpose**: Register a new user

**Request Body**:
```json
{
  "name": "John Doe",
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (201):
```json
{
  "message": "User created successfully"
}
```

**Error Responses**:
- 400: Validation errors (missing fields, duplicate email/username, short password)
- 500: Internal server error

## Security Best Practices Implemented

1. **Password Hashing**: Using bcrypt with salt rounds
2. **Input Validation**: Checking required fields
3. **Unique Constraints**: Preventing duplicate users
4. **Environment Variables**: Sensitive data not hardcoded

## Next Steps for Development

1. **Authentication**: Implement login functionality
2. **JWT Tokens**: Add token-based authentication
3. **User Profile**: CRUD operations for user profiles
4. **Posts System**: Create, read, update, delete posts
5. **Social Features**: Follow/unfollow functionality
6. **File Upload**: Profile picture and media handling
7. **Validation Middleware**: Centralized input validation

