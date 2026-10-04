import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders the landing page without runtime errors or overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await expect(page).toHaveTitle("Collabute — Your context. In motion.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your team’s context.",
  );
  const dimensions = await page.evaluate(() => ({
    viewport: innerWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  const invalidAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href) => href && !document.getElementById(href.slice(1))),
    );
  expect(invalidAnchors).toEqual([]);
  expect(errors).toEqual([]);
});

test("product tabs expose decisions and support approving a sample ticket", async ({
  page,
}) => {
  await page.getByRole("tab", { name: "Actions, already in motion" }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Finish onboarding empty states",
  );
  await page.getByRole("button", { name: "Approve sample ticket" }).click();
  await expect(
    page.getByRole("button", { name: /Approved in preview/ }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Decisions that stick" }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Why are we launching Friday?",
  );
  await page.getByRole("tab", { name: "Actions, already in motion" }).click();
  await page.getByRole("button", { name: /Approved in preview/ }).click();
  await expect(
    page.getByRole("button", { name: "Approve sample ticket" }),
  ).toBeVisible();
});

test("product tabs support keyboard navigation", async ({ page }) => {
  await page.getByRole("tab", { name: "Your team's context" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Actions, already in motion" }),
  ).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Actions, already in motion" }),
  ).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText(
    "Why are we launching Friday?",
  );
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Your team's context" }),
  ).toBeFocused();
});

test("guided demo advances, closes with Escape, and resets", async ({
  page,
}) => {
  const trigger = page.getByRole("button", { name: "See it in action" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Monday · Product sync");
  await dialog.getByRole("button", { name: "Next step" }).click();
  await expect(dialog).toContainText("Tuesday · #design");
  await dialog.getByRole("button", { name: "Next step" }).click();
  await expect(
    dialog.getByRole("link", { name: "Try Collabute" }),
  ).toHaveAttribute("href", "https://collabute.ai/signup");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByRole("dialog")).toContainText("Monday · Product sync");
});

test("FAQs expand and collapse", async ({ page }) => {
  const question = page.getByRole("button", {
    name: "Will a bot join our meetings?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText("No bot needs to join your calls.", { exact: false }),
  ).toBeVisible();
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
});

test("navigation reaches pricing and mobile menu closes", async ({
  page,
  isMobile,
}) => {
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Pricing" })
      .click();
    await expect(
      page.getByRole("button", { name: "Open menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Pricing" })
      .click();
  }
  await expect(page).toHaveURL(/#pricing$/);
  await expect(
    page.getByRole("link", { name: "Try Pro for free" }),
  ).toHaveAttribute("href", "https://collabute.ai/signup");
});

test("meets automated WCAG accessibility checks", async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});

test("demo remains usable in a short landscape viewport", async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.getByRole("button", { name: "See it in action" }).click();
  const dialog = page.getByRole("dialog");
  const bounds = await dialog.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.y).toBeGreaterThanOrEqual(0);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(375);
  await dialog.getByRole("button", { name: "Next step" }).click();
  await expect(dialog).toContainText("Tuesday · #design");
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await expect(dialog).not.toBeVisible();
});

test("interactive states remain accessible", async ({ page }) => {
  await page.getByRole("tab", { name: "Actions, already in motion" }).click();
  const preview = await new AxeBuilder({ page })
    .include(".product-showcase")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    preview.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({
        target,
        failureSummary,
      })),
    })),
  ).toEqual([]);
  await page.getByRole("button", { name: "See it in action" }).click();
  const dialog = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    dialog.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({
        target,
        failureSummary,
      })),
    })),
  ).toEqual([]);
});

test("logo links return to the top and footer wordmark has no arrow", async ({
  page,
}) => {
  await page.goto("/?preview=1&theme=clay#pricing");
  await page.getByRole("link", { name: "Collabute — back to top" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page).toHaveURL(/\/?preview=1&theme=clay#top$/);
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: "Collabute home", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator(".footer-wordmark")).toHaveText("collabute");
});

test("theme toolbar switches palettes, persists, and filters", async ({
  page,
}) => {
  await expect(
    page.getByRole("button", { name: "Open theme toolbar" }),
  ).toHaveCount(0);
  await page.goto("/?preview=1");
  await page.getByRole("button", { name: "Open theme toolbar" }).click();
  await page.getByRole("button", { name: "Cobalt theme", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "cobalt");
  await page.getByRole("button", { name: "Close theme toolbar" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "cobalt");
  await page.getByRole("button", { name: "Open theme toolbar" }).click();
  await page.getByRole("textbox", { name: "Search themes" }).fill("midnight");
  await expect(
    page.getByRole("button", { name: "Midnight theme", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Forest theme", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Midnight theme", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "midnight");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Collabute Studio" }),
  ).toHaveCount(0);
  await page.goto("/?preview=1&theme=iris");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "iris");
});

test("preview preferences pause motion, toggle grids, and reset", async ({
  page,
}) => {
  await page.goto("/?preview=1&theme=midnight");
  await page
    .getByRole("button", { name: "Theme preferences", exact: true })
    .click();
  await page.getByRole("switch", { name: /Subtle motion/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect(page.locator(".waveform > span").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.getByRole("switch", { name: /Background grid/ }).click();
  await expect(page.locator(".hero-grid")).toHaveCSS("opacity", "0");
  await page.getByRole("button", { name: /Back to the original/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "forest");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
  await expect(page.locator("html")).toHaveAttribute("data-grid", "on");
  await page.keyboard.press("Escape");
  await expect(page.locator(".dev-dock button")).toHaveCount(2);
  const dock = await page.locator(".dev-dock").boundingBox();
  expect(dock!.height).toBeGreaterThan(dock!.width);
  expect(
    Math.abs(dock!.y + dock!.height / 2 - page.viewportSize()!.height / 2),
  ).toBeLessThan(2);
  await page.getByRole("button", { name: "Open theme toolbar" }).click();
  await expect(
    page.getByRole("dialog", { name: "Collabute Studio" }),
  ).toBeVisible();
});

for (const theme of [
  "forest",
  "cobalt",
  "clay",
  "iris",
  "graphite",
  "midnight",
]) {
  test(`${theme} theme has accessible contrast and a usable toolbar`, async ({
    page,
  }) => {
    await page.goto(`/?preview=1&theme=${theme}`);
    await page.getByRole("button", { name: "Open theme toolbar" }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map(({ id, nodes }) => ({
        id,
        nodes: nodes.map(({ target, failureSummary }) => ({
          target,
          failureSummary,
        })),
      })),
    ).toEqual([]);
    const bounds = await page
      .getByRole("dialog", { name: "Collabute Studio" })
      .boundingBox();
    const viewport = page.viewportSize()!;
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
    await page.keyboard.press("Escape");
    const site = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      site.violations.map(({ id, nodes }) => ({
        id,
        nodes: nodes.map(({ target, failureSummary }) => ({
          target,
          failureSummary,
        })),
      })),
    ).toEqual([]);
  });
}

test("decorative loops run in view and respect the motion override", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/?preview=1");
  await page.locator(".workflow-visual").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".workflow-section")).toHaveClass(/is-in-view/);
  await expect(page.locator(".waveform > span").first()).toHaveCSS(
    "animation-play-state",
    "running",
  );
  await expect(page.locator(".waveform > span").first()).toHaveCSS(
    "animation-name",
    "waveform-breathe",
  );
  await page.locator(".footer-wordmark").scrollIntoViewIfNeeded();
  await expect(page.locator(".footer-wordmark > span").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".waveform > span").first()).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page
    .getByRole("button", { name: "Theme preferences", exact: true })
    .click();
  await page.getByRole("switch", { name: /Subtle motion/ }).click();
  await expect(page.locator(".footer-wordmark > span").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.getByRole("switch", { name: /Subtle motion/ }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".footer-wordmark > span").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});

test("preview links copy the current theme and keyboard shortcut opens studio", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?preview=1&theme=cobalt");
  await page.keyboard.press("Control+.");
  await expect(
    page.getByRole("dialog", { name: "Collabute Studio" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Copy theme preview link" }).click();
  await expect(page.getByRole("status")).toHaveText("Preview link copied");
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(new URL(copied).searchParams.get("theme")).toBe("cobalt");
  expect(new URL(copied).searchParams.get("preview")).toBe("1");
  await page.keyboard.press("Control+.");
  await expect(
    page.getByRole("dialog", { name: "Collabute Studio" }),
  ).toHaveCount(0);
});

test("logo variants persist, share, and reset", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?preview=1");
  await page
    .getByRole("button", { name: "Theme preferences", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Original logo", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-logo", "original");
  const original = page.locator(".site-header .brand-mark-original");
  await expect(original).toBeVisible();
  await expect(page.locator(".site-header .brand-mark-current")).toBeHidden();
  await expect
    .poll(() =>
      original.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Copy theme preview link" }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(new URL(copied).searchParams.get("logo")).toBe("original");
  await page.reload();
  await expect(original).toBeVisible();
  await page
    .getByRole("button", { name: "Theme preferences", exact: true })
    .click();
  await page.getByRole("button", { name: /Back to the original/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-logo", "current");
  await page.goto(copied);
  await expect(original).toBeVisible();
});

test("footer reacts to the pointer and link arrows lift without moving button arrows", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Pointer hover is desktop only");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const word = page.locator(".footer-wordmark");
  await word.scrollIntoViewIfNeeded();
  const bounds = await word.boundingBox();
  const letter = word.locator("span").first();
  expect((await letter.boundingBox())!.height).toBeGreaterThan(
    bounds!.height * 1.4,
  );
  await word.hover();
  await expect(letter).not.toHaveCSS("transform", "none");
  await expect(word).toHaveAttribute("style", /--pointer-x/);
  const link = page.getByRole("link", { name: "About us" });
  await link.hover();
  await expect(link.locator("svg")).toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 2, -2)",
  );
  const button = page.locator('.closing-cta a[data-slot="button"]').first();
  await button.hover();
  await expect(button.locator("svg")).toHaveCSS("transform", "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await word.hover();
  await expect(letter).toHaveCSS("transform", "none");
});

test("feature illustrations animate in view and stop for reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const ticket = page.locator(".feature-ticket");
  await ticket.scrollIntoViewIfNeeded();
  await expect(ticket).toHaveCSS("animation-name", "ticket-float");
  await expect(ticket).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(ticket).toHaveCSS("animation-name", "none");
});

test("mobile menu morphs, closes accessibly, and fits small screens", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile navigation only");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  await expect(page.locator(".menu-glyph > span").nth(1)).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator(".menu-glyph > span").first()).not.toHaveCSS(
    "transform",
    "none",
  );
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Open menu", exact: true }),
  ).toBeFocused();
  await expect(page.locator(".menu-glyph > span").first()).toHaveCSS(
    "transform",
    "none",
  );
  await page.setViewportSize({ width: 320, height: 568 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(nav.getByRole("link", { name: "Get started" })).toBeInViewport();
});
