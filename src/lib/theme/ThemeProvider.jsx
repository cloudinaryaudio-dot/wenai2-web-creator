import React, { createContext, useContext, useMemo } from "react";
import { BASE_THEME } from "./themeContract";
import { resolveTheme, toCssVariables, buildStyleTokens } from "./themeEngine";

/**
 * ThemeProvider
 * -------------
 * Supplies the resolved theme + design tokens to every section.
 * Sections never import colors, fonts or spacing directly.
 */
const ThemeContext = createContext(null);

export function ThemeProvider({ invitation, theme: themeProp, children }) {
  const value = useMemo(() => {
    const theme = themeProp || resolveTheme(invitation);
    return {
      theme,
      tokens: buildStyleTokens(theme),
      cssVars: toCssVariables(theme),
    };
  }, [invitation, themeProp]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx) return ctx;
  // Safe fallback so sections can be used standalone (backward compatible).
  const theme = BASE_THEME;
  return { theme, tokens: buildStyleTokens(theme), cssVars: toCssVariables(theme) };
}

export function useTokens() {
  return useTheme().tokens;
}
