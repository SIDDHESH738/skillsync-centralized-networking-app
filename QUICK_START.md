# 🚀 Quick Start Guide - SkillSync

## Step 1: Set Up MongoDB (Choose One Option)

### Option A: MongoDB Atlas (Recommended - 5 minutes)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create a new cluster (free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Option B: Install MongoDB Locally
- **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community && brew services start mongodb/brew/mongodb-community`
- **Linux**: Follow instructions in MONGODB_SETUP.md

## Step 2: Create Environment File

Create a file named `.env.local` in your project root with:

```env
# For MongoDB Atlas (replace with your connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillsync?retryWrites=true&w=majority

# For Local MongoDB
# MONGODB_URI=mongodb://localhost:27017/skillsync

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

## Step 3: Test Your Setup

```bash
# Test MongoDB connection
npm run test-db

# If successful, start the application
npm run dev
```

## Step 4: Use the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Sign up" to create a new account
3. Log in with your credentials
4. Start creating posts and managing your profile!

## 🎯 What You Can Do

- ✅ **Sign up/Login** with secure authentication
- ✅ **Create Posts** and share your thoughts
- ✅ **Manage Profile** with detailed information
- ✅ **Like Posts** from other users
- ✅ **View Feed** with all posts
- ✅ **Edit Your Data** (only your own posts/profile)
- ✅ **Logout** securely

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Test connection
npm run test-db
```

### Common Solutions:
- **"ECONNREFUSED"**: MongoDB not running → Use MongoDB Atlas or start local MongoDB
- **"Authentication failed"**: Wrong credentials → Check your connection string
- **"ENOTFOUND"**: Wrong hostname → Verify your Atlas cluster URL

### Need Help?
- Check `MONGODB_SETUP.md` for detailed setup instructions
- Check `USER_AUTHENTICATION_GUIDE.md` for security features
- Check `SETUP.md` for complete documentation

## 🎉 You're Ready!

Your SkillSync application is now running with:
- ✅ Complete user authentication
- ✅ User data isolation (users can only access their own data)
- ✅ Secure API endpoints
- ✅ Professional UI with animations
- ✅ MongoDB database integration

Happy coding! 🚀
