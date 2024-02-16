import { Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";

export class CartPage extends BasePage {
  private products: Array<Locator>;
  private cartBtn: Locator;
  public cartEmptyText: Locator;
  public emptySubtotalText: Locator;
  private productPriceElements: Locator;
  constructor(page) {
    super(page);
    this.cartEmptyText = this.page.locator(".sc-7th5t8-1.hqDkK");
    this.cartBtn = this.page.getByRole("button", { name: "0" });
    this.emptySubtotalText = this.page.locator(".sc-1h98xa9-9.jzywDV");
    this.productPriceElements = this.page
      .locator(".sc-11uohgb-4.bnZqjD")
      .locator("p");
  }

  async getAllCartProducts(): Promise<void> {
    const productsLocator = this.page
      .locator(".sc-11uohgb-4.bnZqjD")
      .locator("p")
      .all();

    this.products = await productsLocator;
  }
  async openCartMenu(): Promise<void> {
    await this.cartBtn.click();
  }
  async isEmpty(): Promise<void> {
    await this.getAllCartProducts();
    await expect(this.products.length).toBe(0);
  }

  async calculateSubTotal(): Promise<number> {
    let subtotal = 0;
    await this.getAllCartProducts();
    for (const productPriceElem of this.products) {
      const priceText = await productPriceElem.textContent();
      console.log(priceText);
      if (priceText !== null) {
        const price = +priceText.replace("$", "").trim();
        if (!isNaN(price)) {
          subtotal += price;
        }
      }
    }
    return subtotal;
  }
}
