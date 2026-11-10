import type { Metadata, Viewport } from "next";
import "./globals.css";\nimport RegisterSW from "./register-sw";
export const metadata: Metadata = {
  title: "Nando’s ClimaPro",
  description: "Gestão profissional de climatização",
  applicationName: "Nando’s ClimaPro",
  manifest: "/manifest.webmanifest"
};
export const viewport: Viewport = { themeColor: "#0B1728", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><RegisterSW />{children}</body></html>;
}
