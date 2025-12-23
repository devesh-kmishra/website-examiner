import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function scrapeWebsite(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch website!");
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  $("script, style, noscript").remove();

  const text = $("body").text().replace(/\s+/g, " ").trim();

  return text.slice(0, 3000);
}
