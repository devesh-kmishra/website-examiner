import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { scrapeWithPlaywright } from "./playwrightScraper";

export async function scrapeWithCheerio(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!res.ok) return "";

  const html = await res.text();
  const parsedHtml = cheerio.load(html);

  parsedHtml("script, style, noscript").remove();

  const text = parsedHtml("body").text().replace(/\s+/g, " ").trim();

  return text.slice(0, 3000);
}

export async function scrapeWebsite(url: string): Promise<string> {
  const cheerioText = await scrapeWithCheerio(url);

  if (cheerioText.length > 35) {
    return cheerioText;
  }

  const playwrightText = await scrapeWithPlaywright(url);

  if (!playwrightText) {
    throw new Error("Failed to scrape website with Playwright");
  }

  return playwrightText;
}
