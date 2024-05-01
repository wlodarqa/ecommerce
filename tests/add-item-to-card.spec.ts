import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { ProductPage } from "./pages/products.page";
import { ProductDetailsPage } from "./pages/product-details.page";
import { checkNotification } from "./helpers/notification";
import { BasketPage } from "./pages/basket.page";
import { NavbarComponent } from "./components/navbar";

test.describe("Search and filters test", () => {
  test("Use search and filters for searching specific stuff", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const basketPage = new BasketPage(page);
    const navbarComponent = new NavbarComponent(page);
    const item = "Iphone 15";
    const notification = "Item successfully added";

    await homePage.goTo();
    await navbarComponent.useSearch(item);
    await productPage.productItem.first().click();
    await expect(productDetailsPage.productDetails).toBeVisible();
    const itemName = await page.getByRole("heading").innerText();
    await productDetailsPage.addToCardButton.click();
    await checkNotification({ page, message: notification });
    await expect(navbarComponent.basketCount).toHaveText("1");
    await navbarComponent.basketButton.click();
    await expect(basketPage.itemList).toBeVisible();
    await expect(basketPage.productItem).toHaveCount(1);
    await expect(basketPage.productItem.getByRole("link")).toHaveText(itemName);
  });
});
