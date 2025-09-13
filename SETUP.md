# SkillSync Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **npm** or **pnpm**

## Environment Setup

1. **Create a `.env.local` file** in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/skillsync
# For production, use: mongodb+srv://username:password@cluster.mongodb.net/skillsync

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start MongoDB** (if using local installation):
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

4. **Run the development server**:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `POST /api/posts/create` - Create new post
- `GET /api/posts/[id]` - Get post by ID
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post
- `POST /api/posts/[id]` - Like/unlike post

### Profiles
- `GET /api/profile/[id]` - Get profile by user ID
- `PUT /api/profile/[id]` - Update profile
- `DELETE /api/profile/[id]` - Delete profile

## Features Implemented

✅ **User Authentication**
- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt

✅ **User Management**
- User CRUD operations
- Profile management
- User data validation

✅ **Post System**
- Create, read, update, delete posts
- Like/unlike functionality
- Post feed with pagination
- Real-time post creation

✅ **Profile System**
- Comprehensive profile management
- Experience, education, skills tracking
- Privacy settings
- Profile customization

✅ **Database Integration**
- MongoDB with Mongoose
- Data validation and schemas
- Relationship management

## Usage

1. **Sign up** for a new account or **log in** with existing credentials
2. **Create posts** to share your thoughts and achievements
3. **Manage your profile** with detailed information about your experience and skills
4. **Browse the feed** to see posts from other users
5. **Like and interact** with posts from the community

## Database Schema

### User Model
- Basic info (name, email, password)
- Profile data (bio, location, website)
- Skills and experience arrays
- Social connections (followers, following)

### Post Model
- Content and media attachments
- Author reference
- Engagement metrics (likes, comments, shares)
- Visibility settings

### Profile Model
- Detailed professional information
- Work experience and education
- Skills with proficiency levels
- Projects and certifications
- Privacy settings

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected API routes
- User authorization checks

## Next Steps

To extend the application, consider adding:
- Real-time messaging
- Advanced search functionality
- File upload for media
- Email notifications
- Social features (connections, recommendations)
- Analytics and insights
