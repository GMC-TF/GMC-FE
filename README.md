# 간식행사

Next.js + Turbopack + TypeScript + Zustand + React Query 스택으로 구성된 프로젝트입니다.

## 시작하기

```bash
npm install
npm run dev
```

## 주요 기술 스택

- `TypeScript`
- `Next.js` (App Router)
- `Turbopack` (`next dev --turbo`)
- `Zustand` 상태 관리
- `@tanstack/react-query` 데이터 페칭
- `Vercel` 배포 대상

## 구조

- `app/` - Next.js App Router 페이지
- `store/` - Zustand 상태 관리
- `lib/` - React Query 클라이언트
- `app/api/snacks/route.ts` - 샘플 API 라우트
