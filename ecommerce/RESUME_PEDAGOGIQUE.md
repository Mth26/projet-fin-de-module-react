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

## 6. Retour d'expérience personnel

### Ce que j'ai appris

**React + TypeScript** : Au début c'était un peu la galère avec les types, je comprenais pas pourquoi TypeScript me hurlait dessus pour un truc qui marchait très bien en JS. Mais au final ça m'a évité pas mal de bugs, genre quand j'oubliais une prop ou que je passais le mauvais type. Maintenant je vois vraiment l'intérêt.

**Context API** : J'avais entendu parler de Redux mais c'est compliqué. Le Context c'est plus simple et ça fait le taff pour un projet de cette taille. J'ai galéré un moment pour comprendre pourquoi mon panier se vidait au refresh (oui, le state React c'est pas persistant...) avant de comprendre qu'il fallait refetch depuis l'API.

**Chakra UI v3** : C'était ma première fois avec Chakra. La v3 est différente des tutos qu'on trouve en ligne (v2), du coup j'ai dû souvent regarder la doc officielle. Par contre une fois qu'on comprend le système, c'est vraiment rapide pour faire une UI propre.

**Appels API avec Axios** : J'ai appris à gérer les headers d'authentification, les intercepteurs, et surtout à bien gérer les erreurs (try/catch partout). Le plus chiant c'était de comprendre pourquoi mes requêtes marchaient pas - souvent c'était des problèmes de CORS ou de token mal envoyé.

### Retour sur les concepts clés du module

**CSR vs SSR** : Avant ce projet, je savais pas vraiment la différence. Maintenant je comprends que le CSR (ce qu'on fait avec React/Vite) c'est le navigateur qui fait tout le boulot - il reçoit une page quasi vide et JavaScript construit l'interface. L'avantage c'est que c'est super fluide une fois chargé, par contre le premier affichage est lent et c'est pas ouf pour le SEO. Si je devais faire un site vitrine ou un blog, je partirais sur du SSR avec Next.js par exemple.

**Les verbes HTTP** : Au début je faisais tout en GET ou POST sans trop réfléchir. Maintenant je comprends que chaque verbe a un sens : GET pour lire, POST pour créer, PUT/PATCH pour modifier, DELETE pour supprimer. C'est pas juste une convention, ça permet de comprendre ce que fait une route juste en regardant la requête. Dans mon projet j'utilise GET pour récupérer le panier, POST pour ajouter un produit, DELETE pour le vider.

**DNS et noms de domaine** : J'avoue que c'est le truc que j'ai le moins pratiqué concrètement dans ce projet (on est en localhost). Mais j'ai compris le principe : quand on tape une URL, le DNS c'est comme un annuaire qui traduit le nom en adresse IP. Les enregistrements A, CNAME, MX... c'est encore un peu flou mais je vois l'idée générale. Si je devais déployer mon site, je devrais configurer tout ça.

**Monolithe vs Microservices** : L'API qu'on utilise c'est du monolithe - tout est dans un seul serveur Node.js. C'est simple et ça marche bien pour un petit projet. Mais je comprends que pour une vraie appli e-commerce genre Amazon, on découperait en plusieurs services (un pour les users, un pour les produits, un pour le panier...) comme ça si un service plante, les autres continuent. Par contre c'est beaucoup plus complexe à gérer.

**Git & SemVer** : Git enregistre l’historique dans des commits, on travaille en branches, on utilise des PR pour relire avant fusion.

Système de numérotation des versions logicielles sous la forme `MAJOR.MINOR.PATCH`.

SemVer = MAJOR.MINOR.PATCH
MAJOR : breaking changes
MINOR : nouvelles fonctionnalités sans rupture
PATCH : Corrections de bugs rétrocompatibles

### Les difficultés rencontrées

- **L'auth avec JWT** : Comprendre le flow token/refresh, comment le stocker, quand le renvoyer... ça m'a pris du temps.
- **TypeScript strict** : Des fois je castais en `any` par flemme, mais après ça m'a créé des bugs. Maintenant j'essaie de typer correctement.
- **Gestion du state** : Savoir quand utiliser useState vs useContext vs juste passer en props. Y'a pas de réponse unique.

### Ce que je ferais différemment

Si je refaisais ce projet :

- Je structurerais mieux mes dossiers dès le début (j'ai un peu tout mis en vrac au départ)
- J'utiliserais peut-être React Query pour la gestion du cache des requêtes API
- Je ferais des tests unitaires (j'en ai pas fait, manque de temps)

### Conclusion

Ce projet m'a permis de vraiment comprendre comment fonctionne une app React moderne de A à Z. C'est pas parfait mais c'est fonctionnel et j'ai appris plein de trucs. Le plus important c'est que maintenant je me sens capable de refaire un projet similaire sans trop galérer.

---

_Projet réalisé dans le cadre du module React & TypeScript - Mars 2026_
