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

test("planning : une séance faite mène à son analyse, avec retour vers la fiche athlète", async ({ page }) => {
  await page.goto("/coach/planning");
  await page.getByRole("link", { name: /10×400 m/ }).click();
  await expect(page).toHaveURL(/\/coach\/analyse\/act1$/);
  await expect(page.getByRole("heading", { name: "10×400 m" })).toBeVisible();

  await page.getByRole("link", { name: /Retour à la fiche de Léa Marchand/ }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/lea$/);
});

test("dashboard coach : le bouton Analyser pointe vers la bonne séance", async ({ page }) => {
  await page.goto("/coach");
  await page.getByRole("link", { name: "Analyser" }).click();
  await expect(page).toHaveURL(/\/coach\/analyse\/act1$/);
});

test("dashboard coach : cliquer un message ouvre la bonne conversation (pas toujours la même)", async ({ page }) => {
  await page.goto("/coach");
  await page.locator('a[href="/coach/messagerie?athlete=sofia"]').click();
  await expect(page).toHaveURL(/\/coach\/messagerie\?athlete=sofia$/);
  await expect(page.getByTestId("conversation-titre")).toHaveText("Sofia Ruiz");
});

test("fiche athlète : liens vers le planning et les analyses de cet athlète", async ({ page }) => {
  await page.goto("/coach/athletes/lea");
  await page.getByRole("link", { name: "Voir le planning" }).click();
  await expect(page).toHaveURL(/\/coach\/planning\?athlete=lea$/);
  await expect(page.getByRole("heading", { name: "Planning — Léa Marchand" })).toBeVisible();

  await page.goBack();
  await page.getByRole("link", { name: "Séances analysées" }).click();
  await expect(page).toHaveURL(/\/coach\/analyse\?athlete=lea$/);
});

test("athlète : dépose une séance rattachée depuis Ma semaine, et retrouve l'historique", async ({ page }) => {
  await page.goto("/athlete");
  await page.getByRole("link", { name: "Déposer ma séance" }).first().click();
  await expect(page).toHaveURL(/\/athlete\/upload\?seance=/);
  await expect(page.getByText("SEUIL")).toBeVisible();

  await page.getByRole("link", { name: "Historique" }).click();
  await expect(page).toHaveURL(/\/athlete\/historique$/);
  await expect(page.getByRole("heading", { name: "Historique de mes séances" })).toBeVisible();
});
