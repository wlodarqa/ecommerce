import { test, expect } from "@playwright/test";
import { RegisterPage } from "./pages/register.page";
import { userData } from "./data/user.data";
import { LoginPage } from "./pages/login.page";
import { checkNotification } from "./helpers/notification";

test.describe("Register flow tests", () => {
  test("Create new account and log In - success flow", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await registerPage.goTo();
    await registerPage.registerFlow({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.password,
    });
    await checkNotification({
      page,
      message: "Account is succesfully created",
    });
    await expect(page).toHaveURL("/login");
    await expect(loginPage.loginFormHeading).toBeVisible();
    await loginPage.loginFlow(userData.username, userData.password);
    await checkNotification({ page, message: "User is successfully logged" });
    await expect(page).toHaveURL("/");
  });

  test("Create new account - user exist flow", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goTo();
    await registerPage.registerFlow({
      username: "existName",
      email: "existEmail@test.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    });
    await expect(registerPage.usernameInputError).toHaveText(
      "Username already exists"
    );
  });

  test("Create new account - passwords do not match", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goTo();
    await registerPage.registerFlow({
      username: "newUsername",
      email: "newuser@test.com",
      password: "Password@123",
      confirmPassword: "otherPassword",
    });
    await expect(registerPage.passwordsError).toHaveText(
      "Passwords do not match"
    );
  });

  test("Create new account - wrong password flow", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goTo();
    await registerPage.registerFlow({
      username: "newUser",
      email: "newuser@test.com",
      password: "password",
      confirmPassword: "password",
    });
    await expect(registerPage.passwordsError).toHaveText(
      "The password should contain uppercase and lowercase letters and special characters"
    );
  });

  test("Create new account - email validation", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goTo();
    await registerPage.registerFlow({
      username: "newUser",
      email: "wrongemail.test.com",
      password: "password",
      confirmPassword: "password",
    });
    await expect(registerPage.emailInputError).toHaveText(
      "Enter a valid email address"
    );
  });

  test("Create new account - check required fields", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goTo();
    await registerPage.saveButton.click();
    await expect(registerPage.usernameInput).toHaveText(
      "This field is required"
    );
    await expect(registerPage.emailInputError).toHaveText(
      "This field is required"
    );
    await expect(registerPage.passwordInputError).toHaveText(
      "This field is required"
    );
    await expect(registerPage.confirmPasswordInputError).toHaveText(
      "This field is required"
    );
  });
});
