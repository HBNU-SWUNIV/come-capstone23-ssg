from django.urls import path
from .views import DoorView, FanView, InfoView, LedView, RaspberryView, WaterView
from .views import get_warning, get_smartfarm_sensor, check_smartfarm_id_view, get_smartfarm_id_view, register_smartfarm_view, modify_smartfarm_view, remove_smartfarm_view

app_name = 'server'

urlpatterns = [
    # path('', PatentAttorneyListView.as_view(), name='patent-attorney-list'),
    # path('<int:pk>/', PatentAttorneyRetrieveView.as_view(), name='patent-attorney-retrieve')
    path('raspberry', RaspberryView.as_view(), ),
    path('info', InfoView.as_view()),
    path('led', LedView.as_view()),
    path('water', WaterView.as_view()),
    path('fan', FanView.as_view()),
    path('door', DoorView.as_view()),
    # path('get', get_smartfarmid, name='get-smartfarmid'),
    # path('warning', WarningView.as_view()),
    # path('initial', get_initial, name="web-initial_info"),
    path('warning', get_warning, name="warninglist"),
    path('check/smartfarm', check_smartfarm_id_view, name="check-smartfarm"),
    path('get/smartfarm', get_smartfarm_id_view, name='get-smartfarmid'),
    path('register/smartfarm', register_smartfarm_view, name="register-smartfarm"),
    path('modify/smartfarm', modify_smartfarm_view, name="modify-smartfarm"),
    path('delete/smartfarm', remove_smartfarm_view, name="delete-smartfarm"),
    path('smartfarm/<str:smartfarm_id>/', get_smartfarm_sensor, name='get_smartfarm_sensor'),
]

