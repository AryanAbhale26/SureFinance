## Glimpse

[sure-finance.vercel.app](https://sure-finance.vercel.app)

https://github.com/user-attachments/assets/aa8ad348-3b5a-474e-a54a-ba73934c4f8e

# StatementIQ
**StatementIQ** is an AI-powered PDF parser built to extract key financial insights from credit card statements.  
Using **Google Gemini API**, the system intelligently identifies and extracts structured information such as card provider, billing cycle, payment due date, and total balance from uploaded statement PDFs.

---

## 📘 Table of Contents
- Project Description  
- Features  
- Tech Stack  
- Installation  
- Usage  
- Problem Solved  
- License  

---

## 🧩 Project Description
StatementIQ simplifies financial data extraction by transforming unstructured credit card statements into clean, structured insights.  
Built with the **MERN stack** and **Gemini AI**, the platform demonstrates how artificial intelligence can automate financial document understanding with accuracy and speed.  
This project was developed as part of the *Credit Card Statement Parser Assignment* to showcase real-world AI-powered text extraction and workflow automation.

---

## 🚀 Features
- Upload and process PDF statements seamlessly  
- Automatically extract 5 essential financial data points  
- AI-powered data recognition using **Google Gemini API**  
- **Secure file storage with ImageKit CDN**  
- Clean, modern, and responsive **React + Tailwind CSS** frontend  
- Fast and reliable backend with **Node.js**, **Express**, and **MongoDB**  
- Secure environment configuration with **dotenv**  

---

## 🧠 Tech Stack
**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB  
**AI Engine:** Google Gemini 2.5 Flash  
**File Storage:** ImageKit CDN for secure PDF uploads  
**Deployment:** Vercel (Frontend) & Render (Backend)  

---

## ⚙️ Installation

1. **Clone the repository**
```bash
   git clone https://github.com/AryanAbhale26/StatementIQ.git
```

2. **Navigate into the project directory**
```bash
   cd StatementIQ
```

3. **Install backend dependencies**
```bash
   cd server
   npm install
```

4. **Create a `.env` file inside `/server`**
```bash
   GEMINI_API_KEY=your_gemini_api_key
   MONGO_URI=your_mongo_uri
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   PORT=5000
```

5. **Install frontend dependencies**
```bash
   cd ../client
   npm install
```

---

## ▶️ Usage

1. **Start the backend**
```bash
   cd server
   npm run dev
```

2. **Start the frontend**
```bash
   cd ../client
   npm run dev
```

3. **Open the application**
   Visit [http://localhost:5173](http://localhost:5173)

4. **Upload a credit card statement**
   - Choose a PDF file  
   - Files are securely uploaded to ImageKit CDN
   - Wait for Gemini AI to process the document  
   - View extracted details instantly  

---

## 💡 Problem Solved

**Assignment Objective:**  
> Build a PDF parser that extracts 5 key data points from credit card statements across 5 major issuers.

**StatementIQ Solution:**  
- Parses statements from multiple credit card providers  
- Extracts 5 essential data fields (provider, card variant, card last 4 digits, billing cycle, payment due date, total balance)  
- Powered by **Google Gemini** for advanced document intelligence  
- **Secure file handling with ImageKit CDN** for encrypted storage and fast retrieval
- Built with **MERN stack** architecture for smooth performance and reliability  

---

## 🔒 Security Features

- **ImageKit CDN Integration** - All PDF files are securely stored and served through ImageKit's global CDN
- **Environment Variables** - Sensitive API keys and credentials protected via `.env` configuration
- **MongoDB Atlas** - Cloud-hosted database with built-in security features
- **HTTPS Deployment** - Both frontend and backend deployed with SSL/TLS encryption

---

