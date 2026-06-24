import puppeteer from "puppeteer-core";

/** @type {import("puppeteer-core").Browser | null} */
let browser = null;

/** @type {import("puppeteer-core").Page | null} */
let page = null;

const TARGET_URL = "https://kongresaksarajawa.id/salinsaja/";

const LAUNCH_ARGS = {
  headless: false,
  executablePath:
    process.env.CHROME_EXECUTABLE_PATH || "/usr/bin/google-chrome-stable",
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
  ],
};

/**
 * Initialize singleton browser and page.
 * Called once on server startup.
 */
export async function initBrowser() {
  if (browser && page) return; // already initialized

  browser = await puppeteer.launch(LAUNCH_ARGS);
  page = await browser.newPage();
  await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });

  console.log("[translator] Browser initialized");
}

/**
 * Gracefully close browser.
 * Called on server shutdown.
 */
export async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
    console.log("[translator] Browser closed");
  }
}

/**
 * Translate Bahasa Indonesia to Aksara Jawa via Kongres Aksara Jawa.
 * Reuses the singleton page — clears previous input, types new text, waits for result.
 *
 * @param {string} inputText - Text to translate
 * @returns {Promise<string>} - Translation result in Javanese script
 */
export async function translateWithKongresAksaraJawa(inputText) {
  if (!page) {
    throw new Error("Browser not initialized. Call initBrowser() first.");
  }

  // Clear existing input
  await page.$eval("#str-in", (el) => (el.value = ""));
  await page.type("#str-in", inputText);

  // Wait until output is non-empty
  await page.waitForFunction(
    () => {
      const out = document.querySelector("#str-out");
      return out && out.value && out.value.length > 0;
    },
    { timeout: 15_000 },
  );

  const result = await page.$eval("#str-out", (el) => el.value);
  return result;
}
