import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "슈가맨워크 핫딜",
  description: "슈가맨워크 공유오피스 공식 핫딜 프로모션",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
