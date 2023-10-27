from django import forms

from .models import UploadImage


class UploadImageForm(forms.ModelForm):
    class Meta:
        model = UploadImage
        fields = ['image']