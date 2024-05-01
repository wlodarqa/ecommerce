import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly categoryFilter: Locator;
  readonly resolutionFilter: Locator;
  readonly ramMemoryFilter: Locator;
  readonly ssdMemoryFilter: Locator;
  readonly setFiltersButton: Locator;
  readonly productItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryFilter = page
      .getByTestId("category-filters")
      .getByRole("link");
    this.resolutionFilter = page
      .getByTestId("resolution-filters")
      .getByRole("checkbox");
    this.ramMemoryFilter = page
      .getByTestId("ram-memory-filters")
      .getByRole("checkbox");
    this.ssdMemoryFilter = page
      .getByTestId("ssd-memory-filters")
      .getByRole("checkbox");
    this.setFiltersButton = page.getByRole("button", { name: "Set filters" });
    this.productItem = page.getByTestId("product-item");
  }

  async applyFilters(searchCriteria: any) {
    await this.categoryFilter
      .filter({ hasText: searchCriteria.category })
      .click();
    await this.resolutionFilter
      .filter({ hasText: searchCriteria.resolution })
      .check();
    await this.ramMemoryFilter.filter({ hasText: searchCriteria.ram }).check();
    await this.ssdMemoryFilter.filter({ hasText: searchCriteria.ssd }).check();
    await this.setFiltersButton.click();
  }

  async verifyProductList({
    electronicsItem,
    resolution,
    ram,
    ssd,
  }: {
    electronicsItem: string;
    resolution: string;
    ram: string;
    ssd: string;
  }) {
    await expect(this.productItem.first()).toContainText(electronicsItem);
    for (const product of await this.productItem.all()) {
      await expect(product).toContainText(electronicsItem);
      await expect(product).toContainText(resolution);
      await expect(product).toContainText(ram);
      await expect(product).toContainText(ssd);
    }
  }
}
