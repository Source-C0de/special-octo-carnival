import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")

if (rootElement) {
    const root = createRoot(rootElement);

    // Start the 2.5s timer (The Gold Standard time we discussed)
    setTimeout(() => {
        root.render(<App />);

        // Smoothly remove the loading overlay
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.classList.add('fade-out'); // Add a CSS class for the exit
        }
    }, 2500);
}