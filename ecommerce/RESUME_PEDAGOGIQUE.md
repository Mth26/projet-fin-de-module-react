# Résumé Pédagogique - Projet E-Commerce

## 1. CSR vs SSR (Client-Side Rendering vs Server-Side Rendering)

### Client-Side Rendering (CSR)

C'est l'approche utilisée dans ce projet avec React.

**Fonctionnement :**

1. Le serveur envoie une page HTML quasi-vide
2. Le navigateur télécharge le JavaScript (React)
3. JavaScript construit l'interface dans le navigateur
4. Les données sont récupérées via des appels API (fetch/axios)

**Avantages :**

- Navigation fluide (pas de rechargement de page)
- Expérience utilisateur interactive
- Moins de charge sur le serveur

**Inconvénients :**

- Premier affichage plus lent (téléchargement du JS)
- SEO moins optimal (Google voit une page vide initialement)

### Server-Side Rendering (SSR)

**Fonctionnement :**

1. Le serveur génère le HTML complet avec les données
2. Le navigateur affiche directement le contenu
3. JavaScript "hydrate" la page pour la rendre interactive

**Avantages :**

- Affichage initial plus rapide
- Meilleur SEO (contenu visible immédiatement)

**Inconvénients :**

- Plus de charge serveur
- Navigation moins fluide

**Frameworks SSR :** Next.js, Nuxt.js, Remix

---

## 2. Les verbes HTTP

HTTP (HyperText Transfer Protocol) définit des "verbes" pour indiquer l'action souhaitée sur une ressource.

| Verbe      | Action                 | Idempotent | Exemple dans le projet                       |
| ---------- | ---------------------- | ---------- | -------------------------------------------- |
| **GET**    | Lire/Récupérer         | Oui        | `GET /api/products` - Liste des produits     |
| **POST**   | Créer                  | Non        | `POST /api/users/signin` - Connexion         |
| **PUT**    | Remplacer entièrement  | Oui        | `PUT /api/users/1` - Modifier un utilisateur |
| **PATCH**  | Modifier partiellement | Oui        | Modifier juste le nom                        |
| **DELETE** | Supprimer              | Oui        | `DELETE /api/carts/1/products/2`             |

### Idempotent ?

Une requête est **idempotente** si l'exécuter plusieurs fois donne le même résultat.

- `GET /products` → toujours la même liste (idempotent)
- `POST /users` → crée un nouvel utilisateur à chaque fois (non idempotent)

### Codes de réponse HTTP

| Code | Signification | Exemple                 |
| ---- | ------------- | ----------------------- |
| 200  | OK            | Requête réussie         |
| 201  | Created       | Utilisateur créé        |
| 400  | Bad Request   | Données invalides       |
| 401  | Unauthorized  | Token manquant/invalide |
| 404  | Not Found     | Produit inexistant      |
| 500  | Server Error  | Erreur côté serveur     |

---

## 3. DNS et fonctionnement d'un nom de domaine

### Qu'est-ce que le DNS ?

**DNS** (Domain Name System) est le "annuaire" d'Internet. Il traduit les noms de domaine (ex: `google.com`) en adresses IP (ex: `142.250.179.110`).

### Fonctionnement étape par étape

```
1. Tu tapes "www.monsite.com" dans le navigateur
              │
              ▼
2. Le navigateur demande au serveur DNS : "C'est quoi l'IP de monsite.com ?"
              │
              ▼
3. Le DNS répond : "C'est 93.184.216.34"
              │
              ▼
4. Le navigateur se connecte à 93.184.216.34
              │
              ▼
5. Le serveur web renvoie la page HTML
```

### Hiérarchie DNS

```
                    . (racine)
                       │
         ┌─────────────┼─────────────┐
         │             │             │
        .com          .fr          .org
         │             │
    ┌────┴────┐       │
    │         │       │
  google   amazon   gouv
    │
   www
```

### Types d'enregistrements DNS

| Type  | Usage                       | Exemple                       |
| ----- | --------------------------- | ----------------------------- |
| A     | Pointe vers une IPv4        | monsite.com → 93.184.216.34   |
| AAAA  | Pointe vers une IPv6        | monsite.com → 2001:db8::1     |
| CNAME | Alias vers un autre domaine | www.monsite.com → monsite.com |
| MX    | Serveurs de mail            | mail.monsite.com              |

---

## 4. Architecture Microservices vs Monolithique

### Architecture Monolithique

**Définition :** Une seule application contient toute la logique (front, back, base de données).

```
┌─────────────────────────────────┐
│         APPLICATION             │
│  ┌─────┐ ┌─────┐ ┌─────────┐   │
│  │ UI  │ │ API │ │ Database│   │
│  └─────┘ └─────┘ └─────────┘   │
└─────────────────────────────────┘
```

**Avantages :**

- Simple à développer et déployer au début
- Moins de complexité réseau
- Debugging plus facile

**Inconvénients :**

- Difficile à scaler (tout ou rien)
- Un bug peut bloquer toute l'application
- Technologies figées

### Architecture Microservices

**Définition :** L'application est découpée en petits services indépendants.

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Service  │  │ Service  │  │ Service  │
│  Users   │  │ Products │  │  Cart    │
│   :3001  │  │   :3002  │  │   :3003  │
└────┬─────┘  └────┬─────┘  └────┬─────┘
     │             │             │
     └─────────────┼─────────────┘
                   │
            ┌──────┴──────┐
            │  API Gateway │
            │    :8080     │
            └─────────────┘
```

**Avantages :**

- Scalabilité indépendante (scaler juste le service Users si besoin)
- Technologies variées possibles (Node, Python, Go...)
- Équipes autonomes

**Inconvénients :**

- Complexité accrue
- Communication réseau (latence)
- Debugging plus difficile

### Ce projet

Ce projet utilise une **architecture simple** avec :

- Un front-end React (CSR)
- Une API monolithique Node.js

Pour un projet plus grand, on pourrait découper l'API en microservices.

---

## 5. Semver et Git

### Semver (Semantic Versioning)

Format : **MAJOR.MINOR.PATCH** (ex: `2.4.1`)

| Partie | Quand l'incrémenter                          | Exemple       |
| ------ | -------------------------------------------- | ------------- |
| MAJOR  | Changements incompatibles (breaking changes) | 1.0.0 → 2.0.0 |
| MINOR  | Nouvelles fonctionnalités rétrocompatibles   | 2.0.0 → 2.1.0 |
| PATCH  | Corrections de bugs                          | 2.1.0 → 2.1.1 |

**Exemples dans `package.json` :**

```json
"dependencies": {
  "react": "^18.2.0",    // ^ = accepte 18.x.x (minor + patch)
  "axios": "~1.6.0",     // ~ = accepte 1.6.x (patch uniquement)
  "chakra-ui": "3.0.0"   // exact = uniquement cette version
}
```

### Git - Commandes essentielles

```bash
# Initialiser un repo
git init

# Cloner un repo distant
git clone https://github.com/user/repo.git

# Voir l'état des fichiers
git status

# Ajouter des fichiers au staging
git add .                    # tous les fichiers
git add src/App.tsx          # un fichier spécifique

# Créer un commit
git commit -m "Ajout de la page login"

# Envoyer vers le repo distant
git push origin main

# Récupérer les changements distants
git pull origin main

# Créer une branche
git checkout -b feature/login

# Fusionner une branche
git merge feature/login
```

### Workflow Git typique

```
main ─────●─────────────●─────────────●───────
          │             │             │
          │  feature/   │             │
          └──●──●──●────┘ (merge)     │
                                      │
                        feature/      │
                        └──●──●───────┘ (merge)
```

---

## Ce que j'ai appris dans ce projet

1. **React + TypeScript** : Créer une application moderne avec typage fort
2. **API REST** : Communiquer avec un serveur via HTTP (GET, POST, DELETE)
3. **JWT** : Authentifier les utilisateurs de manière sécurisée
4. **Context API** : Gérer l'état global sans Redux
5. **Chakra UI** : Construire une interface responsive et accessible
6. **Git** : Versionner mon code et collaborer

---

_Projet réalisé dans le cadre du module React & TypeScript - Mars 2026_
