import puppeteer from "puppeteer-core";

/**
 * Translate Bahasa Jawa using Kongres Aksara Jawa
 * @param {string} inputText - Text to translate from Indonesian to Javanese
 * @returns {Promise<string>} - Translation result
 */
export async function translateWithKongresAksaraJawa(inputText) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || "google-chrome-stable",
  });

  const page = await browser.newPage();

  try {
    await page.goto("https://kongresaksarajawa.id/salinsaja/", {
      waitUntil: "domcontentloaded",
    });

    await page.type("#str-in", inputText);

    await page.waitForFunction(() => {
      const out = document.querySelector("#str-out");
      return out && out.value && out.value.length > 0;
    });

    const result = await page.$eval("#str-out", (el) => el.value);
    return result;
  } finally {
    await browser.close();
  }
}
