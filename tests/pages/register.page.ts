import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPassword: Locator;
  readonly saveButton: Locator;
  readonly usernameInputError: Locator;
  readonly emailInputError: Locator;
  readonly passwordsError: Locator;
  readonly passwordInputError: Locator;
  readonly confirmPasswordInputError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("username");
    this.emailInput = page.getByLabel("email");
    this.passwordInput = page.getByLabel("password");
    this.confirmPassword = page.getByLabel("confirm-password");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.usernameInputError = page.getByTestId("username-error");
    this.emailInputError = page.getByTestId("email-error");
    this.passwordsError = page.getByTestId("passwords-error");
    this.passwordInputError = page.getByTestId("password-error");
    this.confirmPasswordInputError = page.getByTestId("confirm-password-error");
  }

  async goTo() {
    await this.page.goto("/register");
  }

  async registerFlow({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    this.usernameInput.fill(username);
    this.emailInput.fill(email);
    this.passwordInput.fill(password);
    this.confirmPassword.fill(confirmPassword);
    this.saveButton.click();
  }
}
