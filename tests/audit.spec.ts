import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";
import { services } from "../src/content/site";

async function continueForm(page: Page) {
  await page.getByRole("button", { name: "Continue", exact: true }).click();
}

test("all requested widths across every booking stage and home", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Full width matrix uses the desktop browser; mobile journeys run separately.");
  test.setTimeout(120_000);
  const failures: string[] = [];
  page.on("pageerror", error => failures.push(error.message));
  page.on("console", message => {
    if (["error", "warning"].includes(message.type())) failures.push(message.text());
  });
  page.on("response", response => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  const requests: string[] = [];
  page.on("request", request => requests.push(`${request.url()} ${request.postData() || ""}`));
  const privateMarker = "audit-private-sample";
  async function capture(stage: string, width: number) {
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${stage} at ${width}`).toBe(true);
    expect(await page.locator("h1,h2,h3,.service-option").evaluateAll(elements => elements.filter(e => e.scrollWidth > e.clientWidth).map(e => e.textContent))).toEqual([]);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `artifacts/audit/${stage}-${width}.png`, fullPage: true });
  }
  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await capture("home", width);
    await page.goto("/booking?service=invalid");
    await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
    await capture("service", width);
    await page.getByRole("radio", { name: "Not sure yet", exact: true }).check();
    await continueForm(page);
    await capture("vehicle", width);
    await page.getByLabel("What have you noticed?", { exact: false }).fill(`<script>${privateMarker}</script> ${"LongUnbrokenSample".repeat(40)}`);
    await continueForm(page);
    await capture("preference", width);
    await page.getByLabel("Preferred date", { exact: true }).fill("2099-12-01");
    await page.getByLabel("Preferred time window").selectOption("No preference");
    await continueForm(page);
    await capture("contact", width);
    await page.getByLabel("Your name", { exact: true }).fill(privateMarker);
    await page.getByLabel("Email address", { exact: true }).fill(`${privateMarker}@example.com`);
    await page.getByRole("checkbox").check();
    await continueForm(page);
    await expect(page.locator(".review dd").filter({ hasText: `<script>${privateMarker}</script>` })).toHaveCount(1);
    await capture("review", width);
    await page.getByRole("button", { name: "Complete demo" }).click();
    await capture("complete", width);
  }
  expect(failures).toEqual([]);
  expect(requests.some(request => request.includes(privateMarker))).toBe(false);
});

test("404 stays light, has accessible recovery and returns home", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(251, 252, 252)");
  await expect(page.locator("main#main")).toBeVisible();
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => (await (window as typeof window & { axe: typeof axe }).axe.run()).violations.map(v => v.id));
  expect(violations).toEqual([]);
  await page.getByRole("link", { name: "Back to home", exact: true }).click();
  await expect(page).toHaveURL("/");
});

test("invalid service semantics, field contrast and responsive menu reset", async ({ page }) => {
  await page.goto("/booking");
  await continueForm(page);
  const firstRadio = page.getByRole("radio").first();
  await expect(firstRadio).toBeFocused();
  await expect(page.getByRole("group", { name: "Select a service" })).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("form").getByRole("alert")).toContainText("Please check");
  await firstRadio.check();
  await continueForm(page);
  const contrast = await page.locator("#make").evaluate(element => {
    const style = getComputedStyle(element);
    function luminance(color: string) {
      const rgb = color.match(/\d+/g)!.slice(0, 3).map(Number).map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4);
      return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
    }
    const background = luminance(style.backgroundColor);
    return {
      border: (background + .05) / (luminance(style.borderColor) + .05),
      placeholder: (background + .05) / (luminance(getComputedStyle(element, "::placeholder").color) + .05),
    };
  });
  expect(contrast.border).toBeGreaterThanOrEqual(3);
  expect(contrast.placeholder).toBeGreaterThanOrEqual(4.5);
  await page.setViewportSize({ width: 768, height: 900 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.locator("#mobile-nav a").first().focus();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  await expect(page.locator(".desktop-nav a").first()).toBeFocused();
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
});

test("all service links, section links and contact action reach their destinations", async ({ page }) => {
  for (const service of services) {
    await page.goto("/");
    await page.getByRole("button", { name: service.name, exact: true }).click();
    await expect(page.locator("#service-detail h3")).toHaveText(service.name);
    await expect(page.locator('.service-menu button[aria-pressed="true"]')).toHaveCount(1);
    await page.locator(`#service-detail a[href="/booking?service=${service.id}"]`).click();
    await expect(page.getByRole("radio", { name: service.name, exact: true })).toBeChecked();
  }
  await page.goto("/");
  await page.getByRole('link', { name: 'Describe a concern', exact: true }).click();
  await expect(page.getByRole("radio", { name: "Not sure yet", exact: true })).toBeChecked();
  for (const [label, id] of [["Services", "services"], ["Our approach", "approach"], ["Contact", "contact"]]) {
    await page.goto("/booking");
    const toggle = page.getByRole("button", { name: "Open navigation" });
    const mobile = await toggle.isVisible();
    if (mobile) await toggle.click();
    await page.getByRole("navigation", { name: mobile ? "Mobile navigation" : "Main navigation" }).getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
  await page.locator("footer").getByRole("link", { name: "Explore the request demo" }).click();
  await expect(page).toHaveURL("/booking");
  await expect(page.getByRole("heading", { name: "Choose your service." })).toBeVisible();
});
