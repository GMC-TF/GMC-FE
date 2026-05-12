import { NextResponse } from 'next/server';

const sampleSnacks = ['과자', '쿠키', '사탕', '음료', '과일'];

export async function GET() {
  return NextResponse.json({ items: sampleSnacks });
}
