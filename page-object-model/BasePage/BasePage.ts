import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;
  protected baseurl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseurl = "https://react-shopping-cart-67954.firebaseapp.com/";
  }

  constructLocatorBasedOnAttribute(selector: string): Locator {
    return this.page.locator(selector);
  }

  constructLocatorBasedOnGetByText(selector: string): Locator {
    return this.page.getByText(selector);
  }
  constructLocatorBasedOnSelector(selector: string): Locator {
    return this.page.locator(selector);
  }

  generateLocator(locateBy: string | Locator): Locator {
    return typeof locateBy === "string"
      ? this.constructLocatorBasedOnSelector(locateBy)
      : locateBy;
  }

  async waitForNumberOfSeconds(timeInSeconds: number): Promise<void> {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async waitForNavigation(urlPath: string | null = null): Promise<void> {
    const targetUrl = urlPath ? `${this.baseurl}/${urlPath}` : this.baseurl;

    await this.page.goto(targetUrl);
    await this.page.waitForURL(targetUrl);
    await expect(this.page).toHaveURL(targetUrl);
  }
}
