export const themes = [
  {
    id: "forest",
    name: "Forest",
    description: "The original. Calm & organic.",
    background: "#f8f9f4",
    surface: "#eef1e8",
    accent: "#204e36",
    ink: "#232d25",
  },
  {
    id: "cobalt",
    name: "Cobalt",
    description: "Clear skies. Sharp thinking.",
    background: "#f7f9fd",
    surface: "#eaf0fa",
    accent: "#2854ad",
    ink: "#202d44",
  },
  {
    id: "clay",
    name: "Clay",
    description: "A warmer kind of workspace.",
    background: "#fcf8f4",
    surface: "#f5eae2",
    accent: "#9a452d",
    ink: "#3c2b25",
  },
  {
    id: "iris",
    name: "Iris",
    description: "Quietly unconventional.",
    background: "#faf8fd",
    surface: "#efe9f6",
    accent: "#71508f",
    ink: "#34283e",
  },
  {
    id: "graphite",
    name: "Graphite",
    description: "Just the essentials.",
    background: "#f8f8f7",
    surface: "#ececeb",
    accent: "#343b43",
    ink: "#24282c",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "For the after-hours ideas.",
    background: "#141a22",
    surface: "#202a36",
    accent: "#afc8ed",
    ink: "#e8edf5",
  },
] as const;

export type ThemeId = (typeof themes)[number]["id"];
export type LogoVariant = "current" | "original";
export const themeStorageKey = "collabute-preview";
export const previewDefaults = {
  theme: "forest" as ThemeId,
  logo: "current" as LogoVariant,
  motion: true,
  grid: true,
};

export function themeBootstrap(enabled: boolean) {
  return `(()=>{try{const r=document.documentElement,q=new URLSearchParams(location.search),enabled=${JSON.stringify(enabled)}||q.get('preview')==='1';if(!enabled)return;r.dataset.preview='true';let p={};try{p=JSON.parse(localStorage.getItem('${themeStorageKey}')||'{}')||{}}catch{}const t=q.get('theme')||p.theme;const themes=${JSON.stringify(themes.map(({ id }) => id))};r.dataset.theme=themes.includes(t)?t:'forest';r.dataset.logo=(q.get('logo')||p.logo)==='original'?'original':'current';r.dataset.motion=p.motion===false?'off':'on';r.dataset.grid=p.grid===false?'off':'on';document.querySelector('meta[name="theme-color"]')?.setAttribute('content',${JSON.stringify(Object.fromEntries(themes.map(({ id, background }) => [id, background])))}[r.dataset.theme])}catch{}})();`;
}
