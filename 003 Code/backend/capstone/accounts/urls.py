from django.urls import path
# from django.contrib import admin

from accounts.views import signup_view, login_view, check_view, search_id_view, search_password_view, verify_view, modify_password_view, modify_personal_information_view, withdraw_view

app_name = 'accounts'

urlpatterns = [
    path('signup', signup_view, name='signup'),
    path('login', login_view, name='login'),
    path('check', check_view, name='check'),
    path('verify', verify_view, name='verify'),
    path('search/id', search_id_view, name='search-id'),
    path('search/password', search_password_view, name='search-password'),
    path('modify/password', modify_password_view, name='modify-password'),
    path('modify/personal-information', modify_personal_information_view, name='modify-personal-information'),
    path('withdraw', withdraw_view, name='withdraw')
]