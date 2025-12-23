import { chromium } from "playwright";

export async function scrapeWithPlaywright(url: string): Promise<string> {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    const text = await page.evaluate(() => {
      const elements = document.querySelectorAll("h1, h2, h3, p, li");

      return Array.from(elements)
        .map((el) => el.textContent || "")
        .join(" ");
    });

    return text.replace(/\s+/g, " ").trim().slice(0, 3000);
  } finally {
    await browser.close();
  }
}
