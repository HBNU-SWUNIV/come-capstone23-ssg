from django.urls import path
from .views import register_crop_view, modify_crop_view, remove_crop_view, upload_image
from django.conf import settings
from django.conf.urls.static import static

app_name = 'crops'

urlpatterns = [
    path('register/crop', register_crop_view, name='register-crop'),
    path('modify/crop', modify_crop_view, name='modify-crop'),
    path('delete/crop', remove_crop_view, name='delete-crop'),
    path('upload/image', upload_image, name='upload-image'),
    # path('ndvi', .as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)