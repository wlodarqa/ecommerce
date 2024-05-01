import { Page, Locator } from "@playwright/test";

export class ProductDetailsPage {
  readonly page: Page;
  readonly productDetails: Locator;
  readonly addToCardButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDetails = page.getByTestId("details");
    this.addToCardButton = page.getByRole("button", { name: "Add to cart" });
  }
}
