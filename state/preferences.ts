import { create } from "zustand";

interface PreferencesState {
  repairJson: boolean;
}

interface PreferencesActions {
  setRepairJson: (repairJson: boolean) => void;
}

export const usePreferences = create<PreferencesState & PreferencesActions>(
  (set) => ({
    repairJson: false,
    setRepairJson: (repairJson) => set({ repairJson }),
  })
);
