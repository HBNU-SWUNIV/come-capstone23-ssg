from rest_framework.serializers import ModelSerializer

from django import forms

from .models import SmartFarmCrop, UploadImage

class SmartFarmCropModelSerializer(ModelSerializer):
    class Meta:
        model = SmartFarmCrop
        fields = '__all__'
        
class UplaodImageModelSerializer(ModelSerializer):
    class Meta:
        model = UploadImage
        fields = '__all__'

        