# Radiant E-Commerce

> Plateforme e-commerce haut de gamme pour soins de la peau et parfums de luxe

[![Backend](https://img.shields.io/badge/Backend-Django_REST_API-green?logo=django)](https://radiant-ecom-backend.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-React_19-blue?logo=react)](https://radiant-ecom.netlify.app)
[![Status](https://img.shields.io/badge/Status-Production-success)]()
[![License](https://img.shields.io/badge/License-MIT-blue)]()

## Table des matières

- [Démo en Production](#démo-en-production)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Stack Technologique](#stack-technologique)
- [Documentation](#documentation)
- [Installation Locale](#installation-locale)
- [Déploiement](#déploiement)
- [Gestion des Accès](#gestion-des-accès)
- [Contribuer](#contribuer)

---

## Démo en Production

### Environnements Live

| Service | URL |
|---------|-----|
| **Frontend** | https://radiant-ecom-front.netlify.app/ |
| **Backend API** | https://radiant-ecom-backend.onrender.com |
| **ReDoc** | https://radiant-ecom-backend.onrender.com/api/redoc |
| **OpenAPI Schema** | https://radiant-ecom-backend.onrender.com/api/schema/ |

### Comptes de Test

```
Email: test@radiant.com
Mot de passe: TestPass123!

Carte Stripe (test): 4242 4242 4242 4242
Expiration: 12/26 | CVC: 123
```

---

## Fonctionnalités

### Authentification & Sécurité
- JSON Web Tokens (JWT) avec accès et refresh tokens
- CORS configurée pour HTTPS en production
- CSRF Protection sauf webhooks validés
- Signature Stripe validée côté serveur
- Filtrage des données par utilisateur (object-level)
- Logging complet des événements sensibles

### Panier & Commandes
- Panier persistant avec Context API + localStorage
- Synchronisation panier avec Redis (optionnel)
- Historique des commandes (Dashboard utilisateur)
- Statuts de paiement en temps réel

### Paiement
- Intégration Stripe Checkout
- Webhooks pour confirmation de paiement
- Support des cartes de crédit et moyens de paiement alternatifs
- Création automatique de sessions Stripe

### Catalogue
- Produits avec images Cloudinary optimisées
- Catégories et filtrage
- Gestion via admin Django

### UI/UX
- Design minimaliste luxueux avec Tailwind CSS
- Thème sombre/clair avec Context API
- Interface responsive (mobile-first)
- Notifications Toast en temps réel
- Page d'erreur et loading states

---

## Architecture

```
┌─────────────────────────────────────────────┐
│         Frontend (React 19 + Vite)          │
│   Netlify | Theme Context | Cart Context    │
└──────────────────┬──────────────────────────┘
                   │ HTTP/REST(JWT)
                   │
┌──────────────────▼──────────────────────────┐
│    Backend API (Django REST Framework)      │
│   DRF | JWT Auth | Swagger/OpenAPI Docs    │
└──────────────────┬──────────────────────────┘
        │          │          │
   PostgreSQL    Redis      Stripe
   (Render)   (Render KV)   (Webhooks)
```

---

## Stack Technologique

### Backend

| Composant | Version | Rôle |
|-----------|---------|------|
| Django | 6.0.2 | Framework web |
| Django REST Framework | 3.14.0 | API REST |
| djangorestframework-simplejwt | 5.3.2 | JWT Auth |
| PostgreSQL | 15 | Base de données |
| Redis | 7 | Cache/Sessions |
| drf-spectacular | 0.29.0 | Swagger/OpenAPI |
| Stripe | 8.8.0 | Paiements |

### Frontend

| Composant | Version | Rôle |
|-----------|---------|------|
| React | 19.2.0 | Librairie UI |
| React Router | 7.13.0 | Routage SPA |
| Vite | 7.3.1 | Build tool |
| Tailwind CSS | 4.2.0 | Styling |
| Axios | 1.13.5 | HTTP Client |
| Stripe JS | 8.8.0 | Intégration Stripe |

---

## Documentation

### Documentation Complète

- [Documentation Technique Complète](./DOCUMENTATION_TECHNIQUE.md)
- [Changelog (Historique des versions)](./CHANGELOG.md)

### Documentation API

**Accès au Swagger (OpenAPI) :**
- **Production Swagger:** https://radiant-ecom-backend.onrender.com/api/schema/
- **Production ReDoc:** https://radiant-ecom-backend.onrender.com/api/schema/redoc/
- **Local Swagger:** http://localhost:8000/api/schema/
- **Local ReDoc:** http://localhost:8000/api/schema/redoc/

### Sections Clés

1. Authentification JWT
2. Gestion Complète des Accès (CORS, CSRF, Permission Classes)
3. Intégration stripe & webhooks
4. Déploiement & Infrastructure
5. Sécurité (Best-practices + recommandations)

---

## Installation Locale

### Prérequis

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (optionnel)
- Redis 7+ (optionnel)

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Accès

- Frontend: http://localhost:5173
- Backend: http://localhost:8000/api
- Admin: http://localhost:8000/admin
- Swagger: http://localhost:8000/api/schema/ 

---

## Déploiement

### Backend (Render)

```
Build: pip install -r requirements.txt && python manage.py migrate
Start: gunicorn core.wsgi:application --bind 0.0.0.0:$PORT

Env:
- DEBUG=False
- DATABASE_URL=<provided>
- REDIS_URL=<provided>
- STRIPE_SECRET_KEY=sk_live_...
- STRIPE_WEBHOOK_SECRET=whsec_live_...
- SITE_URL=https://radiant-ecom.netlify.app
```

### Frontend (Netlify)

```
Build: npm run build
Publish: dist/

Env:
- VITE_API_URL=https://radiant-ecom-backend.onrender.com/api
- VITE_API_MEDIA_URL=https://radiant-ecom-backend.onrender.com
- VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

---

## Gestion des Accès

Le projet implémente 6 couches de sécurité :

1. **CORS** - Whitelist d'origines
2. **CSRF** - Token sécurisé
3. **JWT** - Authentification
4. **Permission Classes** - Contrôle d'accès
5. **Object Filtering** - Isolation par user
6. **Webhook Validation** - Signature Stripe

**Endpoints Publics:**
- `POST /api/token/` - Login
- `POST /api/accounts/register/` - Inscription
- `GET /api/products/` - Produits

**Endpoints Protégés (JWT):**
- `POST /api/orders/create/` - Commande
- `GET /api/orders/my-orders/` - Historique

Voir [Documentation Complète](./DOCUMENTATION_TECHNIQUE.md#gestion-complète-des-accès) pour plus de détails.

---

## Contribuer

```bash
git checkout -b feature/awesome
git commit -m "feat: description"
git push origin feature/awesome
```

Code style: PEP-8 (backend), ESLint (frontend)

---

## Ressources

- [Swagger Live](https://radiant-ecom-backend.onrender.com/api/schema/ )
- [Documentation Complète](./DOCUMENTATION_TECHNIQUE.md)
- [Changelog](./CHANGELOG.md)
- [Django Docs](https://docs.djangoproject.com/)
- [React Docs](https://react.dev/)
- [Stripe Docs](https://stripe.com/docs)

---

**Version:** 1.0.0  
**Statut:** Production  

**Dernière mise à jour:** Février 2026

