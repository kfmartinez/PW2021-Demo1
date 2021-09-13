import { By, WebDriver } from 'selenium-webdriver';
import BasePage from './BasePage';

export default class NpmTrendsPage extends BasePage {
  private downloadsChart: By = By.id('download_chart');

  constructor(protected driver: WebDriver) {
    super(driver);
  }

  public async selectDownloadsDropdown(text: string): Promise<NpmTrendsPage> {
    await super.selectDropdown(By.css('select > option[value="' + text + '"]'));
    return this;
  }

  public async isDownloadsChartDisplayed(): Promise<boolean> {
    return await super.isDisplayed(this.downloadsChart);
  }

  public async waitForChartToLoad(): Promise<NpmTrendsPage> {
    await super.waitForElementToLoad(this.downloadsChart);
    return this;
  }
}
