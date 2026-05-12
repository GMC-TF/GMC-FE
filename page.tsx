"use client";

import { useState } from 'react';

// 쿠폰 객체 타입 정의
interface Coupon {
  code: string;
  expiryDate: string;
}

export default function AdminPage() {
  const [view, setView] = useState('home');
  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: '기말고사-1234', expiryDate: '2026-06-30' }
  ]);
  
  const [prefix, setPrefix] = useState('');
  const [amount, setAmount] = useState(1);
  const [expiryDate, setExpiryDate] = useState(''); // 유효 기간 상태

  const generateCoupons = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prefix || !expiryDate) {
      alert('쿠폰 이름과 유효 기간을 모두 입력해주세요.');
      return;
    }

    const newCoupons: Coupon[] = [];
    for (let i = 0; i < amount; i++) {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      newCoupons.push({
        code: `${prefix}-${randomId}`,
        expiryDate: expiryDate
      });
    }

    setCoupons([...coupons, ...newCoupons]);
    alert(`${amount}개의 쿠폰이 생성되었습니다!`);
    setPrefix('');
    setExpiryDate('');
    setView('coupon-status');
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen font-sans text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* 헤더 및 메뉴 이동 (이전과 동일) */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">금융수학과 간식행사 관리자 모드</h1>
          {view !== 'home' && (
            <button onClick={() => setView('coupon-menu')} className="text-sm font-bold underline text-gray-500 hover:text-black">
              ← 메뉴로 돌아가기
            </button>
          )}
        </div>

        {/* [1] 메인 메뉴 & [2] 쿠폰 세부 메뉴 (이전 코드 유지) */}
        {view === 'home' && (
           <div className="grid grid-cols-2 gap-6 mt-12">
            <button onClick={() => setView('coupon-menu')} className="bg-white border-2 border-black p-10 rounded-xl shadow-sm hover:bg-black hover:text-white transition-all text-2xl font-bold">
              🎟️ 쿠폰 관리
            </button>
            <button className="bg-white border-2 border-gray-200 p-10 rounded-xl shadow-sm text-2xl font-bold text-gray-400" disabled>👥 신청 현황 (준비중)</button>
          </div>
        )}

        {view === 'coupon-menu' && (
          <div className="flex flex-col gap-4">
            <button onClick={() => setView('coupon-reg')} className="bg-black text-white p-6 rounded-lg font-bold text-xl hover:bg-gray-800">➕ 쿠폰 생성하기</button>
            <button onClick={() => setView('coupon-status')} className="bg-white border-2 border-black p-6 rounded-lg font-bold text-xl hover:bg-gray-100 text-black">📊 쿠폰 현황 확인</button>
          </div>
        )}

        {/* [3] 기간 설정이 추가된 쿠폰 자동 등록 화면 */}
        {view === 'coupon-reg' && (
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">쿠폰 자동 생성 및 기간 설정</h2>
            <form onSubmit={generateCoupons} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">쿠폰 이름</label>
                  <input 
                    type="text" placeholder="예: 햄버거세트" 
                    className="w-full border-2 p-3 rounded-lg focus:border-black outline-none"
                    value={prefix} onChange={(e) => setPrefix(e.target.value)} required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">유효 기간 (종료일)</label>
                  <input 
                    type="date" 
                    className="w-full border-2 p-3 rounded-lg focus:border-black outline-none"
                    value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">생성 개수: {amount}개</label>
                <input 
                  type="range" min="1" max="100" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <button className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 shadow-lg transition">
                쿠폰 생성하기
              </button>
            </form>
          </div>
        )}

        {/* [4] 쿠폰 사용 현황 화면 (상세 테이블 버전) */}
    {view === 'coupon-status' && (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">쿠폰 사용 실시간 현황</h2>
        <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
            사용됨: {coupons.filter(c => c.isUsed).length}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
            미사용: {coupons.filter(c => !c.isUsed).length}
            </span>
        </div>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead>
            <tr className="border-b text-gray-400 text-sm">
                <th className="py-3 px-2 font-medium">쿠폰 번호</th>
                <th className="py-3 px-2 font-medium">유효 기간</th>
                <th className="py-3 px-2 font-medium">상태</th>
                <th className="py-3 px-2 font-medium">사용자(학번)</th>
            </tr>
            </thead>
            <tbody>
            {coupons.map((c, i) => (
                <tr key={i} className="border-b last:border-none hover:bg-gray-50 transition">
                <td className="py-4 px-2 font-mono font-bold text-sm">{c.code}</td>
                <td className="py-4 px-2 text-sm text-gray-500">{c.expiryDate}</td>
                <td className="py-4 px-2">
                    {c.isUsed ? (
                    <span className="bg-gray-200 text-gray-500 px-2 py-1 rounded text-xs">사용완료</span>
                    ) : (
                    <span className="bg-black text-white px-2 py-1 rounded text-xs font-bold">사용가능</span>
                    )}
                </td>
                <td className="py-4 px-2 text-sm">
                    {c.isUsed ? c.usedBy : <span className="text-gray-300">-</span>}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    
        {coupons.length === 0 && (
        <div className="text-center py-10 text-gray-400">
            등록된 쿠폰이 없습니다. 먼저 쿠폰을 생성해주세요.
        </div>
        )}
    </div>
    )}

      </div>
    </main>
  );
}