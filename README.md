# 🚀 LakshayBlog – Full Stack AI-Powered Blog Application

LakshayBlog is a fully featured, modern, and scalable full-stack blog platform built using the MERN stack. It integrates Google Gemini (GenAI) for AI-powered blog generation, uses ImageKit.io for image hosting, and features an admin dashboard, comment moderation system, and a rich content editing adventure — all wrapped in a sleek TailwindCSS + Framer Motion UI.

---

## 🔧 Features

- ✅ Admin Authentication using JWT
- 🧠 AI-Powered Blog Generation via Google Gemini (Generative AI)
- 🖼️ Image Upload using ImageKit.io CDN
- 📝 Quill.js Rich Text Editor for Markdown/HTML
- 💬 Blog Commenting System with Approve/Delete
- 📈 Admin Dashboard: Total Blogs, Comments, Drafts
- 📂 Blog Management: Create, Read, Update, Delete, Publish, Unpublish
- 🎨 Modern, Animated UI using TailwindCSS and Framer Motion
- 🔄 Real-time blog generation via AI based on title prompts
- 🔗 Share options for social media and copy link functionality
- 🌐 Fully Responsive: Optimized for Mobile and Desktop ✅
- 🎯 Role-based routes for Admin-only actions only actions

## 🏗️ Tech Stack

**Frontend**: React.js, TailwindCSS, Framer Motion  
**Backend**: Node.js, Express.js  
**Database**: MongoDB Atlas  
**AI Integration**: Google Gemini API (@google/generative-ai)  
**Image Hosting**: ImageKit.io  
**Text Editor**: Quill.js  
**Authentication**: JWT (JSON Web Token)  
**Deployment**: Vercel (Client), Render (Server)

## 📁 Project Structure

```
lakshayblog/
│
├── client/               # React Frontend
│   ├── components/       # UI Components (Navbar, BlogList, etc.)
│   ├── pages/            # Pages (Dashboard, Comments, Blog, AddBlog)
│   ├── context/          # AppContext with Axios and Token
│   └── assets/           # Icons, Images, and Constants
│
├── server/               # Node.js Backend
│   ├── routes/           # Admin & Blog Routes
│   ├── controllers/      # Route Logic (CRUD, GenAI, Auth)
│   ├── middleware/       # JWT Auth, Upload Handling
│   └── configs/          # DB Connection and Keys
│
├── .env                  # Environment Variables
└── README.md             # You're reading this!
```

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/lakshayblog.git
cd lakshayblog
```

### 2. Install Dependencies

**Client**:

```bash
cd client
npm install
```

**Server**:

```bash
cd ../server
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `/server` folder and add:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### 4. Run App

**Backend**:

```bash
cd server
npm run dev
```

**Frontend**:

```bash
cd ../client
npm run dev
```

## 🧠 How AI Integration Works

* Admin enters a blog title
* Clicks “Generate with AI”
* Backend sends the title as prompt to Google Gemini API
* Gemini returns a description → rendered using Quill.js

## 🖼️ How Image Upload Works

* Image input uses ImageKit.io’s secure upload endpoint
* Files stored on ImageKit CDN
* Returned image URL is saved to MongoDB with the blog

## 🧪 Admin Panel Features

* Total blogs, drafts, comments
* Toggle blog publish/unpublish
* Delete blog and comments
* Comment approval system
* Blog sorting, table views, and moderation tools

## 📤 Deployment Guide

* **Frontend**: Deploy `/client` to Vercel
* **Backend**: Deploy `/server` to Render or Railway
* Ensure environment variables are set properly in production

## 🔗 References

* React Documentation
* TailwindCSS Documentation
* Node.js Documentation
* Express.js Documentation
* MongoDB Atlas Documentation
* Mongoose Documentation
* ImageKit.io Documentation
* Google Gemini API Documentation
* Framer Motion Docs
* Quill.js Rich Text Editor Docs

---
