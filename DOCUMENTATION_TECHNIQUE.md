# Documentation Technique - Radiant E-commerce

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Stack technique](#stack-technique)
4. [Structure du projet](#structure-du-projet)
5. [Modèles de données](#modèles-de-données)
6. [API REST](#api-rest)
7. [Installation locale](#installation-locale)
8. [Configuration](#configuration)
9. [Flux d'authentification](#flux-dauthentification)
10. [Gestion Complète des Accès](#gestion-complète-des-accès)
11. [Flux de paiement](#flux-de-paiement)
12. [Déploiement](#déploiement)
13. [Maintenance et monitoring](#maintenance-et-monitoring)

---

## Vue d'ensemble

**Radiant** est une plateforme e-commerce haut de gamme spécialisée dans les **soins de la peau et parfums premium**. 

### Caractéristiques principales
- **Authentification JWT** : Tokens sécurisés pour les utilisateurs
- **Panier persistant** : Synchronisation cross-device via Redis
- **Paiement Stripe** : Intégration complète avec Webhooks
- **Dashboard utilisateur** : Historique des commandes en temps réel
- **Admin panel Django** : Gestion complète du catalogue
- **UI luxueuse** : Design minimaliste avec Tailwind CSS

---

## Architecture

### Architecture générale (Découplée)

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT (Frontend)                   │
│              React 19 + React Router                │
│            Tailwind CSS + Context API               │
│          (Déploiement sur Netlify)                 │
└─────────────────────────────────────────────────────┘
                           │
                    HTTP/REST API
                           │
┌─────────────────────────────────────────────────────┐
│              API (Backend Django)                    │
│      Django REST Framework + JWT Simple             │
│         PostgreSQL + Redis Cache                    │
│          (Déploiement sur Render)                  │
└─────────────────────────────────────────────────────┘
        │                    │                    │
    PostgreSQL            Redis            Stripe API
    (Données)          (Sessions)         (Paiements)
```

---

## Stack technique

### Backend
| Composant | Version | Rôle |
|-----------|---------|------|
| **Django** | 5.0.2 | Framework web principal |
| **Django REST Framework** | 3.14.0 | API REST |
| **djangorestframework-simplejwt** | 5.3.1 | Authentification JWT |
| **PostgreSQL** | 15 | Base de données |
| **Redis** | 7 | Cache et sessions |
| **Stripe** | - | Paiements |
| **Cloudinary** | - | CDN pour images |
| **Gunicorn** | - | Serveur WSGI production |
| **drf-spectacular** | 0.29.0 | Documentation Swagger/OpenAPI |
| **Sentry SDK** | - | Error tracking |

### Frontend
| Composant | Version | Rôle |
|-----------|---------|------|
| **React** | 19.2.0 | Librairie UI |
| **React Router DOM** | 7.13.0 | Routage |
| **Vite** | 7.3.1 | Build tool (remplace Webpack) |
| **Tailwind CSS** | 4.2.0 | Styling utilitaire |
| **Axios** | 1.13.5 | Client HTTP |
| **Stripe JS** | 8.8.0 | Intégration Stripe |

---

## Structure du projet

```
radiant_eCom/
├── backend/                           # Django Backend
│   ├── core/                          # Configuration Django
│   │   ├── settings.py               # Paramètres Django
│   │   ├── urls.py                   # Routes principales
│   │   ├── wsgi.py                   # WSGI pour production
│   │   └── asgi.py                   # ASGI pour async
│   │
│   ├── accounts/                      # App Authentification
│   │   ├── models.py                 # Modèle User personnalisé
│   │   ├── views.py                  # Views (Register)
│   │   ├── serializers.py            # Sérializers
│   │   ├── urls.py                   # Routes /api/accounts/
│   │   └── migrations/               # Migrations BD
│   │
│   ├── products/                      # App Produits
│   │   ├── models.py                 # Modèle Product
│   │   ├── views.py                  # ProductViewSet (CRUD)
│   │   ├── serializers.py            # ProductSerializer
│   │   ├── urls.py                   # Routes /api/products/
│   │   └── migrations/               # Migrations BD
│   │
│   ├── orders/                        # App Commandes
│   │   ├── models.py                 # Order, OrderItem
│   │   ├── views.py                  # CreateOrder, MyOrders
│   │   ├── serializers.py            # OrderSerializer
│   │   ├── urls.py                   # Routes /api/orders/
│   │   └── migrations/               # Migrations BD
│   │
│   ├── media/                         # Stockage images locales
│   ├── requirements.txt               # Dependencies Python
│   ├── manage.py                      # CLI Django
│   ├── create_admin.py               # Script création admin
│   ├── db.sqlite3                    # BD dev (à ignorer)
│   └── Dockerfile                    # Container production
│
├── frontend/                          # React Frontend
│   ├── src/
│   │   ├── components/               # Composants React
│   │   │   ├── Home.jsx              # Page d'accueil
│   │   │   ├── Login.jsx             # Formulaire login
│   │   │   ├── Register.jsx          # Formulaire inscription
│   │   │   ├── ProductDetail.jsx     # Détail produit
│   │   │   └── Toast.jsx             # Notifications
│   │   │
│   │   ├── context/                  # Context API
│   │   │   ├── AuthContext.jsx       # Authentification
│   │   │   ├── CartContext.jsx       # Panier
│   │   │   ├── ThemeContext.jsx      # Mode jour/nuit
│   │   │   ├── Cart.jsx              # Page panier
│   │   │   └── Dashboard.jsx         # Historique commandes
│   │   │
│   │   ├── api.js                    # Client Axios configuré
│   │   ├── App.jsx                   # Composant racine
│   │   ├── main.jsx                  # Point d'entrée
│   │   ├── App.css                   # Styles globaux
│   │   └── index.css                 # Reset CSS
│   │
│   ├── public/
│   │   └── _redirects               # Redirections Netlify
│   ├── package.json                  # Dependencies Node
│   ├── vite.config.js                # Config Vite
│   ├── tailwind.config.js            # Config Tailwind
│   ├── postcss.config.js             # PostCSS plugins
│   ├── eslint.config.js              # Linting rules
│   └── Dockerfile                    # Container production
│
├── docker-compose.yml                 # Orchestration locale
├── README.md                          # Docs utilisateur
├── CHANGELOG.md                       # Versioning
└── DOCUMENTATION_TECHNIQUE.md         # Cette doc
```

---

## Modèles de données

### 1. Model: User (accounts.models)

Hérite de `AbstractUser` Django pour ajouter des champs personnalisés :

```python
class User(AbstractUser):
    email = models.EmailField(unique=True)  # Email unique
    is_vip = models.BooleanField(default=False)  # Statut VIP
    
    USERNAME_FIELD = 'email'  # Authentification par email
    REQUIRED_FIELDS = ['username']
```

**Champs hérités :** `username`, `first_name`, `last_name`, `is_staff`, `is_superuser`, née `date_joined`

---

### 2. Model: Product (products.models)

Représente un produit du catalogue :

```python
class Product(models.Model):
    CATEGORY_CHOICES = [
        ('perfume', 'Eau de Parfum'),
        ('skincare', 'Soin Visage'),
        ('body', 'Corps'),
    ]
    
    name = CharField(max_length=200)           # Nom du produit
    brand = CharField(max_length=100)          # Marque
    category = CharField(choices=CATEGORY_CHOICES)  # Catégorie
    description = TextField()                  # Description longue
    price = DecimalField(max_digits=10)        # Prix en €
    stock = IntegerField()                     # Nombre en stock
    image = ImageField(upload_to='perfumes/')  # Cloudinary/local
    image_url = URLField(null=True)            # URL externe
    created_at = DateTimeField(auto_now_add=True)  # Timestamp
```

**Méthodes :**
- `__str__()` : `"Elie Saab Le Parfum 90ml - 120.00€"`

---

### 3. Model: Order (orders.models)

Représente une commande :

```python
class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('paid', 'Payée'),
        ('shipped', 'Expédiée'),
    )
    
    user = ForeignKey(User, on_delete=CASCADE)  # Utilisateur
    created_at = DateTimeField(auto_now_add=True)  # Date
    total_amount = DecimalField()               # Montant total
    status = CharField(choices=STATUS_CHOICES)  # État
    payment_id = CharField(null=True)           # ID Stripe
    
    class Meta:
        ordering = ['-created_at']  # Dernières d'abord
```

---

### 4. Model: OrderItem (orders.models)

Représente une ligne de commande :

```python
class OrderItem(models.Model):
    order = ForeignKey(Order, on_delete=CASCADE)  # Commande parent
    product = ForeignKey(Product, on_delete=SET_NULL)  # Produit
    price = DecimalField()                         # Prix snapshot
    quantity = PositiveIntegerField()              # Quantité
```

#### Diagramme Entité-Relation

```
┌─────────────────────┐
│       User          │
│  ─────────────────  │
│  id (PK)            │
│  email              │
│  username           │
│  is_vip             │
│  password_hash      │
│  date_joined        │
└──────────┬──────────┘
           │
           │ 1:N
           │
┌──────────▼──────────┐
│       Order         │
│  ─────────────────  │
│  id (PK)            │
│  user_id (FK)       │
│  created_at         │
│  total_amount       │
│  status             │
│  payment_id         │
└──────────┬──────────┘
           │
           │ 1:N
           │
┌──────────▼──────────┐
│     OrderItem       │
│  ─────────────────  │
│  order_id (FK)      │
│  product_id (FK)    │
│  price              │
│  quantity           │
└─────────────────────┘
           │
           │ M:1
           │
┌──────────▼──────────┐
│      Product        │
│  ─────────────────  │
│  id (PK)            │
│  name               │
│  brand              │
│  category           │
│  price              │
│  stock              │
│  image_url          │
│  created_at         │
└─────────────────────┘
```

---

## API REST

### Documentation interactive

- **Swagger UI** : `GET /api/docs/`
- **ReDoc** : `GET /api/redoc/`
- **Schema OpenAPI** : `GET /api/schema/`

### Endpoints

#### 🔐 Authentification

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `POST` | `/api/auth/login/` | Obtenir tokens JWT | ❌ |
| `POST` | `/api/auth/refresh/` | Rafraîchir token | ❌ |

**POST `/api/auth/login/` - Login**

Request:
```json
{
  "email": "user@radiant.com",
  "password": "SecurePass123!"
}
```

Response (200):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

---

#### 👥 Comptes utilisateurs

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `POST` | `/api/accounts/register/` | Créer un compte | ❌ |

**POST `/api/accounts/register/` - Inscription**

Request:
```json
{
  "username": "marie_dupont",
  "email": "marie@radiant.com",
  "password": "SecurePass123!",
  "password2": "SecurePass123!"
}
```

Response (201):
```json
{
  "user": {
    "id": 42,
    "username": "marie_dupont",
    "email": "marie@radiant.com",
    "is_vip": false
  },
  "message": "Compte créé avec succès. Vous pouvez maintenant vous connecter."
}
```

---

#### 📦 Produits

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `GET` | `/api/products/` | Lister tous les produits | ❌ |
| `GET` | `/api/products/{id}/` | Détail d'un produit | ❌ |
| `POST` | `/api/products/` | Créer un produit | ✅ Admin |
| `PUT` | `/api/products/{id}/` | Modifier un produit | ✅ Admin |
| `DELETE` | `/api/products/{id}/` | Supprimer un produit | ✅ Admin |

**GET `/api/products/` - Lister**

Response (200):
```json
[
  {
    "id": 1,
    "name": "Elie Saab Le Parfum",
    "brand": "Elie Saab",
    "category": "perfume",
    "description": "Un parfum intense et sensuel...",
    "price": "120.00",
    "stock": 45,
    "image": "https://cloudinary.com/...",
    "image_url": "https://...",
    "created_at": "2026-01-15T10:30:00Z"
  }
]
```

---

#### 🛒 Commandes

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `POST` | `/api/orders/create/` | Créer une commande | ✅ |
| `GET` | `/api/orders/my-orders/` | Historique personnes | ✅ |
| `POST` | `/api/orders/sync-cart/` | Synchroniser panier | ✅ |
| `POST` | `/api/orders/webhook/` | Webhook Stripe | ❌ |

**POST `/api/orders/create/` - Créer commande**

Request:
```json
{
  "total": 240.50,
  "items": [
    {
      "product": 1,
      "product_name": "Elie Saab Le Parfum",
      "price": "120.00",
      "quantity": 2
    }
  ]
}
```

Response (201):
```json
{
  "stripe_url": "https://checkout.stripe.com/pay/cs_live_b1234567890..."
}
```

**GET `/api/orders/my-orders/` - Historique**

Response (200):
```json
[
  {
    "id": 1,
    "user": 42,
    "created_at": "2026-02-20T14:30:00Z",
    "total_amount": "240.50",
    "status": "paid",
    "payment_id": "pi_1234567890abcdef",
    "items": [
      {
        "order": 1,
        "product": 1,
        "price": "120.00",
        "quantity": 2
      }
    ]
  }
]
```

**POST `/api/orders/sync-cart/` - Persistance Redis**

Request:
```json
{
  "cart": [
    {
      "id": 1,
      "name": "Elie Saab Le Parfum",
      "price": 120,
      "quantity": 1,
      "image": "..."
    }
  ]
}
```

Response (200):
```json
{
  "status": "Panier synchronisé dans Redis"
}
```

---

## Installation locale

### Prérequis

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (ou utiliser `docker-compose`)
- Redis 7+ (ou utiliser `docker-compose`)
- Git
- Compte Stripe (pour la partie paiement)

### 1️⃣ Backend Django

```bash
# Naviguer dans le dossier backend
cd backend

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement
# Sous Linux/Mac :
source venv/bin/activate
# Sous Windows :
venv\Scripts\activate

# Installer les dependencies
pip install -r requirements.txt

# Créer le fichier .env
cat > .env << EOF
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/radiant_db
REDIS_URL=redis://localhost:6379/0
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_WEBHOOK_SECRET
SITE_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EOF

# Exécuter les migrations
python manage.py migrate

# Créer un super-utilisateur
python manage.py createsuperuser
# Email: admin@radiant.com
# Password: SecurePass123!

# Lancer le serveur
python manage.py runserver

# Serveur disponible sur http://localhost:8000
# Admin disponible sur http://localhost:8000/admin
```

### 2️⃣ Frontend React

```bash
# Naviguer dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Créer le fichier .env
cat > .env << EOF
VITE_API_URL=http://localhost:8000/api
VITE_API_MEDIA_URL=http://localhost:8000
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_PUBLIC_KEY
EOF

# Lancer le serveur de dev
npm run dev

# Frontend disponible sur http://localhost:5173
```

### 3️⃣ Docker Compose (Recommandé)

```bash
# À la racine du projet
docker-compose up -d

# Cela lance :
# - PostgreSQL sur :5432
# - Redis sur :6379
# - Backend Django sur :8000
# - Frontend Vite sur :3000
```

---

## Configuration

### Variables d'environnement (.env)

#### Backend

```env
# Django
DEBUG=False
SECRET_KEY=your-super-secure-key-change-this

# Base de données
DATABASE_URL=postgresql://user:pass@hostname:5432/radiant_db

# Redis (Cache & Sessions)
REDIS_URL=redis://host:6379/0

# Stripe
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_live_YOUR_WEBHOOK_SECRET

# Déploiement
SITE_URL=https://radiant-ecom.com
ALLOWED_HOSTS=radiant-ecom.com,www.radiant-ecom.com

# Cloudinary (CDN images)
CLOUDINARY_CLOUD_NAME=radiant-cloud
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

# Sentry (Error tracking)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

#### Frontend

```env
# API
VITE_API_URL=https://api.radiant-ecom.com/api
VITE_API_MEDIA_URL=https://api.radiant-ecom.com

# Stripe public key
VITE_STRIPE_PUBLIC_KEY=pk_live_YOUR_PUBLIC_KEY
```

### Django Settings (core/settings.py)

**Apps installées :**
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'import_export',          # Admin avancé
    'cloudinary_storage',     # CDN
    'cloudinary',
    'rest_framework',         # API REST
    'drf_spectacular',        # Swagger/OpenAPI
    'corsheaders',            # CORS
    'accounts',               # Auth app
    'products',               # Products app
    'orders',                 # Orders app
]
```

**Configuration JWT :**
```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
}
```

**CORS :**
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://radiant-ecom.netlify.app',
]
```

---

## Flux d'authentification

### Diagramme JWT

```
┌──────────────┐
│   Frontend   │
└──────┬───────┘
       │
       │ 1. POST /api/auth/login/
       │    { email, password }
       │
       ▼
┌──────────────────────┐
│  Backend (Django)    │
│  ──────────────────  │
│  1. Valider email    │
│  2. Hasher password  │
│  3. Générer tokens   │
│  ─ Access: 60 min    │
│  ─ Refresh: 7 jours  │
└──────┬───────────────┘
       │
       │ 2. Response: { access, refresh }
       │
       ▼
┌──────────────┐
│   Frontend   │
│ ──────────── │
│ localStorage │
│  .setItem(   │
│   'access',  │
│   token      │
│  )           │
└──────┬───────┘
       │
       │ 3. Requêtes API avec Bearer token
       │    Authorization: Bearer {access}
       │
       ▼
┌──────────────────────┐
│  Backend (Django)    │
│  ──────────────────  │
│  1. Valider signature│
│  2. Vérifier expiration
│  3. Servir ressource │
│     si token valide  │
└──────────────────────┘
```

### Fonctionnalités de sécurité

1. **Hashage password** : PBKDF2 (par défaut Django)
2. **JWT Signing** : HS256 avec SECRET_KEY
3. **Token expiration** : Access token expiré en 60 min
4. **Refresh token** : Valide 7 jours pour renouveler access
5. **CORS** : Whitelist des domaines autorisés

### Code Frontend (AuthContext.jsx)

```javascript
const login = async (email, password) => {
  const response = await api.post('auth/login/', { email, password });
  
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    
    // Configurer le header Authorization
    api.defaults.headers['Authorization'] = 
      `Bearer ${response.data.access}`;
    
    setUser({ email, authenticated: true });
  }
};

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setUser(null);
};
```

---

## Gestion Complète des Accès

### Vue d'ensemble

La sécurité de Radiant eCommerce repose sur plusieurs couches indépendantes :

```
┌──────────────────────────────────────────────────────────────┐
│                      REQUÊTE ENTRANTE                        │
└────────────────────┬─────────────────────────────────────────┘
                     │
        ┌────────────▼────────────────────┐
        │  1. CORS Middleware             │
        │  (Vérifier l'origine du site)   │
        │  OK/KO Access-Control-Allow-...  │
        └────────────┬────────────────────┘
                     │
        ┌────────────▼────────────────────┐
        │  2. CSRF Protection             │
        │  (X-CSRFToken ou jwt bypass)    │
        │  OK/KO CsrfViewMiddleware        │
        └────────────┬────────────────────┘
                     │
        ┌────────────▼────────────────────┐
        │  3. JWT Authentication          │
        │  (Bearer token validation)      │
        │  OK Extract user from token     │
        └────────────┬────────────────────┘
                     │
        ┌────────────▼────────────────────┐
        │  4. Permission Classes          │
        │  (IsAuthenticated, AllowAny)    │
        │  OK/KO @permission_classes       │
        └────────────┬────────────────────┘
                     │
        ┌────────────▼────────────────────┐
        │  5. Object-Level Filtering      │
        │  (get_queryset filter)          │
        │  OK Filter par user_id          │
        └────────────┬────────────────────┘
                     │
        ┌────────────▼────────────────────┐
        │  6. Business Logic Validation   │
        │  (Vérifications métier)         │
        │  OK/KO Custom checks             │
        └────────────┬────────────────────┘
                     │
                     ▼
        [OK ACCÈS ACCORDÉ] ou [KO ACCÈS REFUSÉ]
```

### 1. CORS (Cross-Origin Resource Sharing)

**Middleware:** `corsheaders.middleware.CorsMiddleware`  
**Rôle:** Autoriser/bloquer les requêtes selon l'origine

**Configuration dans settings.py:**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",                    # Dev local
    "http://127.0.0.1:5173",
    "https://radiant-ecom-front.netlify.app",  # Production
]

CORS_ALLOW_CREDENTIALS = True  # Autoriser credentials (cookies, auth)
```

**Comportement:**
```
Frontend supprime une requête DEPUIS:
  https://radiant-ecom-front.netlify.app
  
Browser ajoute header:
  Origin: https://radiant-ecom-front.netlify.app

Backend répond:
  OK Access-Control-Allow-Origin: https://radiant-ecom-front.netlify.app
  
Frontend reçoit réponse OK

---

Attaque potentielle DEPUIS:
  https://malicious-site.com
  
Browser envoie:
  Origin: https://malicious-site.com

Backend vérifie:
  KO https://malicious-site.com NOT IN CORS_ALLOWED_ORIGINS
  
Backend refuse = pas de header CORS
  
Browser BLOQUE la réponse (SOP violation)
  KO Pas d'accès
```

### 2. Authentification JWT

**Package:** `djangorestframework-simplejwt`  
**Classe:** `JWTAuthentication`

**Configuration dans settings.py:**
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),        # ⏱️ 1 jour
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),       # ⏱️ 7 jours
    'ALGORITHM': 'HS256',                              # Signature algo
    'SIGNING_KEY': SECRET_KEY,                         # Secret key
    'AUTH_HEADER_TYPES': ('Bearer',),                 # Format
}
```

**Endpoints JWT:**

```
📝 LOGIN
POST /api/token/
{
  "email": "user@radiant.com",
  "password": "SecurePass123!"
}

➜ 200 OK
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

---

REFRESH TOKEN
POST /api/token/refresh/
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

➜ 200 OK
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Contenu du Access Token (décodé):**
```json
{
  "token_type": "access",
  "exp": 1745020000,              // Timestamp expiration Unix
  "iat": 1744936000,              // Issued at (quand créé)
  "jti": "abc123def456",          // Unique JWT ID
  "user_id": 5,                   // ID utilisateur
}
```

**Utilisation dans les requêtes:**
```javascript
// Frontend - Axios interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Requête résultante
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Vérification dans le backend:**
```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    # request.user automatiquement extrait du JWT
    user = request.user
    orders = Order.objects.filter(user=user)
    return Response({'orders': orders})
```

### 3. Permission Classes (Autorisation)

**Options disponibles dans Django REST Framework:**

| Classe | Authentification | Autorise |
|--------|-----------------|----------|
| `AllowAny` | Non | Tous |
| `IsAuthenticated` | Oui | Users connectés |
| `IsAdminUser` | Oui | Staff admins |
| `IsAuthenticatedOrReadOnly` | Oui (POST/PUT/DELETE) | GET: tous, autres: auth |

**Implémentation par endpoint:**

```python
# REGISTER - Public
class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        # Pas de token requis

# CREATE ORDER - Authentifié
class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # JWT requis
        order = Order.objects.create(user=request.user, ...)

# MY ORDERS - Authentifié
class MyOrdersView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Retourne SEULEMENT les commandes de l'utilisateur
        return Order.objects.filter(user=self.request.user)

# PRODUCTS - Lecture publique
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    # GET: public
    # POST/PUT/DELETE: authentification requise
```

**Décorateurs pour views fonctionnelles:**

```python
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sync_cart(request):
    """Synchroniser le panier (user connecté seulement)"""
    cache.set(f"cart_{request.user.id}", request.data.get('cart'))
    return Response({"status": "ok"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    """Récupérer le panier (user connecté seulement)"""
    cart = cache.get(f"cart_{request.user.id}", [])
    return Response({"cart": cart})
```

### 4. CSRF Protection

**Middleware:** `django.middleware.csrf.CsrfViewMiddleware`  
**Rôle:** Prévenir les attaques CSRF (Cross-Site Request Forgery)

**Configuration:**
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ⚠️ Doit être AVANT CSRF
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',  # ← CSRF protection
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    ...
]

# Origines de confiance
CSRF_TRUSTED_ORIGINS = [
    "https://radiant-ecom-backend.onrender.com",
    "https://radiant-ecom-front.netlify.app"
]
```

**Contournement pour webhooks:**
```python
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # Webhook Stripe non-CSRF
def stripe_webhook(request):
    # À la place du CSRF, valider la signature Stripe
    event = stripe.Webhook.construct_event(
        payload, sig_header, endpoint_secret
    )
    # Le webhook est sécurisé par la signature, pas CSRF
```

### 5. Security Headers (HTTPS enforced)

**En production (DEBUG=False):**
```python
if not DEBUG:
    # Force HTTPS
    SECURE_SSL_REDIRECT = True
    
    # Proxy headers (Render/load-balancer)
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    
    # Cookies sécurisés
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    
    # HSTS (HTTP Strict Transport Security)
    SECURE_HSTS_SECONDS = 31536000  # 1 an
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
```

**Headers HTTP retournés:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

### 6. Webhook Stripe - Signature Validation

**Sécurité CRITIQUE pour les paiements:**

```python
import stripe
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET  # Env variable
    
    try:
        # Valider la signature Stripe réelle
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
        logger.info(f"OK Signature valide - Event: {event['type']}")
        
    except ValueError as e:
        # Invalid payload
        logger.error(f"Payload invalide: {str(e)}")
        return HttpResponse(status=400)
        
    except stripe.error.SignatureVerificationError as e:
        # FAUSSE SIGNATURE = ATTAQUE POTENTIELLE!
        logger.error(f"KO SIGNATURE INVALIDE - Attaque?: {str(e)}")
        return HttpResponse(status=400)
    
    # Traiter l'événement
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        order_id = session.get('metadata', {}).get('order_id')
        
        # Récupérer la commande
        order = Order.objects.get(id=order_id)
        order.status = 'paid'
        order.payment_id = session.get('payment_intent')
        order.save()
        
        logger.info(f"OK Commande {order.id} PAYÉE!")
    
    return HttpResponse(status=200)
```

**Configuration du webhook:**
```
Stripe Dashboard → Webhooks
├─ Endpoint URL: https://radiant-ecom-backend.onrender.com/api/orders/webhook/
├─ Events: checkout.session.completed
└─ Signing secret: whsec_... (copier dans env STRIPE_WEBHOOK_SECRET)
```

### 7. Logging & Audit

**Tous les événements sensibles sont loggés:**

```python
import logging
logger = logging.getLogger(__name__)

# Login
logger.info(f"OK User {user.email} connecté")
logger.warning(f"KO Tentative login failed: {email}")

# Commandes
logger.info(f"Order {order.id} created - Stripe: {session.id}")
logger.info(f"OK OK OK Order {order_id} PAID!")

# Sécurité
logger.error(f"KO INVALID SIGNATURE - Attack?: {str(e)}")
logger.warning(f"Unauthorized access attempt by {user.id}")
```

**Visible dans les logs Render:**
```
Render Dashboard → Service → Logs
├─ [Auth] User connected
├─ [Order] Order created
├─ [Stripe] OK Valid signature
├─ [Payment] OK OK OK Order PAID
└─ [Security] KO INVALID SIGNATURE
```

### 8. Matrice de Contrôle d'Accès

| Endpoint | Méthode | Auth | Permission | Public |
|----------|---------|------|-----------|--------|
| `/api/token/` | POST | Non | AllowAny | OK |
| `/api/token/refresh/` | POST | Non | AllowAny | OK |
| `/api/accounts/register/` | POST | Non | AllowAny | OK |
| `/api/products/` | GET | Non | AllowAny | OK |
| `/api/products/{id}/` | GET | Non | AllowAny | OK |
| `/api/orders/create/` | POST | OK JWT | IsAuthenticated | Non |
| `/api/orders/my-orders/` | GET | OK JWT | IsAuthenticated | Non |
| `/api/orders/sync-cart/` | POST | OK JWT | IsAuthenticated | Non |
| `/api/orders/get-cart/` | GET | OK JWT | IsAuthenticated | Non |
| `/api/orders/webhook/` | POST | Non | Stripe Signature | OK |

### 9. Scénarios de Sécurité

**Scénario 1: Requête depuis un site non-autorisé (CORS)**
```javascript
// Site malveillant (https://attacker.com) tente d'accéder
fetch('https://radiant-ecom-backend.onrender.com/api/orders/my-orders/', {
  headers: { 'Authorization': 'Bearer stolen_token' }
})

// Browser envoie Origin header
Origin: https://attacker.com

// Backend refuse CORS
KO No Access-Control-Allow-Origin header

// Browser BLOQUE la réponse (SOP)
KO CORS error - Accès refusé
```

**Scénario 2: Faux webhook Stripe**
```bash
# Attaquant envoie fake webhook
curl -X POST https://radiant-ecom-backend.onrender.com/api/orders/webhook/ \
  -H "stripe-signature: invalid_signature_xyz" \
  -d '{"order_id": "5"}'

# Backend vérifie la signature
KO stripe.error.SignatureVerificationError

# Webhook REJETÉ
KO Commande NON marquée payée
KO Log: "KO INVALID SIGNATURE - Attack?"
```

**Scénario 3: Accès aux commandes d'un autre user**
```python
# User A (id=1) tente accéder commandes User B (id=2)
GET /api/orders/my-orders/?user_id=2
Authorization: Bearer {token_user_a}

# Backend - MyOrdersView.get_queryset()
def get_queryset(self):
    return Order.objects.filter(user=self.request.user)  # Filtre by User A

# Retourne SEULEMENT commandes User A
KO Commandes User B not accessible
```

**Scénario 4: Token JWT expiré**
```javascript
// Frontend détecte token expiré après 1 jour
const token = localStorage.getItem('access_token');
// Expiré depuis 2 heures ago

fetch('https://radiant-ecom-backend.onrender.com/api/orders/my-orders/', {
  headers: { 'Authorization': `Bearer ${expired_token}` }
})

// Backend valide signature et expiration
KO Token expired - 401 Unauthorized

// Frontend utilise refresh token
POST /api/token/refresh/
{ "refresh": refresh_token }

// Reçoit nouveau access token
OK 200 OK { "access": "new_token..." }

// Retry requête originale
OK Success
```

### 10. Bonnes Pratiques Implémentées

OK **JWT signés** avec SECRET_KEY unique  
OK **Expiration des tokens** (accès: 1 jour, refresh: 7 jours)  
OK **CORS restrictive** aux origines connues uniquement  
OK **Authentification obligatoire** pour opérations sensibles  
OK **Permission classes** pour autorisation fine  
OK **Filtrage par user** dans les querysets (object-level)  
OK **CSRF protection** sauf webhooks signés  
OK **HTTPS enforced** en production  
OK **Signature Stripe validée** côté serveur (no MITM)  
OK **Logging complet** de tous les événements sensibles  

### 11. Recommandations d'Amélioration

- **HTTPOnly Cookies** (au lieu de localStorage - XSS vulnerable)  
- **Rate limiting** sur endpoints sensibles (bruteforce protection)  
- **Two-Factor Authentication (2FA)**  
- **OAuth2 / Social login** (Google, GitHub, Apple)  
- **IP Whitelisting** pour certains endpoints  
- **Role-based access control (RBAC)** - Admin, Moderator, User  
- **Refresh token rotation** (security best-practice)  
- **Audit trail** dans base de données pour compliance  
- **Content Security Policy (CSP)** headers  
- **API Key** authentication pour mobile apps  

---

## Flux de paiement


### Architecture Stripe

```
┌──────────────────────────────────┐
│    Frontend (React)              │
│  ┌─────────────────────────────┐ │
│  │   Panier (CartContext)      │ │
│  │   - [Produits avec qty]     │ │
│  │   - Montant total           │ │
│  └──────┬──────────────────────┘ │
│         │                         │
│         │ 1. Cliquer "Passer      │
│         │    la commande"         │
│         │                         │
│         ▼                         │
│  ┌─────────────────────────────┐ │
│  │   POST /orders/create/      │ │
│  │   { items, total }          │ │
│  └──────┬──────────────────────┘ │
│         │                         │
└─────────┼─────────────────────────┘
          │
          │ 2. POST /orders/create/
          │
          ▼
┌──────────────────────────────────┐
│    Backend (Django)              │
│  ┌─────────────────────────────┐ │
│  │  CreateOrderView:           │ │
│  │  1. Créer Order en BD       │ │
│  │  2. Créer OrderItems        │ │
│  │  3. stripe.checkout.        │ │
│  │     Session.create()        │ │
│  └──────┬──────────────────────┘ │
│         │                         │
│         │ 3. Response:            │
│         │    { stripe_url }       │
│         │                         │
└─────────┼─────────────────────────┘
          │
          │ 4. Redirection vers Stripe
          │
          ▼
┌──────────────────────────────────┐
│    Stripe Checkout (Hosted)      │
│  ┌─────────────────────────────┐ │
│  │  Formulaire paiement        │ │
│  │  - Numéro CB                │ │
│  │  - Expiration               │ │
│  │  - CVC                      │ │
│  └──────┬──────────────────────┘ │
│         │                         │
│         │ 5. Traiter paiement     │
│         │                         │
└─────────┼─────────────────────────┘
          │
          ├─────────────┬────────────┐
          │             │            │
      Succès        Annulation    Erreur
          │             │            │
    Token valide   Redirect /cart  Retry
          │
          ▼
┌──────────────────────────────────┐
│    Webhook Stripe               │
│  ┌─────────────────────────────┐ │
│  │  POST /orders/webhook/      │ │
│  │  { type: 'charge.succeeded'}│ │
│  │  1. Vérifier signature      │ │
│  │  2. Mettre à jour Order     │ │
│  │     status='paid'           │ │
│  │  3. Mettre à jour stocks    │ │
│  └─────────────────────────────┘ │
└──────────────────────────────────┘
          │
          │ 6. Confirmation email
          │    Envoyer à user
          │
          ▼
┌──────────────────────────────────┐
│    Frontend (Dashboard)          │
│  ┌─────────────────────────────┐ │
│  │  GET /orders/my-orders/     │ │
│  │  Status: 'paid' ✅          │ │
│  └─────────────────────────────┘ │
└──────────────────────────────────┘
```

### Statuts de commande

| Status | Signification | Transition |
|--------|---------------|-----------|
| `pending` | En attente de paiement | → `paid` via webhook |
| `paid` | Paiement confirmé | → `shipped` manuelle |
| `shipped` | Expédiée | Terminal |

### Code Backend (orders/views.py - Créer commande)

```python
@transaction.atomic()
def post(self, request):
    """
    Crée une commande + session Stripe
    """
    data = request.data
    
    # 1. Créer la commande
    order = Order.objects.create(
        user=request.user,
        total_amount=data['total'],
        status='pending'
    )
    
    # 2. Créer les items
    line_items = []
    for item in data['items']:
        OrderItem.objects.create(
            order=order,
            product_id=item['product'],
            price=item['price'],
            quantity=item['quantity']
        )
        
        # Ajouter au checkout Stripe
        line_items.append({
            'price_data': {
                'currency': 'eur',
                'product_data': {
                    'name': item['product_name'],
                },
                'unit_amount': int(float(item['price']) * 100),
            },
            'quantity': item['quantity'],
        })
    
    # 3. Créer la session Stripe
    session = stripe.checkout.Session.create(
        customer_email=request.user.email,
        line_items=line_items,
        mode='payment',
        success_url=f"{SITE_URL}/dashboard?success=true",
        cancel_url=f"{SITE_URL}/cart?canceled=true",
        metadata={'order_id': str(order.id)}
    )
    
    # 4. Nettoyer le cache du panier
    cache.delete(f"cart_{request.user.id}")
    
    return Response({'stripe_url': session.url}, status=201)
```

### Webhook Stripe (Sécurisé)

Se déclenche pour les événements suivants :
- `charge.succeeded` → Mise à jour status='paid'
- `charge.refunded` → Remboursement
- `charge.failed` → Paiement échoué

**À implémenter :**
```python
@csrf_exempt
@api_view(['POST'])
def stripe_webhook(request):
    """
    Traite les webhooks Stripe avec validation signature
    """
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, 
            sig_header, 
            settings.STRIPE_WEBHOOK_SECRET
        )
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    
    # Traiter les événements
    if event['type'] == 'charge.succeeded':
        charge = event['data']['object']
        metadata = charge.get('metadata', {})
        
        order = Order.objects.get(id=metadata['order_id'])
        order.status = 'paid'
        order.payment_id = charge['id']
        order.save()
        
        # Réduire les stocks
        for item in order.items.all():
            item.product.stock -= item.quantity
            item.product.save()
    
    return Response({'status': 'success'})
```

---

## Déploiement

### Architecture de production

```
┌─────────────────────────────────────────────────┐
│            Users - Internet                      │
└────────────────────┬────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│  Netlify CDN     │      │   Render DNS     │
│  (Frontend SPA)  │      │   (API Gateway)  │
└────────┬─────────┘      └────────┬─────────┘
         │                         │
         │ https:// static         │ https:// API
         │                         │
         └────────────┬────────────┘
                      │
         ┌────────────▼────────────┐
         │   Render Container      │
         │  ┌────────────────────┐ │
         │  │  Django + Gunicorn │ │
         │  └──────────┬─────────┘ │
         │             │           │
         │  ┌──────────▼────────┐  │
         │  │  PostgreSQL DB    │  │
         │  │  (Render Managed) │  │
         │  └───────────────────┘  │
         │                         │
         │  ┌───────────────────┐  │
         │  │  Redis Cache      │  │
         │  │  (Render KV Store)│  │
         │  └───────────────────┘  │
         └─────────────────────────┘
                     │
                     │ Webhooks
                     │
         ┌───────────▼──────────┐
         │   Stripe API         │
         │   (Paiements)        │
         └──────────────────────┘
```

### 1. Déploiement Backend (Render)

#### Configuration Render

**Service Type :** Web Service  
**Build Command :** `pip install -r requirements.txt && python manage.py migrate`  
**Start Command :** `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT`

#### Variables d'environnement

```
DEBUG=False
SECRET_KEY=<generate-strong-key>
DATABASE_URL=<provided-by-render>
REDIS_URL=<provided-by-redis-addon>
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...
SITE_URL=https://radiant-ecom.netlify.app
ALLOWED_HOSTS=radiant-backend.onrender.com
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SENTRY_DSN=...
```

#### Fichier Dockerfile (production)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Migrations et collecte des statics
RUN python manage.py migrate --noinput
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
```

### 2. Déploiement Frontend (Netlify)

#### Configuration Netlify

**Build Settings :**
- **Build Command :** `npm run build`
- **Publish Directory :** `dist/`
- **Node Version :** 18.x

#### Variables d'environnement

```
VITE_API_URL=https://radiant-backend.onrender.com/api
VITE_API_MEDIA_URL=https://radiant-backend.onrender.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

#### Fichier `public/_redirects` (SPA support)

```
/* /index.html 200
```

Cela redirige toutes les routes vers `index.html` pour que React Router prenne le contrôle.

#### Fichier Dockerfile (frontend)

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### 3. CI/CD Pipeline

#### GitHub Actions (Backend)

```yaml
# .github/workflows/backend-deploy.yml
name: Deploy Backend

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }} \
            -H "Content-Type: application/json"
```

#### Github Actions (Frontend)

Netlify se connecte directement à votre repo GitHub et redéploie à chaque push sur `main`.

---

## Maintenance et monitoring

### 1. Logging

**Backend :**
```python
import logging

logger = logging.getLogger(__name__)

try:
    order = Order.objects.create(...)
except Exception as e:
    logger.error(f"Order creation failed: {str(e)}", exc_info=True)
    # Sentry capture automatiquement
```

**Frontend :**
```javascript
try {
  await api.post('orders/create/', payload);
} catch (error) {
  console.error('Order creation failed:', error);
  // Toast notification pour l'utilisateur
}
```

### 2. Error Tracking (Sentry)

**Backend intégré :**
```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn=os.getenv('SENTRY_DSN'),
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
)
```

Dashboard Sentry : https://sentry.io/projects/radiant/

### 3. Performance Monitoring

**Outils recommandés :**
- **New Relic** : APM (Application Performance Monitoring)
- **Datadog** : Logs centralisés + alertes
- **CloudFlare** : Analytics edge computing

### 4. Sauvegardes (Backup)

**PostgreSQL (Render) :**
- Sauvegardes automatiques quotidiennes
- Point-in-time recovery (PITR) activé

**Cloudinary (Images) :**
- CDN répliqué globalement
- Historique de versions

### 5. Monitoring de la sécurité

**Checklist production :**
- [ ] DEBUG=False
- [ ] SECRET_KEY unique et strong
- [ ] ALLOWED_HOSTS configurés
- [ ] CORS whitelist restrictive
- [ ] HTTPS obligatoire
- [ ] CSRF protection active
- [ ] Rate limiting Stripe Webhooks
- [ ] Validation des inputs
- [ ] SQL Injection prevention (ORM Django)
- [ ] XSS prevention (React auto-escape)

### 6. Maintenance régulière

```bash
# Mises à jour dépendances (mensuel)
pip list --outdated
npm outdated

# Vérifications de sécurité
pip audit
npm audit

# Cleanup BD
python manage.py cleanup_expired_tokens

# Backup manuel
pg_dump radiant_db > backup_$(date +%Y%m%d).sql
```

---

## Commandes utiles

### Backend Django

```bash
# Création d'admin
python manage.py createsuperuser

# Migrations
python manage.py makemigrations
python manage.py migrate
python manage.py showmigrations

# Shell Django
python manage.py shell
>>> from accounts.models import User
>>> user = User.objects.get(email='admin@radiant.com')

# Collecte des statics (production)
python manage.py collectstatic --noinput

# Vérifications
python manage.py check
python manage.py check --deploy
```

### Frontend React

```bash
# Linting
npm run lint

# Build optimisé
npm run build

# Analyse bundle
npm run build -- --analyze

# Preview production
npm run preview
```

---

## Architecture du frontend (React)

### Context API Structure

```
App.jsx (Root)
├── AuthContext (Global state)
│   ├── user
│   ├── loading
│   ├── login()
│   ├── logout()
│   └── isAuthenticated()
│
├── CartContext
│   ├── cart (Array)
│   ├── addToCart()
│   ├── removeFromCart()
│   ├── clearCart()
│   └── getTotal()
│
├── ThemeContext
│   ├── isDark (Boolean)
│   └── toggleTheme()
│
└── Routes
    ├── / (Home/Shop)
    ├── /product/:id (DetailProduct)
    ├── /login (Login)
    ├── /register (Register)
    ├── /cart (Cart)
    └── /dashboard (UserOrders)
```

### Client Axios (api.js)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Interceptor pour JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de rafraîchissement de token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refresh = localStorage.getItem('refresh_token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh/`,
        { refresh }
      );
      
      localStorage.setItem('access_token', response.data.access);
      api.defaults.headers.Authorization = 
        `Bearer ${response.data.access}`;
      
      return api(originalRequest);
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

---

## Troubleshooting

### Problème : CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution :**
1. Vérifier `CORS_ALLOWED_ORIGINS` dans `settings.py`
2. Vérifier le `VITE_API_URL` du frontend
3. S'assurer que le frontend URL est whitelistée

### Problème : 401 Unauthorized

```
{"detail":"Authentication credentials were not provided."}
```

**Solutions :**
1. Vérifier que le token est présent : `localStorage.getItem('access_token')`
2. Vérifier l'expiration : JWT expire en 60 min
3. Utiliser le `refresh_token` pour obtenir un nouveau token

### Problème : 404 Images

```
GET https://media.radiant.com/perfumes/image.jpg 404
```

**Solutions :**
1. Vérifier `VITE_API_MEDIA_URL` du frontend
2. Vérifier que les URLs dans Django sont accessibles
3. Vérifier les permissions Cloudinary

### Problème : Stripe Webhook non reçu

**Solutions :**
1. Vérifier le `STRIPE_WEBHOOK_SECRET`
2. Vérifier la signature du webhook
3. Vérifier les logs Stripe Dashboard → Webhooks
4. Tester avec Stripe CLI : `stripe listen --forward-to localhost:8000/api/orders/webhook/`

---

## Ressources

### Documentation
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Tailwind CSS](https://tailwindcss.com/)

### Outils
- [Postman](https://www.postman.com/) : Tester API
- [Stripe CLI](https://stripe.com/docs/stripe-cli) : Webhooks locaux
- [JWT.io](https://jwt.io/) : Décoder tokens
- [DrawSQL](https://drawsql.app/) : Diagrammes BD

---

## License et Contact

**Projet :** Radiant E-commerce  
**Version :** 1.0.0  
**Last Updated :** Février 2026  

Pour les questions techniques, contactez `tech@radiant.com`

---

**Fin de la documentation technique**
