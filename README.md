# Search Animation App

<p><b>Modern React + Tailwind CSS search animation app</b> — fast, interactive, and easy to extend.</p>

<p>
<img src="https://img.shields.io/badge/React-18.x-61dafb?logo=react" />
<img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss" />
<img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## Features

| Feature           | Description                                        |
| ----------------- | -------------------------------------------------- |
| 🔍 Search Bar     | Animated search input with instant feedback        |
| 📋 Filter Menu    | Filter results by category or criteria             |
| 📄 Result List    | Dynamic, animated result rendering                 |
| ✨ Shimmer Loader | Beautiful loading animation for async data         |
| 🗂️ Tabs           | Switch between different result views              |
| 📱 Responsive UI  | Mobile-first, built with Tailwind CSS              |
| ⚡ Fast & Modern  | Optimized for performance and developer experience |

---

## Demo Mode

No backend? No problem!

This app runs entirely on the frontend with mock data:

- Instantly loads sample data for testing and development
- No API keys or backend required
- No errors, just a smooth experience

---

## Tech Stack

| Layer     | Technology                  |
| --------- | --------------------------- |
| Framework | React 18, Create React App  |
| Styling   | Tailwind CSS 3              |
| State     | React useState/useEffect    |
| Data      | Local JSON (data.json)      |
| Testing   | Jest, React Testing Library |
| Tooling   | ESLint, Prettier            |

---

## Project Structure

search-animation/
├── package.json # Project dependencies & scripts
├── tailwind.config.js # Tailwind CSS configuration
├── public/ # Static assets (HTML, manifest, robots)
│ ├── index.html
│ ├── manifest.json
│ └── robots.txt
├── src/ # Source code
│ ├── App.js # Main app component
│ ├── App.css # App styles
│ ├── index.js # Entry point
│ ├── data.json # Mock data
│ ├── components/ # Reusable UI components
│ │ ├── FilterMenu.js # Filter menu
│ │ ├── ResultItem.js # Single result item
│ │ ├── ResultList.js # List of results
│ │ ├── SearchBar.js # Search input
│ │ ├── ShimmerLoader.js # Loading animation
│ │ └── Tabs.js # Tab navigation
│ ├── App.test.js # App tests
│ ├── index.css # Tailwind base styles
│ ├── reportWebVitals.js # Performance reporting
│ └── setupTests.js # Test setup

---

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| npm start     | Start development server |
| npm test      | Run tests                |
| npm run build | Build for production     |

---

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
