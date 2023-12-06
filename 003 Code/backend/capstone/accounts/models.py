from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Create your models here.
# class UserManager(BaseUserManager):
#     def create_user(self, user_id, user_name, phone_number, password=None):
#         user = self.model(
#             user_id=user_id,
#             user_name=user_name,
#             phone_number=phone_number
#         )

#         user.set_password(password)
#         user.save(using=self._db)

#         return user
    
#     def create_superuser(self, user_id, password=None):
#         user = self.model(user_id=user_id)

#         user.set_password(password)
#         user.is_admin = True
#         user.is_staff = True
#         user.save(using=self._db)

#         return user


# class User(AbstractBaseUser):
#     user_id = models.CharField(max_length=30, unique=True)
#     user_name = models.CharField(max_length=30)
#     # smartfarm_id = models.ForeignKey()
#     # plant_id = models.ForeignKey()
#     phone_number = models.CharField(max_length=20)
#     is_admin = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)

#     objects = UserManager()

#     USERNAME_FIELD = 'user_id'

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    name = models.CharField(max_length=20, null=True, blank=True)
    fcm_token = models.CharField(max_length=100, null=True, blank=True)
    fcm_webtoken = models.CharField(max_length=100, null=True, blank=True)