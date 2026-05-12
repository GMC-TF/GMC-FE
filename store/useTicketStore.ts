import { create } from 'zustand';

// 같은 탭에서 신청 버튼 막기용 (새로고침하면 초기화됨)
const useTicketStore = create<{
  applied: boolean;
  setApplied: () => void;
}>((set) => ({
  applied: false,
  setApplied: () => set({ applied: true })
}));

export default useTicketStore;
