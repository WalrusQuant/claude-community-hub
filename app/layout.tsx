import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./lib/context/AppContext";

export const metadata: Metadata = {
  title: "Community Hub - Connect and Collaborate",
  description: "A real-time messaging platform for communities. Create servers, join channels, and connect with people who share your interests.",
  keywords: ["community", "chat", "messaging", "discord", "servers", "channels"],
  authors: [{ name: "Community Hub" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
