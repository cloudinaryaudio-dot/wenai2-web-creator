import React from "react";
import { ThemeProvider, useTheme, resolveTheme } from "../../lib/theme";
import { evaluateRules, canRenderSection, PUBLISH_STATE } from "../../lib/rules";
import { getSection, listSectionIds } from "./sectionRegistry";

/**
 * Rendering Engine
 * ----------------
 * Knows nothing about themes or section implementations.
 * Flow: section id -> registry -> component -> render, gated by the rule engine.
 */
function RendererShell({ invitation, sections, rules }) {
  const { theme, cssVars } = useTheme();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.colors.gradient}`}
      style={{
        ...cssVars,
        color: "var(--inv-color-text)",
        fontFamily: "var(--inv-font-body)",
        backgroundImage: theme.assets?.backgroundImage
          ? `url(${theme.assets.backgroundImage})`
          : undefined,
      }}
    >
      {sections.map((key) => {
        const entry = getSection(key);
        if (!entry) return null;
        if (!canRenderSection(key, rules)) return null;
        const Component = entry.component;
        const data = entry.select(invitation);
        return <Component key={key} data={data} invitation={invitation} rules={rules} />;
      })}
    </div>
  );
}

export default function InvitationRenderer({ invitation, themeId }) {
  if (!invitation) return null;

  const rules = evaluateRules(invitation);
  if (rules.publishState === PUBLISH_STATE.ARCHIVED) return null;

  const theme = resolveTheme(themeId ? { ...invitation, themeId } : invitation);

  // Order: theme layout override -> invitation config -> registry order.
  const sections =
    theme.layout?.sectionOrder?.length
      ? theme.layout.sectionOrder
      : invitation.config?.sections?.length
      ? invitation.config.sections
      : listSectionIds();

  return (
    <ThemeProvider theme={theme}>
      <RendererShell invitation={invitation} sections={sections} rules={rules} />
    </ThemeProvider>
  );
}
