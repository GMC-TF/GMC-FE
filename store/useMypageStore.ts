import { create } from 'zustand';

const useMypageStore = create<{
  logoutMsg: string | null;
  setLogoutMsg: (msg: string | null) => void;
}>((set) => ({
  logoutMsg: null,
  setLogoutMsg: (msg) => set({ logoutMsg: msg })
}));

export default useMypageStore;
