import { create } from "zustand";

type RulerStoreType = {
  leftMargin: number;
  setLeftMargin: (leftMargin: number) => void;
  rightMargin: number;
  setRightMargin: (rightMargin: number) => void;
};

export const useRulerStore = create<RulerStoreType>((set) => ({
  leftMargin: 56,
  rightMargin: 56,
  setLeftMargin: (leftMargin) => set({ leftMargin }),
  setRightMargin: (rightMargin) => set({ rightMargin }),
}));
