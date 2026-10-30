import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const phase = process.argv[2] === "before" ? "before" : "after";
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL });
try {
  await mkdir("artifacts/design", { recursive: true });
  const page = await browser.newPage();
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [name, route] of [["home", "/"], ["booking", "/booking?service=brakes"]]) {
      await page.goto(`http://localhost:3000${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.locator("h1").waitFor();
      if (name === "home") await page.locator(".hero-photo img").evaluate(image => image.decode());
      else await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({ path: `artifacts/design/${phase}-${name}-${width}.png`, fullPage: true });
    }
  }
} finally {
  await browser.close();
}
