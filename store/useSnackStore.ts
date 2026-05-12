import { create } from 'zustand';

interface SnackState {
  snacks: string[];
  addSnack: (name: string) => void;
}

const useSnackStore = create<SnackState>((set) => ({
  snacks: ['치킨', '피자', '떡볶이'],
  addSnack: (name) =>
    set((state) => ({
      snacks: [...state.snacks, name]
    }))
}));

export default useSnackStore;
