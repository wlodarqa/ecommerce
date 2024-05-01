import { test } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { ProductPage } from "./pages/products.page";
import { NavbarComponent } from "./components/navbar";

test.describe("Search and filters test", () => {
  test("Use search and filters for searching specific stuff", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const navbarComponent = new NavbarComponent(page);
    const searchCriteria = {
      electronicsItem: "Macbook Pro",
      category: "Notebooks",
      resolution: "16.2",
      ram: "32 GB",
      ssd: "1 TB",
    };

    await homePage.goTo();
    await navbarComponent.useSearch(searchCriteria.electronicsItem);
    await productPage.applyFilters(searchCriteria);
    await productPage.verifyProductList({
      electronicsItem: searchCriteria.electronicsItem,
      resolution: searchCriteria.resolution,
      ram: searchCriteria.ram,
      ssd: searchCriteria.ssd,
    });
  });
});
