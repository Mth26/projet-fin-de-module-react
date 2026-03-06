/*### Test E2E 1 – Affichage des produits (Home)

Objectif :

Vérifier que la page d’accueil affiche les produits.*/

import { test, expect } from '@playwright/test';

test('affiche les produits sur la page d accueil', async ({ page }) => {
    await page.goto('http://localhost:5173/'); 
    await expect(page.getByText('Dernière sortie')).toBeVisible();
});

/* ### Test E2E 2 – Navigation vers détail produit

Objectif :

Tester la navigation.

Scénario utilisateur :

- Ouvrir homepage
- Cliquer sur "Voir le détail"
- Vérifier que la page produit apparaît */

test('navigue vers la page de detail du produit', async ({ page }) => {
    await page.goto('http://localhost:5173/'); 
    await page.getByRole('link', { name: 'Nos stylos' }).first().click();
    await expect(page).toHaveURL(/products/);
});
