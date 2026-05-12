import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '간식행사 · 마이페이지',
  description: '내 티켓과 계정 정보'
};

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
