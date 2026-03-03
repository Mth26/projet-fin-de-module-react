# E-Commerce React - Projet Final

Application e-commerce complète développée avec React, TypeScript et Chakra UI.

![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Vite](https://img.shields.io/badge/Vite-5+-purple)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-v3-teal)

## Présentation du projet

Cette application est une boutique en ligne permettant aux utilisateurs de :

- Parcourir un catalogue de produits
- Rechercher des produits
- Voir le détail d'un produit
- S'inscrire et se connecter
- Ajouter des produits au panier
- Passer une commande

## Installation

### Prérequis

- Node.js 18+ installé
- npm ou yarn
- Git

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd ecommerce
```

### 2. Installer les dépendances du front-end

```bash
npm install
```

### 3. Cloner et lancer l'API

L'application nécessite une API backend pour fonctionner.

```bash
# Dans un autre dossier
git clone https://github.com/KennochaJilian/18_06_ecom api-ecommerce
cd api-ecommerce
npm install
node main.js
```

L'API sera accessible sur `http://localhost:8080`

### 4. Lancer l'application

```bash
# Retourner dans le dossier ecommerce
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (ou 5174 si 5173 est occupé)

### Identifiants de test

- **Email** : admin@example.com
- **Mot de passe** : admin123

## Architecture du projet

```
src/
├── components/         # Composants réutilisables
│   ├── Navbar.tsx      # Barre de navigation
│   ├── Footer.tsx      # Pied de page
│   └── Layout.tsx      # Layout principal (Navbar + contenu + Footer)
│
├── pages/              # Pages de l'application
│   ├── Home.tsx        # Page d'accueil
│   ├── Products.tsx    # Liste des produits
│   ├── ProductDetail.tsx # Détail d'un produit
│   ├── Categories.tsx  # Catégories
│   ├── Login.tsx       # Connexion
│   ├── Register.tsx    # Inscription
│   ├── Profile.tsx     # Profil utilisateur
│   ├── Cart.tsx        # Panier
│   └── Checkout.tsx    # Finalisation de commande
│
├── services/           # Appels API
│   ├── api.ts          # Configuration Axios
│   ├── auth.service.ts # Authentification
│   ├── product.service.ts # Produits
│   └── cart.service.ts # Panier
│
├── context/            # État global (Context API)
│   ├── AuthContext.tsx # Gestion de l'authentification
│   └── CartContext.tsx # Gestion du panier
│
├── types/              # Types TypeScript
│   └── index.ts        # Interfaces (User, Product, Cart...)
│
├── theme/              # Configuration Chakra UI
│   └── index.ts        # Thème personnalisé
│
├── router/             # Configuration React Router
│   └── index.tsx       # Routes de l'application
│
└── App.tsx             # Point d'entrée
```

## Choix techniques

### React + TypeScript

React est une bibliothèque JavaScript pour construire des interfaces utilisateur. TypeScript ajoute le typage statique, ce qui permet :

- De détecter les erreurs avant l'exécution
- D'avoir l'autocomplétion dans l'éditeur
- De documenter le code via les interfaces

### Vite

Vite est un outil de build moderne, plus rapide que Create React App grâce à :

- Le Hot Module Replacement (HMR) quasi-instantané
- Le bundling optimisé avec Rollup

### Chakra UI v3

Chakra UI est une librairie de composants accessible et personnalisable. J'ai choisi la v3 pour :

- Son système de design tokens
- Sa facilité de personnalisation (thème)
- Son approche "utility-first" avec les props de style

### React Router

Pour la navigation côté client (SPA - Single Page Application), permettant :

- Des transitions rapides sans rechargement de page
- La gestion de l'historique du navigateur
- Les routes dynamiques (`/products/:id`)

### Axios

Pour les requêtes HTTP vers l'API. Avantages :

- Intercepteurs pour gérer le token JWT automatiquement
- Gestion des erreurs simplifiée
- Support des requêtes annulables

### Context API

Pour l'état global (utilisateur connecté, panier). Choisi plutôt que Redux car :

- Intégré nativement à React
- Suffisant pour une application de cette taille
- Plus simple à mettre en place

## Fonctionnalités

### Authentification

- **Inscription** : POST `/api/users` puis auto-connexion
- **Connexion** : POST `/api/users/signin` → token JWT
- **Déconnexion** : Suppression du token localStorage

Le token JWT est stocké dans `localStorage` et automatiquement ajouté aux requêtes via un intercepteur Axios.

### Produits

- **Liste** : GET `/api/products` avec recherche optionnelle (`?search=`)
- **Détail** : GET `/api/products/:id`

### Panier

- **Récupération** : GET `/api/carts/user/:userId`
- **Ajout** : POST `/api/carts/:cartId/products/:productId`
- **Suppression** : DELETE `/api/carts/:cartId/products/:productId`

### Commande

La page Checkout permet de simuler une commande avec affichage d'une confirmation.

## Difficultés rencontrées

### 1. Adaptation aux noms de champs de l'API

L'API utilise des noms de champs spécifiques (`emailAddress` au lieu de `email`, `firstName` au lieu de `firstname`). J'ai dû adapter mes types TypeScript pour correspondre exactement à la structure de l'API.

### 2. Chakra UI v3

La version 3 de Chakra UI a changé beaucoup de choses par rapport à la v2 :

- Nouvelle syntaxe pour le thème (`createSystem`, `defineConfig`)
- Suppression de certaines props (comme `fallback` sur Image)
- ColorMode géré différemment

### 3. Gestion du token JWT

J'ai mis en place un intercepteur Axios qui :

- Ajoute automatiquement le token à chaque requête
- Redirige vers `/login` si le token expire (erreur 401)

### 4. État global du panier

Le panier devait être synchronisé entre l'API et l'interface. J'ai utilisé le Context API pour stocker l'état localement et le mettre à jour après chaque action.

## Scripts disponibles

```bash
npm run dev     # Lancer en développement
npm run build   # Construire pour la production
npm run preview # Prévisualiser le build
npm run lint    # Vérifier le code avec ESLint
```

## Technologies utilisées

| Technologie  | Version | Usage           |
| ------------ | ------- | --------------- |
| React        | 18+     | Bibliothèque UI |
| TypeScript   | 5+      | Typage statique |
| Vite         | 5+      | Build tool      |
| Chakra UI    | 3+      | Composants UI   |
| React Router | 6+      | Routing         |
| Axios        | 1+      | Requêtes HTTP   |

## Auteur

Projet réalisé dans le cadre du module React & TypeScript.

Date de rendu : 3 mars 2026
