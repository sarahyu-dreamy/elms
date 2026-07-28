import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '내 드리미 앱',
  description: '드리미학교 앱 스타터로 만든 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
