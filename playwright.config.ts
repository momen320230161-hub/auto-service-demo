import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 4,
  timeout: 60_000,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.PLAYWRIGHT_CHANNEL,
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        browserName: "chromium",
        channel: process.env.PLAYWRIGHT_CHANNEL,
      },
    },
    ...(process.env.PLAYWRIGHT_WEBKIT === "1"
      ? [
          {
            name: "webkit-mobile",
            use: {
              ...devices["iPhone 13"],
              browserName: "webkit" as const,
            },
          },
        ]
      : []),
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
