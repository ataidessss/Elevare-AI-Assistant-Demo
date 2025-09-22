import type { Metadata } from "next";
import "./globals.css";
import {Roboto } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Elevare: Focus on Your ONE Thing Daily",
  description: "Elevare is a minimalist productivity app that helps you achieve extraordinary results by focusing on your ONE most important task each day. Cut through the noise and make real progress.",
  openGraph: {
    title: "Elevare: Focus on Your ONE Thing Daily",
    description: "Elevare is a minimalist productivity app that helps you achieve extraordinary results by focusing on your ONE most important task each day. Cut through the noise and make real progress.",
    type: "website",
    url: "https://elevareapp.vercel.app", 
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevare: Focus on Your ONE Thing Daily",
    description: "Elevare is a minimalist productivity app that helps you achieve extraordinary results by focusing on your ONE most important task each day. Cut through the noise and make real progress.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NLQ7D3LQ');
            `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/pfp.jpg" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        
      </head>
      <body
        className={`${roboto.className} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
