from django.contrib import admin
from import_export import resources, fields
from import_export.admin import ImportExportModelAdmin
from .models import Product

class ProductResource(resources.ModelResource):
    name = fields.Field(attribute='name', column_name='title')
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'category', 'image')
        import_id_fields = ('name',) 

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    resource_class = ProductResource
    list_display = ('name', 'price', 'category')