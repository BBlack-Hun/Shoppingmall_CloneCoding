from django.contrib import admin
from .models import MyUser, Real_estate, Category

# Register your models here.
admin.site.register(MyUser)
admin.site.register(Category)
admin.site.register(Real_estate)