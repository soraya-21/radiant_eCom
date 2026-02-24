import os
from django.contrib.auth import get_user_model

User = get_user_model()
username = os.getenv("DJANGO_SUPERUSER_USERNAME", "admin")
email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@radiant.com")
password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "ton_mot_de_passe_secret")

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"Superuser {username} créé avec succès !")
else:
    print(f"Superuser {username} existe déjà.")