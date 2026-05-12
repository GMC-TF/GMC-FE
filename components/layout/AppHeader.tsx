'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = '간식행사' }: AppHeaderProps) {
  const pathname = usePathname();
  const onIssue = pathname === '/';
  const onMypage = pathname.startsWith('/mypage');

  return (
    <header className="app-header-wrap">
      <div className="app-header-title">{title}</div>
      <nav className="app-header-nav" aria-label="페이지 이동">
        <Link href="/" className={onIssue ? 'app-header-link app-header-link--on' : 'app-header-link'}>
          티켓 발급
        </Link>
        <Link href="/mypage" className={onMypage ? 'app-header-link app-header-link--on' : 'app-header-link'}>
          마이페이지
        </Link>
      </nav>
    </header>
  );
}
