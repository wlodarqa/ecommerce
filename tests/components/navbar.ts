import { Page, Locator } from "@playwright/test";

export class NavbarComponent {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly basketButton: Locator;
  readonly basketCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId("search-input");
    this.basketButton = page.getByRole("button", { name: "basket" });
    this.basketCount = this.basketButton.getByTestId("basket-count");
  }

  async useSearch(item: string) {
    await this.searchInput.fill(item);
    await this.page.keyboard.press("Enter");
  }
}
