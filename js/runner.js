const { extractPerformanceMetrics } = require('./metrics');
const { buildStats, populateDataObject } = require('./utils');

/**
 * Extracts the page metrics as many time as the repeat parameter and build statistics aroud it.
 *
 * @param  {Object}   page          The puppeteer page object we are working on.
 * @param  {Object}   client        The puppeteer client we are working with.
 * @param  {string}   url           The tested url.
 * @param  {number}   repeat        The number of times we want to extract data.
 * @param  {number}   withRedirects Whether we want to test the whole redirect chain timings.
 * @param  {string}   waitUntil     The `waitUntil` value to set to the reload.
 *                                  See https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagereloadoptions
 *                                  for more informations.
 * @param  {Function} logStep       Functions to display the correct step in the console.
 * @return {Object}   Statistics about collected metrics.
 */
module.exports = async ({ page, client, url, withRedirects, repeat, waitUntil = 'load', logStep }) => {
    let i = 0;
    const data = {};

    while (i < repeat) {
        logStep(i + 1, repeat);

        if (withRedirects) {
            await page.goto(url, {
                waitUntil: waitUntil.split(','),
            });
        } else {
            await page.reload({
                waitUntil: waitUntil.split(','),
            });
        }

        const extractedMetrics = await extractPerformanceMetrics(page, client);

        const { navigationStart } = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.timing)));
        const end = Date.now();

        populateDataObject(data, {
            ...extractedMetrics,
            total: end - navigationStart,
        });

        i++;
    }

    return buildStats(data);
};
