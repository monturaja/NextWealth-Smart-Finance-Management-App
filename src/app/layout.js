import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

import Script from "next/script";

export const metadata = {
  title: "Next Wealth | Smart Finance Management App",
  description: "Next-Generation Financial Dashboard",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-loader"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-[#0F2854] transition-colors duration-300">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}