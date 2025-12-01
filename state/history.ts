import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HistoryItem {
  id: string;
  rawJson: string;
}

interface HistoryState {
  history: HistoryItem[];
}

export const useHistory = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addHistoryItem: (rawJson: string) => {
        const history = get().history;
        const newHistory = [
          ...history,
          { id: crypto.randomUUID().toString(), rawJson },
        ];
        set({ history: newHistory });
      },
    }),
    {
      name: "history",
    }
  )
);
