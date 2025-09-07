import './globals.css';

export const metadata = {
  title: 'POS App',
  description: 'Simple POS for food business'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
