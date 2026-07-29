import { expect, test } from "@playwright/test";

test("parcours coach : login → dashboard → fiche athlète", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Entrer comme coach" }).click();
  await expect(page).toHaveURL(/\/coach$/);

  await page.getByTestId("mon-ecurie").getByRole("link", { name: "Léa Marchand" }).click();
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

test("athlète : dépose une séance rattachée depuis Ma semaine, et retrouve l'historique", async ({ page }) => {
  await page.goto("/athlete");
  await page.getByRole("link", { name: "Déposer ma séance" }).first().click();
  await expect(page).toHaveURL(/\/athlete\/upload\?seance=/);
  await expect(page.getByText("SEUIL")).toBeVisible();

  await page.getByRole("link", { name: "Historique" }).click();
  await expect(page).toHaveURL(/\/athlete\/historique$/);
  await expect(page.getByRole("heading", { name: "Historique de mes séances" })).toBeVisible();
});

test("écurie → fiche athlète, avec les 3 onglets accessibles et un retour au dashboard", async ({ page }) => {
  await page.goto("/coach");
  await page.getByTestId("mon-ecurie").getByRole("link", { name: "Karim Benali" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim$/);
  await expect(page.getByRole("heading", { name: "Karim Benali" })).toBeVisible();

  await page.getByRole("link", { name: "Planning", exact: true }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim\/planning$/);

  await page.getByRole("link", { name: "Messagerie" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim\/messagerie$/);

  await page.getByRole("link", { name: "Retour au tableau de bord" }).click();
  await expect(page).toHaveURL(/\/coach$/);
});

test("dashboard : un message non lu ouvre directement la messagerie du bon athlète", async ({ page }) => {
  await page.goto("/coach");
  await page.locator('a[href="/coach/athletes/sofia/messagerie"]').click();
  await expect(page).toHaveURL(/\/coach\/athletes\/sofia\/messagerie$/);
  await expect(page.getByRole("heading", { name: "Sofia Ruiz" })).toBeVisible();
});

test("dashboard : une séance non vue ouvre le panneau d'analyse dans le planning, puis se marque vue", async ({ page }) => {
  await page.goto("/coach");
  await expect(page.getByText("1 NOUVELLE")).toBeVisible();

  await page.getByRole("link", { name: "Analyser" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/lea\/planning\?seance=act1$/);
  await expect(page.getByRole("heading", { name: "10×400 m" })).toBeVisible();

  await page.getByRole("link", { name: "✕ Fermer" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/lea\/planning$/);

  await page.getByRole("link", { name: "Retour au tableau de bord" }).click();
  await expect(page).toHaveURL(/\/coach$/);
  await expect(page.getByText("Aucune nouvelle séance à regarder.")).toBeVisible();
});

test("dashboard : signale les athlètes sans séance planifiée la semaine prochaine", async ({ page }) => {
  await page.goto("/coach");
  const section = page.getByTestId("semaine-non-planifiee");
  await expect(section.getByText("Sofia Ruiz")).toBeVisible();
  await expect(section.getByText("Karim Benali")).toBeVisible();
  await expect(section.getByText("Tom Lefèvre")).toBeVisible();
  await expect(section.getByText("Léa Marchand")).not.toBeVisible();
});

test("sélecteur rapide d'athlète conserve l'onglet actif", async ({ page }) => {
  await page.goto("/coach/athletes/lea/planning");
  await page.locator('a[href="/coach/athletes/karim/planning"]').click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim\/planning$/);
});
