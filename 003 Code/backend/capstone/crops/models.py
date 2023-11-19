from django.db import models

# Create your models here.
class SmartFarmCrop(models.Model):
    name = models.CharField(max_length=20, null=True)
    day = models.IntegerField(null=True)
    ndvi = models.FloatField(null=True) # default=-0
    timestamp = models.DateTimeField(null=True)
    
class UploadImage(models.Model):
    # image = models.FileField(upload_to='uploads/')
    image = models.ImageField(upload_to='uploads/')
    # image = models.FileField(upload_to='Uploaded Files/%y/%m/%d/', blank=True)
    # image_date = models.DateField(auto_now = True)
    # image = models.ImageField(null=True, upload_to="uploads/", blank=True)