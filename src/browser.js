import puppeteer from 'puppeteer';

export const createBrowser = async ({ headless, sandbox }) => {
  const args = ['--show-paint-rects'];

  const browser = await puppeteer.launch({
    headless,
    args: sandbox ? args : [...args, '--no-sandbox'],
  });

  return browser;
};
