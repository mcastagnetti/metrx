import lighthouse from 'lighthouse';

export const createLightHouseReport = async ({ browser, page }) => {
  const endpoint = new URL(browser.wsEndpoint());
  const options = { logLevel: 'silent', output: 'json', onlyCategories: ['performance'], port: endpoint.port };

  const runnerResult = await lighthouse(page.url(), options);

  console.log(runnerResult.lhr.audits['first-contentful-paint']);
  console.log(runnerResult);

  return runnerResult;
};
