import { Page, Locator } from "@playwright/test";

export class BasketPage {
  readonly page: Page;
  itemList: Locator;
  productItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemList = page.getByTestId("item-list");
    this.productItem = page.getByTestId("product-item");
  }
}
