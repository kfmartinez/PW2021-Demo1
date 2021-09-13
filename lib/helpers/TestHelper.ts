import { Locator, WebDriver, WebElement } from 'selenium-webdriver';

export abstract class TestHelper {
  public static async findElement(
    driver: WebDriver,
    locator: Locator,
    ms: number = 1000,
    ctr: number = 0
  ): Promise<WebElement> {
    let elem = undefined;
    while (elem === undefined && ctr < 10) {
      try {
        elem = await driver.findElement(locator);
        break;
      } catch (err) {
        await TestHelper.sleep(ms);
        ctr++;
      }
    }
    return elem!;
  }

  public static async scrollIntoView(driver: WebDriver, elem: WebElement) {
    await driver.executeScript('arguments[0].scrollIntoView(true);', elem);
  }

  public static async sleep(ms: number = 3000) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
