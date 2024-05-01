import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginFormHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("username");
    this.passwordInput = page.getByLabel("password");
    this.loginButton = page.getByRole("button", { name: "LogIn" });
    this.loginFormHeading = page.getByRole("heading", { name: "Login" });
  }

  async goTo() {
    await this.page.goto("/login");
  }

  async loginFlow(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
