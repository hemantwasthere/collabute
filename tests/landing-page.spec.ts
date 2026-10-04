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
