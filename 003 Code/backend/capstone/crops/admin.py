from django.contrib import admin

from .models import SmartFarmCrop

# Register your models here.
@admin.register(SmartFarmCrop)
class SmartFarmCropModelAdmin(admin.ModelAdmin):
    pass