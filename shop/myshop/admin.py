from django.contrib import admin
from .models import MyUser, Real_estate, Category, Like, Message

# Register your models here.
admin.site.register(MyUser)
admin.site.register(Category)
admin.site.register(Real_estate)
admin.site.register(Like)
admin.site.register(Message)