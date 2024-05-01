import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly resolutionFilter: Locator;
  readonly ramMemobyFilter: Locator;
  readonly ssdMemoryFilter: Locator;
  readonly setFiltersButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId("search-input");
    this.categoryFilter = page
      .getByTestId("category-filters")
      .getByRole("link");
    this.resolutionFilter = page
      .getByTestId("resolution-filters")
      .getByRole("checkbox");
    this.ramMemobyFilter = page
      .getByTestId("ram-memory-filters")
      .getByRole("checkbox");
    this.ssdMemoryFilter = page
      .getByTestId("ssd-memory-filters")
      .getByRole("checkbox");
    this.setFiltersButton = page.getByRole("button", { name: "Set filters" });
  }

  async goTo() {
    await this.page.goto("/");
  }
}
