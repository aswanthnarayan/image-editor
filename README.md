# 🖼️ Image Editor

A modern, web-based image editor built with **Next.js**, **React 19**, **Tailwind CSS**, and **Fabric.js**. It features a clean, responsive UI and powerful image editing capabilities like cropping, drawing, filtering, and exporting. Hosted on the modern Next.js App Router stack with theme toggling and image upload support.

## 🚀 Live Demo

👉 [View Live Demo](https://pixia-editor.vercel.app/)

## ✨ Features

- 🎨 Canvas-based image editing using `fabric.js`
- 🖌️ Drawing, resizing, and transformations
- 🌗 Dark/light theme toggle using `next-themes`
- 📤 Upload and manage images with ImageKit
- 🧠 Smart UI interactions powered by Radix UI
- 🧩 Modular and accessible component architecture
- 💨 Beautiful UI animations with `tw-animate-css` & `motion`
- ⚙️ Real-time updates via `convex` backend support (optional)

## 🧰 Tech Stack

- **Frontend**: React 19 + Next.js 15 (App Router)
- **Canvas Engine**: [Fabric.js](http://fabricjs.com/)
- **Styling**: Tailwind CSS v4
- **UI**: Radix UI + Lucide Icons
- **Image Upload**: ImageKit SDK
- **State Management**: Local/Context API (extendable)
- **Notifications**: Sonner Toasts
- **Backend**: Convex (for cloud sync)


## 🧑‍💻 Getting Started

1. **Clone the project**
   ```bash
   git clone https://github.com/aswanthnarayan/image-editor.git
   cd image-editor

2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local


# ENV EXAMPLE 

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
CONVEX_DEPLOYMENT=your_convex_project_id

# ImageKit Configuration
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id/

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Optional: Theme Configuration
NEXT_PUBLIC_DEFAULT_THEME=system

# Optional: Analytics or Monitoring (if added)
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 📝 Environment Variables Guide

- `NEXT_PUBLIC_CONVEX_URL`: Your Convex project's deployment URL
- `CONVEX_DEPLOYMENT`: Unique identifier for your Convex project
- `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`: Public key for ImageKit SDK
- `IMAGEKIT_PRIVATE_KEY`: Private key for secure ImageKit operations
- `IMAGEKIT_URL_ENDPOINT`: Your ImageKit account's URL endpoint
- `NEXT_PUBLIC_APP_URL`: Base URL of your application
- `NODE_ENV`: Development environment setting

# To run the project

```bash
npm run dev
```

