# 🛒 Modern E-Commerce App with AI Assistant

Welcome to the **Modern E-Commerce App**, a high-performance web application built with **Next.js 16**, **Tailwind CSS 4**, and **Supabase**. This project features a built-in AI Shopping Assistant powered by **Google Gemini** to help users find the perfect products.

## ✨ Key Features

- **🛍️ Product Discovery**: Browse a wide range of products with advanced filtering by category and price.
- **🤖 AI Shopping Assistant**: Integrated chatbot powered by Google Gemini AI to assist with product queries and recommendations.
- **🔐 Secure Authentication**: User sign-up and login powered by Supabase Auth.
- **🛒 Dynamic Cart**: Seamless shopping experience with a slide-out cart drawer.
- **🎨 Premium UI/UX**: Crafted with Tailwind CSS 4 and Radix UI components for a modern, responsive, and accessible interface.
- **🌓 Dark Mode Support**: Smooth theme switching for a comfortable viewing experience.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend/Auth**: [Supabase](https://supabase.com/)
- **AI Engine**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React Icons](https://lucide.dev/)
- **State Management**: React Hooks & Context API

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or later
- A Supabase account and project
- A Google Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd ecommerce-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```text
src/
├── app/          # Next.js App Router (pages and layouts)
├── components/   # Reusable UI components (Navbar, Cart, Chatbot)
├── utils/        # Utility functions (Supabase clients)
├── hooks/        # Custom React hooks
└── lib/          # Shared library code
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚖️ License

This project is licensed under the MIT License.
