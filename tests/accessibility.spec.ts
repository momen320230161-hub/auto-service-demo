import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";
import { site } from "../src/content/site";

async function audit(page: Page) {
  const originalViewport = page.viewportSize();
  if (originalViewport && originalViewport.width < 760) {
    await page.setViewportSize({ width: 320, height: 664 });
  }
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => {
    const result = await (
      window as typeof window & { axe: typeof axe }
    ).axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
      },
    });
    return result.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    }));
  });
  expect(violations).toEqual([]);
  if (originalViewport) await page.setViewportSize(originalViewport);
}

test("accessibility across home, booking steps, validation and completion", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    `${site.name} ${site.descriptor} — Concept Demo`,
  );
  const footer = page.locator("footer");
  await expect(footer.locator("dl > div")).toHaveCount(4);
  for (const label of ["Phone", "Email", "Workshop", "Hours"])
    await expect(
      footer.locator("dt", { hasText: new RegExp(`^${label}$`) }),
    ).toBeVisible();
  await audit(page);
  await page.goto("/booking");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await audit(page);
  await page.getByRole("radio", { name: "Not sure yet", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await audit(page);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await audit(page);
  await page.getByLabel("Preferred date", { exact: true }).fill("2099-12-01");
  await page.getByLabel("Preferred time window").selectOption("No preference");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await audit(page);
  await page.getByLabel("Your name", { exact: true }).fill("Alex Sample");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await audit(page);
  await page.getByRole("button", { name: "Complete demo" }).click();
  await audit(page);
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Choose your service." }),
  ).toBeFocused();
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
});

test("keyboard service selection and reduced motion", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  if (testInfo.project.use.isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Services", exact: true })
      .focus();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toHaveCount(0);
  }
  await page.goto("/booking");
  const oil = page.getByRole("radio", { name: "Oil & filter", exact: true });
  await oil.focus();
  await page.keyboard.press("Space");
  await expect(oil).toBeChecked();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("radio", { name: "Brakes", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Continue", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Tell us about your car." }),
  ).toBeFocused();
});
