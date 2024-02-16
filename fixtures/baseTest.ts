import { CartPage } from "../page-object-model/CartPage/CartPage";
import { ProductPage } from "../page-object-model/ProductPage/ProductPage";
import { test as base } from "@playwright/test";
interface PageObjects {
  cartPage: CartPage;
  productPage: ProductPage;
  navigateToPage: string;
}

export const test = base.extend<PageObjects>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  navigateToPage: async ({ productPage }, use) => {
    await productPage.waitForNavigation();
    await use("");
  },
});

export { expect } from "@playwright/test";
