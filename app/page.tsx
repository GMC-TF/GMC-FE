'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppHeader } from '../components/layout/AppHeader';
import type { TicketEventData } from '../lib/types';
import useTicketStore from '../store/useTicketStore';

export default function Home() {
  const qc = useQueryClient();
  const applied = useTicketStore((s) => s.applied);
  const setApplied = useTicketStore((s) => s.setApplied);

  const q = useQuery({
    queryKey: ['ticket'],
    queryFn: async () => {
      const res = await fetch('/api/ticket-event');
      if (!res.ok) throw new Error('불러오기 실패');
      return res.json() as Promise<TicketEventData>;
    }
  });

  const m = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/ticket-event', { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? '신청 실패');
      return json as { ok: boolean; issued: number };
    },
    onSuccess: () => {
      setApplied();
      qc.invalidateQueries({ queryKey: ['ticket'] });
    }
  });

  if (q.isPending) {
    return (
      <div className="issue-page">
        <AppHeader />
        <main className="issue-main">
          <p className="issue-muted issue-state">불러오는 중...</p>
        </main>
      </div>
    );
  }

  if (q.isError) {
    return (
      <div className="issue-page">
        <AppHeader />
        <main className="issue-main">
          <div className="issue-state">
            <p className="issue-error">{q.error.message}</p>
            <button type="button" className="issue-retry" onClick={() => q.refetch()}>
              다시 시도
            </button>
          </div>
        </main>
      </div>
    );
  }

  const d = q.data;
  const issued = d.ticket.issued;
  const cap = d.ticket.capacity;
  const pct = Math.min(100, Math.round((issued / cap) * 100));
  const soldOut = issued >= cap;
  const btnOff = applied || soldOut || m.isPending;

  let btnText = '티켓 신청하기';
  if (applied) btnText = '신청 완료';
  else if (soldOut) btnText = '티켓 소진';
  else if (m.isPending) btnText = '처리 중...';

  return (
    <div className="issue-page">
      <AppHeader title={d.headerTitle} />

      <main className="issue-main">
        <section className="issue-hero">
          <h1 className="issue-title">{d.eventTitle}</h1>
          <p className="issue-subdate">{d.eventDateLabel}</p>
        </section>

        <section className="issue-card">
          <dl className="issue-detail-grid">
            <div className="issue-detail-row">
              <dt>날짜</dt>
              <dd>{d.details.dateDisplay}</dd>
            </div>
            <div className="issue-detail-row">
              <dt>시간</dt>
              <dd>{d.details.timeRange}</dd>
            </div>
            <div className="issue-detail-row">
              <dt>장소</dt>
              <dd>{d.details.location}</dd>
            </div>
          </dl>
        </section>

        <section className="issue-card">
          <div className="issue-card-head">
            <h2 className="issue-card-title">티켓 현황</h2>
            <span className="issue-status-pill">{d.ticket.statusLabel}</span>
          </div>
          <p className="issue-count">
            <span className="issue-count-current">{issued}</span>
            <span className="issue-count-sep"> / </span>
            <span className="issue-count-total">{cap}</span>
          </p>
          <div className="issue-progress">
            <div className="issue-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </section>

        {m.isError ? <p className="issue-inline-error">{m.error.message}</p> : null}

        <button type="button" className="issue-primary-btn" disabled={btnOff} onClick={() => m.mutate()}>
          {btnText}
        </button>

        <section className="issue-card">
          <h2 className="issue-card-title">유의사항</h2>
          <ul className="issue-notice-list">
            {d.notices.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
