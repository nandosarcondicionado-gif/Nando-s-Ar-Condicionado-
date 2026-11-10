import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { brand: { 50:"#eff6ff",100:"#dbeafe",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#172554",950:"#0b1728" } },
    boxShadow: { soft: "0 8px 28px rgba(15,23,42,.07)" }
  }},
  plugins: []
};
export default config;
