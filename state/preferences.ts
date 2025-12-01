import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PreferencesState {
  repairJson: boolean;
}

interface PreferencesActions {
  setRepairJson: (repairJson: boolean) => void;
}

type PreferencesStore = PreferencesState & PreferencesActions;

export const usePreferences = create<PreferencesStore>()(
  persist(
    (set) => ({
      repairJson: true,
      setRepairJson: (repairJson) => set({ repairJson }),
    }),
    {
      name: "preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
