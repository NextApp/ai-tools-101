const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Use puppeteer-core with system Chrome
try { require.resolve('puppeteer-core'); } catch {
  console.log('Installing puppeteer-core (no browser download)...');
  execSync('npm install puppeteer-core', { stdio: 'inherit', timeout: 30000 });
}

const puppeteer = require('puppeteer-core');

const PINS_DIR = 'public/pins';

function findChrome() {
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  try {
    return execSync('which google-chrome || which chromium-browser || which chromium', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

const CHROME_PATH = findChrome();

async function screenshotPin(browser, htmlFile) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1000, height: 1500, deviceScaleFactor: 2 });
    
    const filePath = `file://${path.resolve(htmlFile)}`;
    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 15000 });
    
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 2000));
    
    const pngFile = htmlFile.replace('.html', '.png');
    await page.screenshot({ path: pngFile, type: 'png', fullPage: false });
    
    const stats = fs.statSync(pngFile);
    console.log(`  ✅ ${path.basename(pngFile)} (${(stats.size/1024).toFixed(0)}KB)`);
    fs.unlinkSync(htmlFile);
  } finally {
    await page.close();
  }
}

async function main() {
  if (!CHROME_PATH) {
    console.error('Chrome not found. Install Google Chrome or Chromium, or set CHROME_PATH env var.');
    process.exit(1);
  }
  
  const files = fs.readdirSync(PINS_DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(PINS_DIR, f));
  
  if (files.length === 0) {
    console.log('No pin HTML files. Run gen-pins.py first.');
    return;
  }
  
  console.log(`Screenshotting ${files.length} pins with Chrome at ${CHROME_PATH}...`);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-gpu']
  });
  try {
    for (const file of files) {
      await screenshotPin(browser, file);
    }
  } finally {
    await browser.close();
  }
  console.log('Done!');
}

main().catch(e => { console.error(e.message); process.exit(1); });
