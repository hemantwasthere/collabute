"use client";

import * as React from "react";
import {
  previewDefaults,
  themes,
  themeStorageKey,
  type ThemeId,
  type LogoVariant,
} from "@/lib/themes";

const eventName = "collabute:preview-change";

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  return () => window.removeEventListener(eventName, callback);
}

function getSnapshot() {
  const root = document.documentElement;
  return `${root.dataset.preview === "true"}|${root.dataset.theme || "forest"}|${root.dataset.motion !== "off"}|${root.dataset.grid !== "off"}|${root.dataset.logo || "current"}`;
}

export function usePreviewSettings() {
  const snapshot = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "false|forest|true|true|current",
  );
  const [enabled, theme, motion, grid, logo] = snapshot.split("|");
  return {
    enabled: enabled === "true",
    theme: theme as ThemeId,
    logo: logo as LogoVariant,
    motion: motion === "true",
    grid: grid === "true",
  };
}

export function updatePreview(patch: Partial<typeof previewDefaults>) {
  const root = document.documentElement;
  const next = {
    theme: (root.dataset.theme || "forest") as ThemeId,
    logo: (root.dataset.logo || "current") as LogoVariant,
    motion: root.dataset.motion !== "off",
    grid: root.dataset.grid !== "off",
    ...patch,
  };
  const theme = themes.find(({ id }) => id === next.theme) || themes[0];
  next.theme = theme.id;
  root.dataset.theme = next.theme;
  root.dataset.logo = next.logo;
  root.dataset.motion = next.motion ? "on" : "off";
  root.dataset.grid = next.grid ? "on" : "off";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme.background);
  try {
    localStorage.setItem(themeStorageKey, JSON.stringify(next));
  } catch {}
  const url = new URL(window.location.href);
  if (url.searchParams.has("theme") || url.searchParams.has("logo")) {
    url.searchParams.set("theme", next.theme);
    url.searchParams.set("logo", next.logo);
    window.history.replaceState(null, "", url);
  }
  window.dispatchEvent(new Event(eventName));
}
