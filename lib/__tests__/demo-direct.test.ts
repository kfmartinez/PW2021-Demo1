import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { TestHelper } from '../helpers/TestHelper';

describe('Demo Direct Invocation', () => {
  const url =
    'https://www.npmtrends.com/cypress-vs-nightmare-vs-puppeteer-vs-selenium-webdriver-vs-webdriverio-vs-testcafe';
  const timeout = 5000;

  let driver: WebDriver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.get(url);
  });

  it('should display the downloads chart', async () => {
    await driver.wait(until.elementIsVisible(await TestHelper.findElement(driver, By.id('download_chart'))), timeout);
    await driver.findElement(By.css('select > option[value="2015-01-04"]')).click();

    const downloadsChart = await driver.findElement(By.id('download_chart'));
    await driver.executeScript('arguments[0].scrollIntoView(true);', downloadsChart);
    expect(await downloadsChart.isDisplayed()).toBeTruthy();
    await TestHelper.sleep(timeout);
  });

  afterEach(async () => {
    await driver.quit();
  });
});
