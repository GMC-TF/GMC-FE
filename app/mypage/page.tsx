'use client';

import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AppHeader } from '../../components/layout/AppHeader';
import type { MyPageData } from '../../lib/types';
import useMypageStore from '../../store/useMypageStore';

function badgeText(status: 'unused' | 'used') {
  return status === 'unused' ? '미사용' : '사용완료';
}

export default function MyPage() {
  const msg = useMypageStore((s) => s.logoutMsg);
  const setMsg = useMypageStore((s) => s.setLogoutMsg);

  const q = useQuery({
    queryKey: ['mypage'],
    queryFn: async () => {
      const res = await fetch('/api/mypage');
      if (!res.ok) throw new Error('불러오기 실패');
      return res.json() as Promise<MyPageData>;
    }
  });

  const logout = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/mypage/logout', { method: 'POST' });
      if (!res.ok) throw new Error('로그아웃 실패');
      return res.json();
    },
    onSuccess: () => setMsg('로그아웃되었습니다.')
  });

  if (q.isPending) {
    return (
      <div className="mypage">
        <AppHeader />
        <main className="mypage-main">
          <p className="mypage-muted mypage-state">불러오는 중...</p>
        </main>
      </div>
    );
  }

  if (q.isError) {
    return (
      <div className="mypage">
        <AppHeader />
        <main className="mypage-main">
          <div className="mypage-state">
            <p className="mypage-error">{q.error.message}</p>
            <button type="button" className="mypage-retry" onClick={() => q.refetch()}>
              다시 시도
            </button>
          </div>
        </main>
      </div>
    );
  }

  const d = q.data;

  return (
    <div className="mypage">
      <AppHeader />

      <main className="mypage-main">
        {msg ? (
          <div className="mypage-banner">
            <span>{msg}</span>
            <button type="button" className="mypage-banner-dismiss" onClick={() => setMsg(null)}>
              닫기
            </button>
          </div>
        ) : null}

        <section className="mypage-profile">
          <div className="mypage-profile-top">
            <div className="mypage-avatar" />
            <div className="mypage-profile-text">
              <p className="mypage-name">{d.profile.name}</p>
              <p className="mypage-student-id">{d.profile.studentId}</p>
            </div>
          </div>
          <div className="mypage-profile-divider" />
          <div className="mypage-profile-bottom">
            <span>{d.profile.department}</span>
            <span>{d.profile.yearLabel}</span>
          </div>
        </section>

        <section className="mypage-section">
          <h2 className="mypage-section-title">티켓 현황</h2>
          <div className="mypage-summary-row">
            <div className="mypage-summary-card">
              <p className="mypage-summary-num">{d.ticketSummary.total}</p>
              <p className="mypage-summary-label">전체</p>
            </div>
            <div className="mypage-summary-card">
              <p className="mypage-summary-num">{d.ticketSummary.unused}</p>
              <p className="mypage-summary-label">미사용</p>
            </div>
          </div>
        </section>

        <section className="mypage-section">
          <h2 className="mypage-section-title">티켓 목록</h2>
          <ul className="mypage-ticket-list">
            {d.tickets.map((t) => (
              <li key={t.id} className="mypage-ticket-card">
                <div className="mypage-ticket-top">
                  <div>
                    <p className="mypage-ticket-event">{t.eventName}</p>
                    <p className="mypage-ticket-date">{t.date}</p>
                  </div>
                  <span
                    className={
                      t.status === 'unused' ? 'mypage-badge mypage-badge--navy' : 'mypage-badge mypage-badge--muted'
                    }
                  >
                    {badgeText(t.status)}
                  </span>
                </div>
                <div className="mypage-ticket-bottom">
                  <span className="mypage-ticket-code">{t.ticketCode}</span>
                  <Link href="#" className="mypage-ticket-detail">
                    상세
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <nav className="mypage-settings">
          <ul className="mypage-settings-list">
            {d.settings.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className="mypage-settings-link">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button type="button" className="mypage-logout" disabled={logout.isPending} onClick={() => logout.mutate()}>
          {logout.isPending ? '처리 중...' : '로그아웃'}
        </button>

        {logout.isError ? <p className="mypage-inline-error">{logout.error.message}</p> : null}
      </main>
    </div>
  );
}
