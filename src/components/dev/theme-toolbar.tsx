"use client";

import * as React from "react";
import { Popover, Switch } from "radix-ui";
import {
  Check,
  ChevronRight,
  Copy,
  Grid2X2,
  Palette,
  Play,
  RotateCcw,
  Search,
  Settings2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { previewDefaults, themes } from "@/lib/themes";
import { updatePreview, usePreviewSettings } from "@/lib/preview-store";

export function ThemeToolbar() {
  const settings = usePreviewSettings();
  const [open, setOpen] = React.useState(false);
  const [panel, setPanel] = React.useState<"themes" | "preferences">("themes");
  const [query, setQuery] = React.useState("");
  const [copyStatus, setCopyStatus] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const active = themes.find(({ id }) => id === settings.theme) || themes[0];
  const filtered = themes.filter((theme) =>
    `${theme.name} ${theme.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  React.useEffect(() => {
    if (!settings.enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === ".") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [settings.enabled]);

  React.useEffect(() => {
    if (!copyStatus) return;
    const timer = window.setTimeout(() => setCopyStatus(""), 3000);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  async function copyPreview() {
    const url = new URL(window.location.href);
    url.searchParams.set("preview", "1");
    url.searchParams.set("theme", settings.theme);
    url.searchParams.set("logo", settings.logo);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopyStatus("Preview link copied");
    } catch {
      setCopyStatus("Couldn’t copy. Please try again.");
    }
  }

  if (!settings.enabled) return null;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div className="dev-dock" aria-label="Design preview tools">
        <Popover.Trigger asChild>
          <button
            className="dev-dock-brand"
            aria-label="Open theme toolbar"
            title="Theme studio · ⌘ / Ctrl + ."
            onClick={() => setPanel("themes")}
          >
            <BrandMark className="size-4" />
            <span
              className="dev-theme-dot"
              style={{ background: active.accent }}
            />
          </button>
        </Popover.Trigger>
        <span className="dev-dock-divider" />
        <button
          aria-label="Theme preferences"
          title="Preferences"
          onClick={() => {
            setPanel("preferences");
            setOpen(true);
          }}
        >
          <SlidersHorizontal />
        </button>
      </div>
      <Popover.Portal>
        <Popover.Content
          side="left"
          align="center"
          sideOffset={14}
          collisionPadding={12}
          className="dev-panel"
          aria-labelledby="theme-studio-title"
          onOpenAutoFocus={(event) => {
            if (panel === "themes") {
              event.preventDefault();
              inputRef.current?.focus();
            }
          }}
        >
          <div className="dev-panel-heading">
            <div>
              <span className="dev-kicker">
                <span />
                DESIGN PREVIEW
              </span>
              <h2 id="theme-studio-title">Collabute Studio</h2>
            </div>
            <Popover.Close
              className="dev-icon-button"
              aria-label="Close theme toolbar"
            >
              <X />
            </Popover.Close>
          </div>
          <div className="dev-panel-tabs" aria-label="Studio views">
            <button
              aria-pressed={panel === "themes"}
              onClick={() => setPanel("themes")}
            >
              <Palette />
              Themes<span>06</span>
            </button>
            <button
              aria-pressed={panel === "preferences"}
              onClick={() => setPanel("preferences")}
            >
              <Settings2 />
              Preferences
            </button>
          </div>
          {panel === "themes" ? (
            <div className="dev-panel-body">
              <p className="dev-intro">Same momentum. A different mood.</p>
              <div className="dev-search">
                <Search />
                <input
                  ref={inputRef}
                  aria-label="Search themes"
                  placeholder="Find your color…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <kbd>⌘ .</kbd>
              </div>
              <div className="dev-theme-grid" aria-label="Website themes">
                {filtered.map((theme) => (
                  <button
                    key={theme.id}
                    className="dev-theme-option"
                    aria-label={`${theme.name} theme`}
                    aria-pressed={settings.theme === theme.id}
                    onClick={() => updatePreview({ theme: theme.id })}
                    style={
                      {
                        "--swatch-bg": theme.background,
                        "--swatch-surface": theme.surface,
                        "--swatch-accent": theme.accent,
                        "--swatch-ink": theme.ink,
                      } as React.CSSProperties
                    }
                  >
                    <span className="dev-theme-thumbnail" aria-hidden="true">
                      <span className="dev-mini-nav">
                        <BrandMark />
                        <i />
                        <i />
                      </span>
                      <span className="dev-mini-headline">
                        Your context.<em>In motion.</em>
                      </span>
                      <span className="dev-mini-button" />
                      <span className="dev-mini-cards">
                        <i />
                        <i />
                        <i />
                      </span>
                    </span>
                    <span className="dev-theme-caption">
                      <span>{theme.name}</span>
                      {settings.theme === theme.id ? (
                        <Check />
                      ) : (
                        <span className="dev-option-dot" />
                      )}
                    </span>
                    <span className="dev-theme-description">
                      {theme.description}
                    </span>
                  </button>
                ))}
              </div>
              {!filtered.length && (
                <div className="dev-empty">
                  No palettes match “{query}”.
                  <button onClick={() => setQuery("")}>
                    Show all themes
                    <ChevronRight />
                  </button>
                </div>
              )}
              <p className="dev-preview-note">
                Changes stay in this browser. Your site stays yours.
              </p>
            </div>
          ) : (
            <div className="dev-panel-body">
              <p className="dev-intro">
                A little more control over the details.
              </p>
              <fieldset className="dev-logo-picker">
                <legend>Collabute logo</legend>
                <p>A familiar face or a fresh start.</p>
                <div>
                  {(["current", "original"] as const).map((logo) => (
                    <button
                      key={logo}
                      aria-label={`${logo === "current" ? "Current" : "Original"} logo`}
                      aria-pressed={settings.logo === logo}
                      onClick={() => updatePreview({ logo })}
                    >
                      <BrandMark variant={logo} className="size-7" />
                      <span>{logo === "current" ? "Current" : "Original"}</span>
                      {settings.logo === logo && <Check className="size-3" />}
                    </button>
                  ))}
                </div>
              </fieldset>
              <PreferenceToggle
                id="motion-preference"
                icon={<Play />}
                title="Subtle motion"
                description="Wordmark, diagrams, and page reveals."
                checked={settings.motion}
                onCheckedChange={(motion) => updatePreview({ motion })}
              />
              <p className="dev-system-note">
                Your system’s reduced-motion setting always wins.
              </p>
              <PreferenceToggle
                id="grid-preference"
                icon={<Grid2X2 />}
                title="Background grid"
                description="The fine lines behind the bigger picture."
                checked={settings.grid}
                onCheckedChange={(grid) => updatePreview({ grid })}
              />
              <button
                className="dev-reset"
                onClick={() => updatePreview(previewDefaults)}
              >
                <RotateCcw />
                <span>
                  Back to the original
                  <small>Forest · current logo · motion & grid on</small>
                </span>
                <ChevronRight />
              </button>
              <div className="dev-shortcut">
                <span>Open / close studio</span>
                <span>
                  <kbd>⌘ / Ctrl</kbd>
                  <kbd>.</kbd>
                </span>
              </div>
            </div>
          )}
          <div className="dev-panel-footer">
            <span>
              <i style={{ background: active.accent }} />
              {active.name}
              <span className="dev-saved"> · Saved locally</span>
            </span>
            <button onClick={copyPreview} aria-label="Copy theme preview link">
              <Copy />
              Share preview
            </button>
          </div>
          <p className="dev-copy-status" role="status">
            {copyStatus}
          </p>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function PreferenceToggle({
  id,
  icon,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="dev-preference">
      {icon}
      <label htmlFor={id}>
        {title}
        <span>{description}</span>
      </label>
      <Switch.Root
        id={id}
        className="dev-switch"
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <Switch.Thumb className="dev-switch-thumb" />
      </Switch.Root>
    </div>
  );
}
