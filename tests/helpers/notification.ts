import { Page, expect } from "@playwright/test";

export async function checkNotification({
  page,
  message,
}: {
  page: Page;
  message: string;
}) {
  await expect(page.getByTestId("notifications")).toHaveText(message);
}
