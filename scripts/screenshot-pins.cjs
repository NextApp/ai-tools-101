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
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function screenshotPin(htmlFile) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1000, height: 1500, deviceScaleFactor: 2 });
  
  const filePath = `file://${path.resolve(htmlFile)}`;
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 15000 });
  
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  
  const pngFile = htmlFile.replace('.html', '.png');
  await page.screenshot({ path: pngFile, type: 'png', fullPage: false });
  
  const stats = fs.statSync(pngFile);
  console.log(`  ✅ ${path.basename(pngFile)} (${(stats.size/1024).toFixed(0)}KB)`);
  await browser.close();
  fs.unlinkSync(htmlFile);
}

async function main() {
  const files = fs.readdirSync(PINS_DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(PINS_DIR, f));
  
  if (files.length === 0) {
    console.log('No pin HTML files. Run gen-pins.py first.');
    return;
  }
  
  console.log(`Screenshotting ${files.length} pins with system Chrome...`);
  for (const file of files) {
    await screenshotPin(file);
  }
  console.log('Done!');
}

main().catch(e => { console.error(e.message); process.exit(1); });
