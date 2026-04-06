import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ArtFolio - 艺术作品集',
  description: '现代交互式艺术作品集',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
