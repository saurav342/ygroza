"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Theme } from "@/lib/theme";
import { THEME_STORAGE_KEY } from "@/lib/theme";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: THEME_STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        if (state?.theme === "system") {
          state.setTheme("light");
        }
      },
    }
  )
);
