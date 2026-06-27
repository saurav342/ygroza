export const THEME_STORAGE_KEY = "groza-theme";

export type Theme = "light" | "dark" | "system";

export function resolveIsDark(theme: Theme): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function readStoredTheme(): Theme {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return "light";
    const parsed = JSON.parse(raw) as { state?: { theme?: Theme } };
    return parsed.state?.theme ?? "light";
  } catch {
    return "light";
  }
}

export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t="light";var r=localStorage.getItem(k);if(r){var p=JSON.parse(r);t=(p.state&&p.state.theme)||"light"}var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;
