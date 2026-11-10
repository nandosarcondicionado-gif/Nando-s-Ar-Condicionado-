import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: {
      brand: { 950: "#0B1728", 900: "#10233B", 800: "#173653", 600: "#087E8B", 500: "#0E9AA7", 100: "#E5F5F5" }
    },
    boxShadow: { soft: "0 12px 35px rgba(15, 35, 59, .08)" }
  }},
  plugins: []
};
export default config;
