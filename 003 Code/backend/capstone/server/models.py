from django.db import models
from accounts.models import User
from crops.models import SmartFarmCrop
from django.utils import timezone

class SmartFarm(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)
    sfid = models.CharField(max_length=10)
    crop = models.ForeignKey(SmartFarmCrop, on_delete=models.CASCADE, null=True)

# Create your models here.
class SmartFarmSensor(models.Model):
    smartfarm = models.ForeignKey(SmartFarm, on_delete=models.PROTECT)
    # sfid = models.ForeignKey(SmartFarm, on_delete=models.CASCADE, db_column="sfid")
    remotepower = models.BooleanField(null=True,blank=True)
    temperature = models.FloatField(null=True, blank=True)
    humidity = models.FloatField(null=True, blank=True)
    light = models.IntegerField(null=True, blank=True)
    soil = models.IntegerField(null=True, blank=True)
    
    ledpower = models.BooleanField(null=True, blank=True, default=0)
    ledstate = models.BooleanField(null=True, blank=True, default=0)
    ledtoggle = models.BooleanField(null=True, blank=True, default=0)
    ledautotoggle = models.BooleanField(null=True, blank=True, default=0)
    ledstarttimevalue = models.IntegerField(null=True, blank=True, default=0)
    ledstartminutevalue = models.IntegerField(null=True, blank=True, default=0)
    ledendtimevalue = models.IntegerField(null=True, blank=True, default=0)
    ledendminutevalue = models.IntegerField(null=True, blank=True, default=0)
    
    waterpumppower = models.BooleanField(null=True, blank=True, default=0)
    waterpumpstate = models.BooleanField(null=True, blank=True, default=0)
    waterpumptoggle = models.BooleanField(null=True, blank=True, default=0)
    waterpumpautotoggle = models.BooleanField(null=True, blank=True, default=0)
    waterpumpstarttime = models.IntegerField(null=True, blank=True, default=0)
    waterpumprunningtime = models.IntegerField(null=True, blank=True, default=0)
    waterlevelvoltage = models.FloatField(null=True, blank=True, default=0)
    watertemperature = models.FloatField(null=True, blank=True, default=0)
    
    fanpower = models.BooleanField(null=True, blank=True, default=0)
    fanstate = models.BooleanField(null=True, blank=True, default=0)
    fantoggle = models.BooleanField(null=True, blank=True, default=0)
    fanautotoggle = models.BooleanField(null=True, blank=True, default=0)
    fanstarttimevalue = models.IntegerField(null=True, blank=True, default=0)
    fanstartminutevalue = models.IntegerField(null=True, blank=True, default=0)
    fanendtimevalue = models.IntegerField(null=True, blank=True, default=0)
    fanendminutevalue = models.IntegerField(null=True, blank=True, default=0)

    doorpower = models.BooleanField(null=True, blank=True, default=0)
    doorstate = models.BooleanField(null=True, blank=True, default=0)
    doortoggle = models.BooleanField(null=True, blank=True, default=0)
    doorautotoggle = models.BooleanField(null=True, blank=True, default=0)
    doorstarttimevalue = models.IntegerField(null=True, blank=True, default=0)
    doorstartminutevalue = models.IntegerField(null=True, blank=True, default=0)
    doorendtimevalue = models.IntegerField(null=True, blank=True, default=0)
    doorendminutevalue = models.IntegerField(null=True, blank=True, default=0)
    
    waterlevelwarning = models.TextField(auto_created=True, null=True)
    watertempwarning = models.TextField(auto_created=True, null=True)
    tempwarning = models.TextField(auto_created=True, null=True)
    humwarning = models.TextField(auto_created=True, null=True)
    soilwarning = models.TextField(auto_created=True, null=True)

    timestamp = models.DateTimeField(auto_now=True)