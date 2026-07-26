import { expect, test } from "@playwright/test";

test("parcours coach : login → dashboard → fiche athlète", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Entrer comme coach" }).click();
  await expect(page).toHaveURL(/\/coach$/);

  await page.getByRole("link", { name: "Léa Marchand" }).first().click();
  await expect(page).toHaveURL(/\/coach\/athletes\/lea$/);
  await expect(page.getByRole("heading", { name: "Léa Marchand" })).toBeVisible();
});

test("parcours athlète : login → ma semaine → messagerie", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Entrer comme athlète" }).click();
  await expect(page).toHaveURL(/\/athlete$/);

  await page.getByRole("link", { name: "Messages" }).click();
  await expect(page).toHaveURL(/\/athlete\/messagerie$/);
});
