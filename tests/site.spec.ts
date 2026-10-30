import { expect, test } from "@playwright/test";
test("homepage, navigation, responsive layout and image", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Good care. For the road ahead.",
  );
  const photo = page.getByAltText(
    "Mechanic working under the open hood of a silver vehicle in a workshop",
  );
  await expect(photo).toBeVisible();
  await expect
    .poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(
      page.getByRole("button", { name: "Close navigation" }),
    ).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Services", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  } else
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Services" })
      .click();
  await expect(page).toHaveURL(/#services$/);
  for (const width of testInfo.project.name === "mobile"
    ? [320, 375, 390, 760]
    : [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect
      .poll(
        () =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        { message: `No horizontal overflow at ${width}px` },
      )
      .toBe(true);
  }
  await page.setViewportSize(
    testInfo.project.name === "mobile"
      ? { width: 390, height: 844 }
      : { width: 1440, height: 1000 },
  );
  await page.goto("/");
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.screenshot({
    path: `artifacts/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
test("booking validates, retains edits and completes locally without submission", async ({
  page,
}, testInfo) => {
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") submissions.push(request.url());
  });
  await page.goto("/booking");
  for (const width of testInfo.project.name === "mobile"
    ? [320, 375, 390]
    : [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize(
    testInfo.project.name === "mobile"
      ? { width: 390, height: 844 }
      : { width: 1440, height: 1000 },
  );
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByText("Choose a service, or select ‘Not sure yet’."),
  ).toBeVisible();
  await page.getByRole("radio", { name: "Oil & filter" }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Make (optional)").fill("Toyota");
  await page.getByLabel("Model (optional)").fill("Corolla");
  await page.getByLabel("Year (optional)").fill("1800");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByText("Enter a four-digit year between 1900 and next year."),
  ).toBeVisible();
  await expect(page.getByLabel("Year (optional)")).toBeFocused();
  await page.getByLabel("Year (optional)").fill("2020");
  await page
    .getByLabel("What have you noticed?")
    .fill("Sample maintenance note");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "What works for your day?" }),
  ).toBeFocused();
  await page.getByLabel("Preferred date", { exact: true }).fill("2020-01-01");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Choose today or a future date.")).toBeVisible();
  await page.getByLabel("Preferred date", { exact: true }).fill("2099-12-01");
  await page.getByLabel("Preferred time window").selectOption("No preference");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Enter an email address.")).toBeVisible();
  await page.getByLabel("Your name", { exact: true }).fill("Alex Sample");
  await page.getByLabel("Email address", { exact: true }).fill("invalid");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Everything look right?" }),
  ).toBeVisible();
  await expect(
    page.getByText("2020 Toyota Corolla", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Edit vehicle", exact: true }).click();
  await expect(page.getByLabel("Make (optional)")).toHaveValue("Toyota");
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `artifacts/review-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Complete demo request" }).click();
  await expect(
    page.getByRole("heading", { name: "Demo — not submitted" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Demo request only — no appointment has been booked or sent.",
    ),
  ).toBeVisible();
  expect(submissions).toEqual([]);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "What can we help with?" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.length + sessionStorage.length),
  ).toBe(0);
});
test("service links preselect the matching service", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /^Brakes Unusual/ }).click();
  await expect(
    page.getByRole("radio", { name: "Brakes", exact: true }),
  ).toBeChecked();
});
