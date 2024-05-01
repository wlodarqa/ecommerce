import { test as setup } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { userData } from "./data/user.data";

const authFile = "playwright/.auth/user.json";

setup("do login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.loginFlow(userData.username, userData.password);
  await page.context().storageState({ path: authFile });
});
