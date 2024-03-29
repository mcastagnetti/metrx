import { toCamelCase, translateMetrics, getRelevantTime } from './utils.js';

/**
 * Extract metrics which are accessible via the `window` object.
 *
 * @param  {Object} page The puppeteer page instance we are working with.
 * @return {Object} The extracted relevant metrics.
 */
const extractPageTimings = async (page) => {
  // Get timing performance metrics from the `window` object.
  // eslint-disable-next-line no-undef
  const performanceTimings = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.timing)));
  // eslint-disable-next-line no-undef
  const paintTimings = JSON.parse(await page.evaluate(() => JSON.stringify(performance.getEntriesByType('paint'))));

  const navigationStart = performanceTimings.navigationStart;
  const relevantDataKeys = ['domInteractive', 'loadEventEnd', 'responseEnd'];
  const relevantData = {};

  relevantDataKeys.forEach((name) => {
    relevantData[name] = performanceTimings[name] - navigationStart;
  });

  paintTimings.forEach((timing) => {
    relevantData[toCamelCase(timing.name)] = timing.startTime;
  });

  return {
    firstPaint: relevantData.firstPaint,
    firstContentfulPaint: relevantData.firstContentfulPaint,
    responseEnd: relevantData.responseEnd,
    loadEventEnd: relevantData.loadEventEnd,
  };
};

/**
 * Collect and extracts performance metrics.
 *
 * @param  {Object}  page   The puppeteer page instance we are working with.
 * @param  {Object}  client The puppeteer client instance we are working with.
 */
export const extractPerformanceMetrics = async (page, client) => {
  let firstMeaningfulPaint = 0;
  let translatedMetrics;

  while (firstMeaningfulPaint === 0) {
    await page.waitForTimeout(100);
    let performanceMetrics = await client.send('Performance.getMetrics');
    translatedMetrics = translateMetrics(performanceMetrics);
    firstMeaningfulPaint = translatedMetrics.FirstMeaningfulPaint;
  }

  const navigationStart = translatedMetrics.NavigationStart;

  return {
    jsHeapUsedSize: translatedMetrics.JSHeapUsedSize,
    jsHeapTotalSize: translatedMetrics.JSHeapTotalSize,
    scriptDuration: translatedMetrics.ScriptDuration * 1000,
    firstMeaningfulPaint: getRelevantTime(firstMeaningfulPaint, navigationStart),
    domContentLoaded: getRelevantTime(translatedMetrics.DomContentLoaded, navigationStart),
    ...(await extractPageTimings(page)),
  };
};
