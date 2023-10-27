from django.db import models
from accounts.models import User
from crops.models import SmartFarmCrop

class SmartFarm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sfid = models.CharField(max_length=10)
    crop = models.ForeignKey(SmartFarmCrop, on_delete=models.CASCADE, null=True)

# Create your models here.
class SmartFarmSensor(models.Model):
    smartfarm = models.ForeignKey(SmartFarm, on_delete=models.CASCADE)
    # sfid = models.ForeignKey(SmartFarm, on_delete=models.CASCADE, db_column="sfid")
    remotepower = models.BooleanField(null=True)
    temperature = models.FloatField(null=True)
    humidity = models.FloatField(null=True)
    light = models.IntegerField(null=True)
    soil = models.IntegerField(null=True)
    
    ledpower = models.BooleanField(null=True)
    ledstate = models.BooleanField(null=True)
    ledtoggle = models.BooleanField(null=True)
    ledautotoggle = models.BooleanField(null=True)
    ledstarttimevalue = models.IntegerField(null=True)
    ledstartminutevalue = models.IntegerField(null=True)
    ledendtimevalue = models.IntegerField(null=True)
    ledendminutevalue = models.IntegerField(null=True)
    
    waterpumppower = models.BooleanField(null=True)
    waterpumpstate = models.BooleanField(null=True)
    waterpumptoggle = models.BooleanField(null=True)
    waterpumpautotoggle = models.BooleanField(null=True)
    waterpumpstarttime = models.IntegerField(null=True)
    waterpumprunningtime = models.IntegerField(null=True)
    waterlevelvoltage = models.FloatField(null=True)
    watertemperature = models.FloatField(null=True)
    
    fanpower = models.BooleanField(null=True)
    fanstate = models.BooleanField(null=True)
    fantoggle = models.BooleanField(null=True)
    fanautotoggle = models.BooleanField(null=True)
    fanstarttimevalue = models.IntegerField(null=True)
    fanstartminutevalue = models.IntegerField(null=True)
    fanendtimevalue = models.IntegerField(null=True)
    fanendminutevalue = models.IntegerField(null=True)

    doorpower = models.BooleanField(null=True)
    doorstate = models.BooleanField(null=True)
    doortoggle = models.BooleanField(null=True)
    doorautotoggle = models.BooleanField(null=True)
    doorstarttimevalue = models.IntegerField(null=True)
    doorstartminutevalue = models.IntegerField(null=True)
    doorendtimevalue = models.IntegerField(null=True)
    doorendminutevalue = models.IntegerField(null=True)
    
    waterlevelwarning = models.TextField(auto_created=True, null=True)
    watertempwarning = models.TextField(auto_created=True, null=True)
    tempwarning = models.TextField(auto_created=True, null=True)
    humwarning = models.TextField(auto_created=True, null=True)
    soilwarning = models.TextField(auto_created=True, null=True)
