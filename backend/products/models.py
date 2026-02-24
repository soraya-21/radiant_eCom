# apps/products/models.py
from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('perfume', 'Eau de Parfum'),
        ('skincare', 'Soin Visage'),
        ('body', 'Corps'),
    ]

    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100, default="Radiant Skincare")
    # Ajout du champ catégorie
    category = models.CharField(
        max_length=50, 
        choices=CATEGORY_CHOICES, 
        default='perfume'
    )
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='perfumes/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.get_category_display()}) - {self.price}€"