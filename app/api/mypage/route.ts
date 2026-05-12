import { NextResponse } from 'next/server';
import type { MyPageData } from '../../../lib/types';

const data: MyPageData = {
  profile: {
    name: '홍길동',
    studentId: '20241234',
    department: '컴퓨터공학과',
    yearLabel: '4학년'
  },
  ticketSummary: { total: 2, unused: 1 },
  tickets: [
    {
      id: 't1',
      eventName: 'COMMIT 간식행사',
      date: '2026.05.15',
      status: 'unused',
      ticketCode: 'T-2024-0542'
    },
    {
      id: 't2',
      eventName: '봄맞이 간식행사',
      date: '2026.04.02',
      status: 'used',
      ticketCode: 'T-2024-0198'
    }
  ],
  settings: [
    { id: 's1', label: '개인정보 수정', href: '#' },
    { id: 's2', label: '비밀번호 변경', href: '#' },
    { id: 's3', label: '공지사항', href: '#' }
  ]
};

export async function GET() {
  return NextResponse.json(data);
}
