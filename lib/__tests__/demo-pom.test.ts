import { Builder, WebDriver } from 'selenium-webdriver';
import { TestHelper } from '../helpers/TestHelper';
import NpmTrendsPage from '../pom/NpmTrendsPage';

const CONFIG = require('../../config');

describe('Demo POM Invocation', () => {
  const url = `${CONFIG.baseUrl}/cypress-vs-nightmare-vs-puppeteer-vs-selenium-webdriver-vs-webdriverio-vs-testcafe`;

  let driver: WebDriver;
  let npmTrendsPage: NpmTrendsPage;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(CONFIG.browser).build();
    npmTrendsPage = new NpmTrendsPage(driver);

    await npmTrendsPage.maximize();
    await npmTrendsPage.navigateTo(url);
  });

  it('should display the downloads chart', async () => {
    await npmTrendsPage.waitForChartToLoad();
    await npmTrendsPage.selectDownloadsDropdown('2015-01-04');
    expect(await npmTrendsPage.isDownloadsChartDisplayed()).toBeTruthy();

    await TestHelper.sleep();
  });

  afterEach(async () => {
    await npmTrendsPage.close();
  });
});
