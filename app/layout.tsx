import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "내가 내린 커피 세계 최고 커피",
  description: "커피 레시피와 브루잉 튜토리얼을 제공하는 모임 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <div className="min-h-screen max-w-md mx-auto bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
