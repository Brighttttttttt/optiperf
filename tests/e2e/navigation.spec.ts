import { expect, test, type Page } from "@playwright/test";

function ligne(page: Page, nom: string) {
  return page.getByTestId("ligne-athlete").filter({ hasText: nom });
}

test("parcours coach : login → dashboard → planning de l'athlète cliqué", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Entrer comme coach" }).click();
  await expect(page).toHaveURL(/\/coach$/);

  await ligne(page, "Léa Marchand").getByRole("link", { name: "Ouvrir le planning de Léa Marchand" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/lea\/planning$/);
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

test("dashboard : les 4 boutons d'un athlète mènent à ses 4 pages", async ({ page }) => {
  const cibles = [
    ["Fiche de Karim Benali", /\/coach\/athletes\/karim$/],
    ["Planning de Karim Benali", /\/coach\/athletes\/karim\/planning$/],
    ["Historique de Karim Benali", /\/coach\/athletes\/karim\/historique$/],
    ["Messagerie avec Karim Benali", /\/coach\/athletes\/karim\/messagerie$/]
  ] as const;

  for (const [bouton, url] of cibles) {
    await page.goto("/coach");
    await ligne(page, "Karim Benali").getByRole("link", { name: bouton, exact: true }).click();
    await expect(page).toHaveURL(url);
  }
});

test("dashboard : la charge de chaque athlète est affichée", async ({ page }) => {
  await page.goto("/coach");
  await expect(ligne(page, "Karim Benali").getByText("ÉLEVÉE")).toBeVisible();
  await expect(ligne(page, "Tom Lefèvre").getByText("FAIBLE")).toBeVisible();
  await expect(ligne(page, "Léa Marchand").getByText("NORMALE")).toBeVisible();
});

test("page athlète : les 4 onglets sont accessibles entre eux, avec retour au dashboard", async ({ page }) => {
  await page.goto("/coach/athletes/karim");
  await expect(page.getByRole("heading", { name: "Karim Benali" })).toBeVisible();

  const onglets = page.getByRole("navigation");
  await onglets.getByRole("link", { name: "Planning" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim\/planning$/);

  await onglets.getByRole("link", { name: "Historique" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim\/historique$/);
  await expect(page.getByTestId("historique-seances")).toBeVisible();

  await onglets.getByRole("link", { name: "Messagerie" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim\/messagerie$/);

  await onglets.getByRole("link", { name: "Fiche" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim$/);

  await page.getByRole("link", { name: "Retour au tableau de bord" }).click();
  await expect(page).toHaveURL(/\/coach$/);
});

test("sélecteur rapide d'athlète conserve l'onglet actif", async ({ page }) => {
  await page.goto("/coach/athletes/lea/planning");
  await page.locator('a[href="/coach/athletes/karim/planning"]').click();
  await expect(page).toHaveURL(/\/coach\/athletes\/karim\/planning$/);
});

test("en-tête : la messagerie globale liste les conversations, la plus récente d'abord", async ({ page }) => {
  await page.goto("/coach");
  await page.getByRole("link", { name: /^Messagerie — 3 non lus$/ }).click();
  await expect(page).toHaveURL(/\/coach\/messagerie$/);

  const noms = await page.getByTestId("conversations").getByRole("link").allInnerTexts();
  expect(noms[0]).toContain("Léa Marchand");
  expect(noms[noms.length - 1]).toContain("Karim Benali");

  await page.getByTestId("conversations").getByRole("link", { name: /Sofia Ruiz/ }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/sofia\/messagerie$/);
  await expect(page.getByRole("heading", { name: "Sofia Ruiz" })).toBeVisible();
});

test("en-tête : les notifications listent les tâches du coach et mènent à l'action", async ({ page }) => {
  await page.goto("/coach");
  await page.getByRole("link", { name: /^Notifications — 8 à traiter$/ }).click();
  await expect(page).toHaveURL(/\/coach\/notifications$/);

  const notifs = page.getByTestId("notifications");
  await expect(notifs.getByText("Séances à analyser")).toBeVisible();
  await expect(notifs.getByText("Messages reçus")).toBeVisible();
  await expect(notifs.getByText("Semaines à planifier")).toBeVisible();
  await expect(notifs.getByText("Objectifs en approche")).toBeVisible();

  // Une séance à analyser ouvre le planning avec le panneau déjà ouvert.
  await notifs.getByRole("link").first().click();
  await expect(page).toHaveURL(/\/coach\/athletes\/lea\/planning\?seance=act1$/);
  await expect(page.getByRole("heading", { name: "10×400 m" })).toBeVisible();

  // Une fois vue, la séance ne compte plus dans les notifications.
  await page.getByRole("link", { name: "✕ Fermer" }).click();
  await expect(page).toHaveURL(/\/coach\/athletes\/lea\/planning$/);
  await expect(page.getByRole("link", { name: /^Notifications — 7 à traiter$/ })).toBeVisible();
});

test.describe("affichage mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("le dashboard reste lisible et ne déborde pas horizontalement", async ({ page }) => {
    await page.goto("/coach");

    const debordement = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(debordement).toBeLessThanOrEqual(1);

    // Les métriques sont annotées de leur libellé quand l'en-tête de tableau est masqué.
    const lea = ligne(page, "Léa Marchand");
    await expect(lea.getByText("Volume semaine")).toBeVisible();
    await expect(lea.getByText("Charge")).toBeVisible();
    await expect(lea.getByRole("link", { name: "Historique de Léa Marchand" })).toBeVisible();
  });
});
