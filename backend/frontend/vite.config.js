
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true
            }
        }
    },

    build: {
        rollupOptions: {
            input: {
                home: "index.html",
                register: "register.html",
                students: "students.html"
            }
        }
    }
});
