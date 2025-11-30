import puppeteer from 'puppeteer-core';
import express from 'express';

/**
 * Transltae Bahasa Jawa
 * @param {string} inputText
 * @returns {Promise<string>} hasil terjemahan
 */
export async function translateWithKongresAksaraJawa(inputText) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
  });
  const page = await browser.newPage();
  await page.goto('https://kongresaksarajawa.id/salinsaja/', { waitUntil: 'domcontentloaded' });
  await page.type('#str-in', inputText);

  await page.waitForFunction(() => {
    const out = document.querySelector('#str-out');
    return out && out.value && out.value.length > 0;
  });
  const result = await page.$eval('#str-out', el => el.value);

  await browser.close();
  return result;
}

const app = express();
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { indo } = req.body;
  if (!indo) {
    return res.status(400).json({ error: 'Field "indo" is required.' });
  }
  try {
    const hasil = await translateWithKongresAksaraJawa(indo);
    res.json({ result: hasil });
  } catch (err) {
    res.status(500).json({ error: 'Translation failed.', detail: err.message });
  }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
    });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});