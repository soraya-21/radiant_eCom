# Changelog - Radiant Skincare App

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
