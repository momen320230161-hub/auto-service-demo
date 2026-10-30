import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

// Local lab observations, not field Core Web Vitals or a Lighthouse score.
// Run against a production server with no other browser tests running.
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL });
const results = [];
try {
  for (const width of [390, 1440, 1920]) {
    for (const route of ["/", "/booking"]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.auditMetrics = { lcpMs: 0, layoutShiftTotal: 0 };
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) window.auditMetrics.lcpMs = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.auditMetrics.layoutShiftTotal += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto(`http://localhost:3000${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForLoadState("networkidle");
      results.push({ width, route, ...await page.evaluate(() => {
        const resources = performance.getEntriesByType("resource");
        const navigation = performance.getEntriesByType("navigation")[0];
        return {
          ...window.auditMetrics,
          ttfbMs: navigation.responseStart - navigation.requestStart,
          transferredBytes: resources.reduce((sum, resource) => sum + resource.transferSize, 0),
          javascriptEncodedBytes: resources.filter(resource => resource.initiatorType === "script").reduce((sum, resource) => sum + resource.encodedBodySize, 0),
          imageUrl: document.querySelector(".hero-photo img")?.currentSrc ?? null,
          thirdPartyResources: resources.filter(resource => new URL(resource.name).origin !== location.origin).map(resource => resource.name),
        };
      }) });
      await context.close();
    }
  }
  await mkdir("artifacts/audit", { recursive: true });
  const report = { measuredAt: new Date().toISOString(), environment: "Local production server; Chrome; fresh browser contexts; DPR 1; no CPU/network throttling; single sample each. Layout-shift total is observed during load only. INP and real-user Core Web Vitals not measured.", results };
  await writeFile("artifacts/audit/performance.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
