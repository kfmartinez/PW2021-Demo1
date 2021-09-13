import { Locator, until, WebDriver, WebElement } from 'selenium-webdriver';
import { TestHelper } from '../helpers/TestHelper';

export default abstract class BasePage {
  constructor(protected driver: WebDriver) {
    this.driver = driver;
  }

  protected async selectDropdown(locator: Locator): Promise<BasePage> {
    await (await TestHelper.findElement(this.driver, locator)).click();
    return this;
  }

  protected async isDisplayed(locator: Locator): Promise<boolean> {
    const elem = await TestHelper.findElement(this.driver, locator);
    await this.scrollIntoView(elem);
    return await elem.isDisplayed();
  }

  protected async waitForElementToLoad(locator: Locator, timeout: number = 8000): Promise<BasePage> {
    await this.driver.wait(until.elementIsVisible(await TestHelper.findElement(this.driver, locator)), timeout);
    return this;
  }

  protected async scrollIntoView(elem: WebElement): Promise<BasePage> {
    await TestHelper.scrollIntoView(this.driver, elem);
    return this;
  }

  public async maximize(): Promise<BasePage> {
    await this.driver.manage().window().maximize();
    return this;
  }

  public async navigateTo(url: string): Promise<BasePage> {
    await this.driver.get(url);
    return this;
  }

  public async close(): Promise<void> {
    await this.driver.quit();
  }
}
