import { NextResponse } from 'next/server';
import type { TicketEventData } from '../../../lib/types';

const MAX = 200;
let issued = 142;

export async function GET() {
  const body: TicketEventData = {
    headerTitle: '간식행사',
    eventTitle: 'COMMIT 간식행사',
    eventDateLabel: '2026년 5월 15일 (목)',
    details: {
      dateDisplay: '2026.05.15',
      timeRange: '14:00 - 17:00',
      location: '학생회관 1층'
    },
    ticket: {
      issued,
      capacity: MAX,
      statusLabel: issued >= MAX ? '종료' : '진행중'
    },
    notices: ['1인 1매 제한', '선착순 발급', '당일 현장 사용']
  };
  return NextResponse.json(body);
}

export async function POST() {
  if (issued >= MAX) {
    return NextResponse.json({ error: '티켓이 모두 소진되었습니다.' }, { status: 409 });
  }
  issued += 1;
  return NextResponse.json({ ok: true, issued });
}
