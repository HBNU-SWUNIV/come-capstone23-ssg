from django.urls import path
from .views import register_crop_view, get_crop_view, modify_crop_view, remove_crop_view, image_ndvi
from django.conf import settings
from django.conf.urls.static import static

from .views import UploadView

app_name = 'crops'

urlpatterns = [
    path('register', register_crop_view, name='register-crop'),
    path('get', get_crop_view, name='get-crop'),
    path('modify', modify_crop_view, name='modify-crop'),
    path('delete', remove_crop_view, name='delete-crop'),
    # path('upload/image', upload_image, name='upload-image'),
    path('upload/image', UploadView.as_view()),
    path('ndvi', image_ndvi, name='image-ndvi'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)