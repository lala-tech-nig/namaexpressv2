import "./globals.css";

export const metadata = {
  title: "NAMA EXPRESS POS",
  description: "Nama Express POS System",
  manifest: "/manifest.json",
  themeColor: "#FFD700",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-512x512.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Link to manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff6600" />

        {/* Fallback icons */}
        <link rel="icon" href="/icons/icon-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
      </head>
      <body className="bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
