import { Locator } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
export class ProductPage extends BasePage {
  private addToCartButton: Locator;
  private product: Locator;
  private _products: Array<Locator> = [];

  constructor(page) {
    super(page);
    this.addToCartButton = this.constructLocatorBasedOnGetByText("Add to Cart");
  }

  async getAllProducts(): Promise<void> {
    await this.page.waitForSelector('[tabindex="1"]');
    const productsLocator = await this.page.locator('[tabindex="1"]').all();
    this._products = productsLocator;
  }

  async products(): Promise<Array<Locator>> {
    await this.getAllProducts();
    return this._products;
  }

  async getProductByIndex(productIndex: number): Promise<Locator> | never {
    if (productIndex >= 0 && productIndex < this._products.length) {
      return this._products[productIndex];
    } else {
      throw new Error("Product index out of range");
    }
  }

  async getName(productIndex: number): Promise<string> | never {
    const product = await this.getProductByIndex(productIndex);
    const productName = await product.locator("p").textContent();
    if (productName !== null) {
      return productName;
    } else {
      throw new Error("Product name not found");
    }
  }

  async getPrice(productIndex: number): Promise<string> | never {
    this.product = await this.getProductByIndex(productIndex);
    const productPrice = await this.product.locator("p").nth(1).textContent();
    if (productPrice !== null) {
      return productPrice;
    } else {
      throw new Error("Product price not found");
    }
  }
  async addToCartRandomByIndex(): Promise<void> {
    await this.products();
    for (let i = 0; i < 4; i++) {
      const iProduct = Math.floor(Math.random() * this._products.length);
      const product = this._products[iProduct];
      const addToCartBtn = await product.locator(
        'button:has-text("Add to Cart")'
      );
      await addToCartBtn.click();
    }
  }
}
