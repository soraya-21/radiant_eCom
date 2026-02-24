# Changelog - Radiant Skincare App

## [1.9.1] - 2026-02-24
### Fix: Cloud_name Cloudinary non reconnu
- Reparation de la confusion entre key_name et cloud_name

## [1.9.0] - 2026-02-24
### Fix: Il fallait recharger les images en db à chaque nouveau deploiement
- Introduction de Cloudinary 

## [1.8.1] - 2026-02-24
### Fix: Conflit whitenoise et Cloudinary avec bootstrap.min.css.map

## [1.8.0] - 2026-02-24
### Fix: A chaque chargement du server, les images ne s'affichent plus
- integration de Cloudinary

## [1.7.0] - 2026-02-24
### Milestone
- **Full Integration :** Cycle complet de vente opérationnel (Panier -> Paiement -> Webhook -> Validation).
- **Production Ready :** Infrastructure Cloud (Netlify/Render/Stripe) stabilisée.

## [1.6.2] - 2026-02-24
### Fix: Image presente en db qui ne s'affiche pas en prod
- Changement de l'url de base (sans le /)
- Recharger l'image en db une fois que l'url est bonne

## [1.6.1]
### Fix: redirect page after stripe payment not good
- added /* /index.html   200 to public/redirects

## [1.6.0]
### Added: Categorie du produit (Dans products.models)

## [1.5.3]
### Feat: Hebergement redis sur render

## [1.5.2]
### Feat: Creation du SuperUser via le dockerfile

## [1.5.1]
### Fix
- Communiquer entre frontend et backend (Cors settings)

## [1.5.0] - 2026-02-24
### Deploiement du frontend sur Netlify

## [1.4.1] - 2026-02-24
### Deploiement sur Render
- Utilisation de whitenoise pour la gestion des static files

## [1.4.0] - 2026-02-24
### Deploiement du backend sur Render
- recuperation de l'URL_BASE from .env
- lancement du backend avec gunicorn

## [1.3.1] - 2026-02-24
### Fix
- **Panier (Frontend) :** Correction d'un bug provoquant le vidage du panier en boucle après un paiement réussi.
- **Navigation :** Implémentation de `window.history.replaceState` pour nettoyer l'URL des paramètres de succès (`?success=true`) immédiatement après traitement.
- **Stabilité :** Optimisation du cycle de vie du composant `CartProvider` pour garantir une exécution unique de la logique post-achat.

## [1.3.1] - 2026-02-24
### Fix: affichage des image des produits
- inclusion explicite du champ image dans le serailizer de l'app Product
- creation de volume radiant_media dans le docker-compose.yml
- appel via une url absolue dans le frontend

## [1.3.0] - 2026-02-24
### Creation d'un super utilisateur dans le backend pour l'ajout des produits en db

## [1.2.0] - 2026-02-23
### Added: Docker-compose for build
- Dockerfile dans le dossier Backend
- Dockerfile dans le dossier Frontend
- Docker-compose.yml pour lancer les deux apps

## [1.1.0] - 2026-02-23
### Feature: Automatic Order Tracking
- Mise en place de la redirection automatique Stripe -> Dashboard.
- Intégration de la logique de vidage de panier lors de la détection du paramètre ?success=true.
- Design épuré du Dashboard avec tableau détaillé des articles par commande.

## [1.0.0] - 2026-02-23
### Feature: Stripe Integration
- Ajout de la dépendance stripe au backend.
- Implémentation du flux Stripe Checkout Session.
- Gestion des redirections automatiques vers le dashboard après succès.
- Conversion automatique des prix en centimes pour la conformité API Stripe.

## [0.9.0] - 2026-02-23
### Backend Architecture
- Création des modèles Order et OrderItem avec intégrité référentielle.
- Implémentation du OrderSerializer avec support des relations imbriquées.
- Mise en place d'une vue transactionnelle pour la création sécurisée des commandes.

## [0.8.0] - 2026-02-23
### Added
- Création du composant Cart avec gestion des quantités.
- Implémentation de la fonction removeFromCart dans le Context global.
- Design du tunnel d'achat avec résumé de commande et frais de port offerts.

## [0.7.0] - 2026-02-23
### Added
- `AuthContext` pour la persistance de la session utilisateur.
- Navbar dynamique (Login/Logout/Dashboard).
- Page Dashboard pour l'affichage des commandes enregistrées en base de données.
- Protection des routes front-end.

## [0.6.0] - 2026-02-23
### Added
- Intégration de react-router-dom pour la navigation.
- Formulaire de connexion avec stockage local des tokens JWT.
- Formulaire d'inscription client stylisé.
- Logique de redirection post-authentification.

## [0.5.1] - 2026-02-23
###Fixed
- Migration vers Tailwind CSS v4.
- Installation du plugin @tailwindcss/postcss pour la compatibilité Vite.
- Mise à jour de la directive @import "tailwindcss" dans le CSS principal.

## [0.5.0] - 2026-02-23
### Added
- Initialisation du Frontend avec React 18 et Vite.
- Configuration de Tailwind CSS avec le thème "Indigo Luxury".
- Mise en place du client Axios avec intercepteur de tokens JWT.
- Premier composant de listing de produits connecté à l'API Django.

## [0.4.0] - 2026-02-23
### Added
- Configuration complète de SimpleJWT dans REST_FRAMEWORK.
- Support de l'authentification Bearer Token dans l'interface Swagger.
- Définition des permissions par défaut (IsAuthenticatedOrReadOnly).

## [0.3.0] - 2026-02-23
### Added
- Création manuelle de la base de données radiant_db et de l'utilisateur dédié dans PostgreSQL.

- Configuration des privilèges SQL pour permettre les migrations Django.

## [0.2.0] - 2026-02-23
### Added
- `RegisterSerializer` pour la création sécurisée d'utilisateurs.
- `RegisterView` pour l'endpoint d'inscription public.
- Intégration de `drf-spectacular` pour la documentation Swagger/OpenAPI.
- Configuration des URLs pour l'authentification JWT (Login/Refresh).

## [0.1.0] - 2026-02-23
### Added
- Initialisation du projet Django avec les apps `products`, `accounts` et `orders`.
- Modèle de données `Product` et `User` personnalisé.
- Configuration de l'environnement virtuel et des dépendances.
