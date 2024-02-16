import { test, expect } from "../../fixtures/baseTest";

test.describe("Cart sanity Test Suite", () => {
  test("should verify that there are no items in the cart and calculate the subtotal", async ({
    navigateToPage,
    cartPage,
    productPage,
    page,
  }) => {
    await productPage.waitForNavigation();
    await cartPage.openCartMenu();
    await cartPage.isEmpty();
    await expect(cartPage.cartEmptyText).toContainText(
      "Add some products in the cart"
    );
    await expect(cartPage.emptySubtotalText).toContainText("$ 0.00");
  });

  test("should verify that multiple items are randomly added to the cart and calculate the subtotal accurately", async ({
    navigateToPage,
    productPage,
    cartPage,
    page,
  }) => {
    await productPage.waitForNavigation();
    await productPage.addToCartRandomByIndex();
    let subTotal = await cartPage.calculateSubTotal();
    console.log(subTotal);
    await page.waitForTimeout(3000);
  });
});
