from django.contrib import admin
from import_export import resources, fields
from import_export.admin import ImportExportModelAdmin
from .models import Product

class ProductResource(resources.ModelResource):
    name = fields.Field(attribute='name', column_name='title')
    category = fields.Field(attribute='category', column_name='category')
    price = fields.Field(attribute='price', column_name='price')
    image_url = fields.Field(attribute='image_url', column_name='image_url') 

    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'price', 'image_url')
        import_id_fields = ('name',) # Évite les doublons en utilisant le champ 'name' comme identifiant unique pour l'importation
        skip_unchanged = True

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    resource_class = ProductResource
    list_display = ('name', 'category', 'price')
    search_fields = ('name', 'category')