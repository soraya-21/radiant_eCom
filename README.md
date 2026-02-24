🍯 Radiant Skincare - E-commerce
Radiant est une plateforme e-commerce haut de gamme spécialisée dans les soins de la peau et les parfums. Le projet utilise une architecture découplée avec un backend robuste en Django et un frontend dynamique en React.

Fonctionnalités
Authentification Sécurisée : JWT (JSON Web Tokens) pour la gestion des sessions utilisateurs.

Catalogue Dynamique : Gestion des produits, catégories et stocks via l'admin Django.

Panier Persistant : Gestion fluide du panier d'achat avec React Context API.

Paiement Stripe : Intégration complète de Stripe Checkout avec validation par Webhooks.

Dashboard Utilisateur : Historique des commandes et suivi du statut de paiement (PENDING, PAID).

Infrastructure Cloud : Déploiement automatisé sur Render (Backend) et Netlify (Frontend).

Stack Technique
Backend
Framework : Django & Django REST Framework (DRF)

Base de données : PostgreSQL (Managée par Render)

Cache/Sessions : Redis (Render Key-Value)

Paiement : Stripe API

Frontend
Librairie : React (Vite.js)

Styling : Tailwind CSS (Design minimaliste et luxueux)

Routage : React Router DOM

Installation et Lancement (Local)
1. Backend
Bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
2. Frontend
Bash
cd frontend
npm install
npm run dev
🌐 Déploiement
Backend (Render)
Le backend est containerisé via Docker.

Les migrations et la création du super-utilisateur sont automatisées au build.

Variables d'environnement nécessaires : STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, DATABASE_URL, REDIS_URL.

Frontend (Netlify)
Déploiement continu via la branche main.

Configuration des redirections via le fichier _redirects pour le support des SPAs.

Variables d'environnement nécessaires : VITE_API_URL, VITE_API_MEDIA_URL.