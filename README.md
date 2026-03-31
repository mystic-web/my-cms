# 🚀 My CMS - Full Stack Content Management System

Built with **Next.js 14** + **MongoDB** + **NextAuth** + **TailwindCSS**

---

## Features

- ✅ **Pages Manager** — Create pages with Visual Editor + HTML/CSS/JS Code Editor
- ✅ **Blog Posts** — Write and publish blog articles
- ✅ **Media Library** — Upload and manage images/files
- ✅ **Authentication** — Secure admin login with NextAuth
- ✅ **Live Preview** — See your page as you build it
- ✅ **SEO Settings** — Meta title & description per page
- ✅ **Draft/Publish** — Control what goes live

---

## 🛠 Setup Guide

### 1. Prerequisites

- Node.js 18+ installed
- MongoDB running locally OR MongoDB Atlas account

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Edit `.env.local` with your values:

```env
# MongoDB (local)
MONGODB_URI=mongodb://localhost:27017/my-cms

# MongoDB Atlas (cloud) - use this format:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/my-cms

# Generate a random secret:
# Run: openssl rand -base64 32
NEXTAUTH_SECRET=your-super-secret-key-change-this

NEXTAUTH_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. First Time Setup

1. Go to `http://localhost:3000/setup`
2. Create your admin account
3. Login at `http://localhost:3000/login`
4. Start creating content!

---

## 📁 Project Structure

```
my-cms/
├── app/
│   ├── admin/          # Admin dashboard (protected)
│   │   ├── page.tsx    # Dashboard
│   │   ├── pages/      # Page manager
│   │   ├── blogs/      # Blog manager
│   │   └── media/      # Media library
│   ├── api/            # Backend API routes
│   │   ├── auth/       # NextAuth
│   │   ├── pages/      # Pages CRUD
│   │   ├── blogs/      # Blogs CRUD
│   │   ├── media/      # File upload
│   │   └── setup/      # Initial setup
│   ├── pages/[slug]/   # Public page renderer
│   ├── blog/[slug]/    # Public blog renderer
│   └── login/          # Login page
├── components/
│   └── admin/
│       ├── PageEditor.tsx   # Page editor with code view
│       ├── BlogEditor.tsx   # Blog post editor
│       └── CodeEditor.tsx   # CodeMirror component
├── lib/
│   ├── mongodb.ts      # DB connection
│   └── auth.ts         # NextAuth config
├── models/
│   ├── User.ts
│   ├── Page.ts
│   ├── Blog.ts
│   └── Media.ts
└── public/uploads/     # Uploaded files stored here
```

---

## 🌐 Public URLs

| URL | Description |
|-----|-------------|
| `/pages/[slug]` | Renders a published page |
| `/blog/[slug]` | Renders a published blog post |

---

## 🖥 Admin Panel

| URL | Description |
|-----|-------------|
| `/admin` | Dashboard |
| `/admin/pages` | Manage pages |
| `/admin/pages/new` | Create new page |
| `/admin/blogs` | Manage blog posts |
| `/admin/blogs/new` | Write new post |
| `/admin/media` | Upload/manage media |

---

## 📄 Page Editor - Code View

The page editor has 4 tabs:
1. **Visual Editor** — WYSIWYG content editing
2. **HTML** — Write raw HTML with syntax highlighting
3. **CSS** — Style your page
4. **JavaScript** — Add interactivity

All code is combined and rendered when the page is published.

---

## 🚀 Production Deployment

```bash
npm run build
npm start
```

For hosting, use **Vercel** (free tier):
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

---

## 🔑 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/pages` | List all pages |
| POST | `/api/pages` | Create page |
| GET | `/api/pages/:id` | Get single page |
| PUT | `/api/pages/:id` | Update page |
| DELETE | `/api/pages/:id` | Delete page |
| GET | `/api/blogs` | List all blogs |
| POST | `/api/blogs` | Create blog |
| GET | `/api/blogs/:id` | Get single blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |
| GET | `/api/media` | List all media |
| POST | `/api/media` | Upload file |
| DELETE | `/api/media/:id` | Delete file |
