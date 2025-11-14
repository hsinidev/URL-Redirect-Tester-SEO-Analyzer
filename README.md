
# 🚀 URL Redirect Checker & SEO Analyzer

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg"/>
  <img alt="Status" src="https://img.shields.io/badge/status-active-brightgreen.svg"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white"/>
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white"/>
</p>

<p align="center">
  A professional-grade diagnostic tool to trace the entire redirect path of any URL, uncovering crucial insights for SEO and web development.
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

![URL Redirect Tester Screenshot](https://i.imgur.com/example.png) 
*(Screenshot placeholder: A preview of the sleek, modern interface in action)*

## ✨ Key Features

-   **🔗 Full Redirect Chain Visualization**: Map every hop from the initial URL to the final destination in a clear, sequential view.
-   **🚦 Instant Status Code Analysis**: Immediately identify `301`, `302`, `404`, `500`, and other status codes with intuitive, color-coded feedback.
-   **🌀 Loop & Chain Detection**: Automatically flag dangerous redirect loops and inefficient chains that harm SEO and user experience.
-   **🚀 Server-Side Accuracy**: Simulates server-side requests to reveal the true redirect path as seen by search engines, bypassing browser limitations.
-   **📱 Sleek, Responsive Interface**: A modern, beautiful design that works flawlessly on any device, from desktops to smartphones.
-   **🌌 Immersive User Experience**: Features a stunning animated galaxy background for a comfortable and professional feel.
-   **📚 Integrated SEO Knowledge Base**: Includes a comprehensive, 3500-word expert guide on HTTP redirects, accessible right within the tool.

## 💡 Why This Tool is Essential

Redirects are a critical but often invisible part of technical SEO. This tool empowers you to:

-   **Debug Website Migrations**: Confidently ensure all old URLs are correctly `301`-redirecting to their new counterparts without chains or errors.
-   **Audit Backlink Health**: Discover if your valuable backlinks are pointing to pages that result in `404` errors or long redirect chains, and reclaim that lost link equity.
-   **Optimize Crawl Budget**: Eliminate unnecessary redirect hops that waste search engine crawl budget and slow down the indexing of your important pages.
-   **Enhance User Experience**: Find and fix slow-loading pages caused by multiple redirects, improving site speed and user satisfaction.

## 🛠️ Technology Stack

This project is built with a modern, performant, and scalable tech stack for a top-tier development experience.

| Technology | Description |
| :--- | :--- |
| **React** | A powerful JavaScript library for building dynamic, component-based user interfaces. |
| **TypeScript** | Provides robust static typing to enhance code quality and maintainability. |
| **Tailwind CSS** | A utility-first CSS framework for creating beautiful, responsive designs with speed. |
| **ES Modules** | Utilizes the native browser module system for a clean, modern project structure without complex bundlers. |

## 🚀 Getting Started

This project is a standalone web application and does not require a complex build process. Follow these simple steps to run it locally.

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/hsinidev/url-redirect-tester.git
    cd url-redirect-tester
    ```

2.  **Serve the Directory**
    Since this project uses native browser ES Modules, you just need a simple local HTTP server.

    **Option A: Using Node.js (with `http-server`)**
    If you have Node.js, you can use the `npx` command to run a temporary server.
    ```sh
    npx http-server .
    ```

    **Option B: Using Python**
    If you have Python 3 installed, you can use its built-in HTTP server.
    ```sh
    python3 -m http.server
    ```

3.  **Open in Browser**
    Navigate to `http://localhost:8080` (or the port specified by the server command). The application should now be running!

## 🔧 How It Works

The application provides a true-to-life redirect analysis within a frontend-only environment through intelligent simulation.

The core logic resides in `services/redirectService.ts`. This service **simulates the behavior of a server-side script** that would make HTTP requests and inspect the headers at each step (equivalent to `redirect: 'manual'` in Node.js `fetch`). It returns a structured JSON object containing the complete redirect chain, which the React frontend then renders in a clear, diagnostic format.

This simulation approach allows the application to demonstrate the full functionality of a professional redirect checker within a self-contained, easily deployable single-page application, without requiring a dedicated backend.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please ensure your code is well-formatted and your pull request is clearly described.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <strong>Powered by <a href="https://github.com/hsinidev" target="_blank">HSINI MOHAMED</a></strong>
</p>
