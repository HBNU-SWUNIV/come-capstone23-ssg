from django.contrib import admin

from .models import SmartFarmSensor, SmartFarm

# Register your models here.
@admin.register(SmartFarmSensor)
class SmartFarmModelAdmin(admin.ModelAdmin):
    pass

@admin.register(SmartFarm)
class SmartFarmModelAdmin(admin.ModelAdmin):
    pass