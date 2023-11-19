import copy
import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from requests import request
# from rest_framework import authentication, permissions
from rest_framework import generics
from rest_framework import status

# from django.db.models import Max
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView

from django.utils import timezone
from django.db.models import Q, F
from django.db.models.functions import TruncDate

# from cap.fcm_notification import send_push_notification, send_push_notification2, send_push_notification3, send_push_notification4, send_push_notification5

# from rest_framework.authtoken.models import Token

from .models import SmartFarmCrop, SmartFarmSensor, SmartFarm, User
from .serializers import DoorListModelSerializer, FanListModelSerializer, InfoListModelSerializer, LedListModelSerializer, WarningListModelSerializer, WaterListModelSerializer, SmartFarmSensorBaseModelSerializer
from django.core import serializers

# from .accounts.models import User
import firebase_admin
from firebase_admin import credentials, initialize_app
from firebase_admin import messaging

json_path = "/home/dfx/naro/cap/smartfarm.json"
path = credentials.Certificate(json_path)
# firebase_admin.initialize_app(path)
initialize_app(path, name='SMARTFARM')

def send_push_notification(request, waterlevelwarning):
    
    try:
        user = User.objects.get(username=request.user)

        # fcm_token 가져오기
        registration_token = user.fcm_token
        registration_webtoken = user.fcm_webtoken

        if waterlevelwarning != "":
            print("waterlevelwarning 메세지가 있습니다.")
                
            if registration_token:          
                message = messaging.Message(
                notification=messaging.Notification(
                        title = '앱 스마트팜 경고!',
                        body = '스마트팜 외부 수조의 물이 부족합니다.'
                    ),
                token = registration_token,
                )
                
                try:
                    response = messaging.send(message)
                    # 전송 결과 출력
                    # print('Successfully sent message:', response)
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
                except Exception as e:
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)

            if registration_webtoken:            
                message = messaging.Message(
                notification=messaging.Notification(
                        title = '웹 스마트팜 경고!',
                        body = '스마트팜 외부 수조의 물이 부족합니다.'
                    ),
                token = registration_webtoken,
                )
                
                try:
                    response = messaging.send(message)
                    # 전송 결과 출력
                    # print('Successfully sent message:', response)
                    return Response({'message': 'waterlevelwarning 웹 FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
                except Exception as e:
                    return Response({'message': 'waterlevelwarning 웹 FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)
        return Response({'message' : 'waterlevelwarning 경고 메시지가 없습니다.'}, status=200)
    
    except Exception as e:
        return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
def send_push_notification2(request, watertempwarning):
    
    try:
        user = User.objects.get(username=request.user)

        # fcm_token 가져오기
        registration_token = user.fcm_token
        registration_webtoken = user.fcm_webtoken

        if watertempwarning != "":
            print("waterlevelwarning 메세지가 있습니다.")
                
            if registration_token:          
                message = messaging.Message(
                notification=messaging.Notification(
                        title = '앱 스마트팜 경고!',
                        body = '스마트팜 외부 수조의 물이 부족합니다.'
                    ),
                token = registration_token,
                )
                
                try:
                    response = messaging.send(message)
                    # 전송 결과 출력
                    # print('Successfully sent message:', response)
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
                except Exception as e:
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)


        if watertempwarning != "":
            print("watertempwarning 메세지가 있습니다.")
            
            message = messaging.Message(
            notification=messaging.Notification(
                    title = '스마트팜 경고!',
                    body = '스마트팜 외부 수조의 수온이 너무 높습니다.'
                ),
            token = registration_webtoken,
            )
            
            try:
                response = messaging.send(message)
                
                # 전송 결과 출력
                # print('Successfully sent message:', response)
                return Response({'message': 'watertempwarning 웹 FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
            except Exception as e:
                print("An error occurred:", e)
                return Response({'message': 'watertempwarning 웹 FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)
        return Response({'message' : 'watertempwarning 경고 메시지가 없습니다.'}, status=200)
    
    except Exception as e:
        return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def send_push_notification3(request, tempwarning):
    
    try:
        user = User.objects.get(username=request.user)

        # fcm_token 가져오기
        registration_token = user.fcm_token
        registration_webtoken = user.fcm_webtoken

        if tempwarning != "":
            print("waterlevelwarning 메세지가 있습니다.")
                
            if registration_token:          
                message = messaging.Message(
                notification=messaging.Notification(
                        title = '앱 스마트팜 경고!',
                        body = '스마트팜 외부 수조의 물이 부족합니다.'
                    ),
                token = registration_token,
                )
                
                try:
                    response = messaging.send(message)
                    # 전송 결과 출력
                    # print('Successfully sent message:', response)
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
                except Exception as e:
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)

        if tempwarning != "":
            print("tempwarning 메세지가 있습니다.")
            
            message = messaging.Message(
            notification=messaging.Notification(
                    title = '스마트팜 경고!',
                    body = '스마트팜 내부 온도가 너무 높습니다.'
                ),
            token = registration_webtoken,
            )
            
            try:
                response = messaging.send(message)
                # 전송 결과 출력
                # print('Successfully sent message:', response)
                return Response({'message': 'tempwarning FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
            except Exception as e:
                return Response({'message': 'tempwarning FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)
        return Response({'message' : 'tempwarning 경고 메시지가 없습니다.'}, status=200)

    except Exception as e:
        return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def send_push_notification4(request, humwarning):
    
    try:
        user = User.objects.get(username=request.user)

        # fcm_token 가져오기
        registration_token = user.fcm_token
        registration_webtoken = user.fcm_webtoken

        if humwarning != "":
            print("waterlevelwarning 메세지가 있습니다.")
                
            if registration_token:          
                message = messaging.Message(
                notification=messaging.Notification(
                        title = '앱 스마트팜 경고!',
                        body = '스마트팜 외부 수조의 물이 부족합니다.'
                    ),
                token = registration_token,
                )
                
                try:
                    response = messaging.send(message)
                    # 전송 결과 출력
                    # print('Successfully sent message:', response)
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
                except Exception as e:
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)

        if humwarning != "":
            print("humwarning 메세지가 있습니다.")
            
            message = messaging.Message(
            notification=messaging.Notification(
                    title = '스마트팜 경고!',
                    body = '스마트팜 내부 습도가 너무 높습니다.'
                ),
            token = registration_webtoken,
            )
            
            try:
                response = messaging.send(message)
                # 전송 결과 출력
                # print('Successfully sent message:', response)
                return Response({'message': 'humwarning FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
            except Exception as e:
                return Response({'message': 'humwarning FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)
        return Response({'message' : 'humwarning 경고 메시지가 없습니다.'}, status=200)
        
    except Exception as e:
        return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def send_push_notification5(request, soilwarning):
    
    try:
        user = User.objects.get(username=request.user)

        # fcm_token 가져오기
        registration_token = user.fcm_token
        registration_webtoken = user.fcm_webtoken

        if soilwarning != "":
            print("waterlevelwarning 메세지가 있습니다.")
                
            if registration_token:          
                message = messaging.Message(
                notification=messaging.Notification(
                        title = '앱 스마트팜 경고!',
                        body = '스마트팜 외부 수조의 물이 부족합니다.'
                    ),
                token = registration_token,
                )
                
                try:
                    response = messaging.send(message)
                    # 전송 결과 출력
                    # print('Successfully sent message:', response)
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
                except Exception as e:
                    return Response({'message': 'waterlevelwarning 앱 FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)
    
        if soilwarning != "":
            print("soilwarning 메세지가 있습니다.")
            
            message = messaging.Message(
            notification=messaging.Notification(
                    title = '스마트팜 경고!',
                    body = '스마트팜 내부의 흙이 건조합니다.'
                ),
            token = registration_webtoken,
            )
            
            try:
                response = messaging.send(message)
                # 전송 결과 출력
                # print('Successfully sent message:', response)
                return Response({'message': 'soilwarning FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
            except Exception as e:
                return Response({'message': 'soilwarning FCM 메시지 전송 중 오류가 발생했습니다.' + str(e)}, status=500)
        return Response({'message' : 'soilwarning 경고 메시지가 없습니다.'}, status=200)

    except Exception as e:
        return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
# 스마트팜 고유번호 확인
@api_view(['POST'])
def check_smartfarm_id_view(request):
    sfid = request.data['sfid']
    try:
        user = User.objects.get(name=None)
        existing_smartfarm = SmartFarm.objects.filter(user=user, sfid=sfid)
        
        if existing_smartfarm.exists():
            return Response({'message': '등록할 수 있는 스마트팜입니다.'}, status=200)
        
        existing_user = User.objects.get(username=request.user)
        existing_smartfarmm = SmartFarm.objects.filter(user=existing_user, sfid=sfid)
        
        if existing_smartfarmm.exists():
            return Response({'message': '이미 등록되어 있는 스마트팜입니다.'}, status=200)
        else:
            return Response({'message': '등록할 수 없는 스마트팜입니다.'}, status=400)
        
    except Exception as e:
        return Response({'message': 'Error'+ str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

# 스마트팜 고유번호 가져오기
@api_view(['GET'])
def get_smartfarm_id_view(request):
    
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    # 스마트팜 가져오기
    smartfarm = SmartFarm.objects.get(user=user)
    
    return Response({'smartfarm': smartfarm.sfid}, status=200)

# 스마트팜 등록
@api_view(['POST'])
def register_smartfarm_view(request):
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        # 사용자 스마트팜 등록 여부 확인 후 등록하기
        sfid = request.data['sfid']
                
        existing_user = User.objects.get(name=None)
        existing_smartfarm = SmartFarm.objects.get(user=existing_user, sfid=sfid)
    
    except SmartFarm.DoesNotExist:
        SmartFarm.objects.filter(sfid=sfid).update(user=user)
        return Response({'message': '스마트팜 센서가 등록되었습니다.'}, status=200)
        # return Response({'message': '등록되어 있지 않은 스마트팜입니다.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    if existing_smartfarm:
        # existing_smartfarm.user = user
        # existing_smartfarm.save()
        SmartFarm.objects.filter(user=existing_user, sfid=sfid).update(user=user)
    
    # 스마트팜 센서 등록하기
    # smartfarmSensor = SmartFarmSensor.objects.create(smartfarm=smartfarm)
    # smartfarmSensor.id = None
    # smartfarmSensor.save()
    
    return Response({'message': '스마트팜 센서가 등록되었습니다.'}, status=200)


# 스마트팜 수정
@api_view(['PUT'])
def modify_smartfarm_view(request):
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
    # 스마트팜 가져오기 및 수정하기
    try:
        sfid = request.data['sfid']
        
        smartfarm = SmartFarm.objects.get(user=user)
        
        smartfarm.sfid = sfid
        smartfarm.save()
        
        return Response({'message': '스마트팜이 수정되었습니다.'}, status=200)
        
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록되어 있는 스마트팜이 없습니다.'}, status=400)
    except Exception as e:
        return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# 스마트팜 삭제
@api_view(['DELETE'])
def remove_smartfarm_view(request):
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
    # 스마트팜 가져오기 및 삭제하기
    try:
        smartfarm = SmartFarm.objects.get(user=user)
    
        smartfarm.user = None
        # smartfarm.user.name = None
        smartfarm.save()
        # smartfarm.delete()
        
        return Response({'message': '스마트팜이 삭제되었습니다.'}, status=200)
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 스마트팜입니다.'}, status=404)

    except Exception as e:
        return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# 사용자 이름(id X), 스마트팜/작물 등록 여부, 
# 스마트팜 고유 번호, 스마트팜 내부환경 정보(온도, 습도), 
# 스마트팜 제어 정보, 작물 정보, ndvi
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_initial(request):

#     # 사용자 가져오기
#     try:
#         user = User.objects.get(username=request.user)
#     except User.DoesNotExist:
#         return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
#     # 스마트팜 가져오기
#     try:
#         smartfarm = SmartFarm.objects.get(user=user)
#     except SmartFarm.DoesNotExist:
#         smartfarm = None
    
#     # 작물 가져오기
#     try:
#         crop = SmartFarmCrop.objects.get(smartfarm=smartfarm)
#     except SmartFarmCrop.DoesNotExist:
#         crop = None
    
#     # remotepower 가져오기
#     remotepower = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id').remotepower
    
#     # temperature 가져오기
#     temperature = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id').temperature

#     # humidity 가져오기
#     humidity = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id').humidity
    
#     # ndvi 가져오기
#     ndvi = SmartFarmCrop.objects.filter(smartfarm=smartfarm).latest('id').ndvi
    
#     data = {
#         'username' : user.username if user else '',
#         'smartfarm_chcek' : smartfarm is not None,
#         'smartfarm' : smartfarm.sfid,
#         'remotepower' : remotepower,
#         'temperature' : temperature,
#         'humidity' : humidity,
#         'crop_check' : crop is not None,
#         'crop_name' : crop.name,
#         'crop_day' : crop.day,
#         'ndvi' : ndvi,
#     }
    
#     return Response(data)
        
# rasp에서 smartfarm 고유번호 가져가기
# @api_view(['GET'])
# def get_raspberry(request):
#     token = request.auth
    
#     if token:
#         if 
#         return Response({'token':token.key})
#     else:
#         return Response({'message':'토큰이 없습니다.'}, status=401)
    
#     return Response({'token':user.})

# 스마트팜 고유번호 GET (raspberry이용)
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_smartfarmid(request):
    
#     smartfarm = SmartFarm.objects.get(user=request.user)
#     return Response(smartfarm.sfid)


# 스마트팜 센서 정보 GET (raspberry이용)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_smartfarm_sensor(request, smartfarm_id):
    try:
        smartfarm = SmartFarm.objects.get(sfid=smartfarm_id)
        # userin = request.user
        # smartfarm = SmartFarm.objects.get(sfid=smartfarm_id, user=userin)
        sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')

        sensor_serializer = SmartFarmSensorBaseModelSerializer(sensor)
        sensor_data = sensor_serializer.data
        sensor_data["smartfarm"] = smartfarm.sfid
        
        # print(sensor_serializer.data)
        return Response(sensor_data)
    
    except SmartFarmSensor.DoesNotExist:
        return Response({'message': '등록한 스마트팜 센서 값이 없습니다.'}, status=404)

    except SmartFarm.DoesNotExist:
        return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)

    except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Create your views here.
class RaspberryView(APIView):
# class RaspberryView(generics.ListAPIView):
    # queryset = SmartFarmSensor.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SmartFarmSensorBaseModelSerializer
    
    def post(self, request):
        smartfarm = request.data['smartfarm']
        remotepower = request.data['remotepower']
        temperature = request.data['temperature']
        humidity = request.data['humidity']
        light = request.data['light']
        soil = request.data['soil']
        
        ledpower = request.data['ledpower']
        ledstate = request.data['ledstate']
        ledtoggle = request.data['ledtoggle']
        ledautotoggle = request.data['ledautotoggle']
        ledstarttimevalue = request.data['ledstarttimevalue']
        ledstartminutevalue = request.data['ledstartminutevalue']
        ledendtimevalue = request.data['ledendtimevalue']
        ledendminutevalue = request.data['ledendminutevalue']
    
        waterpumppower = request.data['waterpumppower']
        waterpumpstate = request.data['waterpumpstate']
        waterpumptoggle = request.data['waterpumptoggle']
        waterpumpautotoggle = request.data['waterpumpautotoggle']
        waterpumpstarttime = request.data['waterpumpstarttime']
        waterpumprunningtime = request.data['waterpumprunningtime']
        waterlevelvoltage = request.data['waterlevelvoltage']
        watertemperature = request.data['watertemperature']
    
        fanpower = request.data['fanpower']
        fanstate = request.data['fanstate']
        fantoggle = request.data['fantoggle']
        fanautotoggle = request.data['fanautotoggle']
        fanstarttimevalue = request.data['fanstarttimevalue']
        fanstartminutevalue = request.data['fanstartminutevalue']
        fanendtimevalue = request.data['fanendtimevalue']
        fanendminutevalue = request.data['fanendminutevalue']

        doorpower = request.data['doorpower']
        doorstate = request.data['doorstate']
        doortoggle = request.data['doortoggle']
        doorautotoggle = request.data['doorautotoggle']
        doorstarttimevalue = request.data['doorstarttimevalue']
        doorstartminutevalue = request.data['doorstartminutevalue']
        doorendtimevalue = request.data['doorendtimevalue']
        doorendminutevalue = request.data['doorendminutevalue']
    
        waterlevelwarning = request.data['waterlevelwarning']
        watertempwarning = request.data['watertempwarning']
        tempwarning = request.data['tempwarning']
        humwarning = request.data['humwarning']
        soilwarning = request.data['soilwarning']
        
        try:
            
            try:
                smartfarm = SmartFarm.objects.get(sfid=request.data['smartfarm'])
                
            except SmartFarm.DoesNotExist:
                
                try:
                    # name = request.data.get('user')
                    user = User.objects.get(name= None)
                except User.DoesNotExist:
                    user = User.objects.create(name=None)
            
            # try:
            #     user = User.objects.get(user=request.data['user'])
            # except User.DoesNotExist:
            #     user = None
                
                try:
                    smartfarm = SmartFarm.objects.get(user=user,sfid=smartfarm)
                
                # try:
                #     smartfarm = SmartFarm.objects.get(user__isnull=False, sfid=smartfarm.sfid)
                # except SmartFarm.MultipleObjectsReturned:
                #     # 중복된 데이터가 있다면 가장 최근 데이터를 가져옵니다.
                #     smartfarm = SmartFarm.objects.filter(user=user, sfid=smartfarm).latest('id')
                except SmartFarm.DoesNotExist:
                    smartfarm =SmartFarm.objects.create(user=user, sfid=smartfarm)
            # except SmartFarm.MultipleObjectsReturned:
            #     # 중복된 데이터가 있다면 가장 최근 데이터를 가져옵니다.
            #     smartfarm = SmartFarm.objects.filter(user=user, sfid=smartfarm).latest('id')
            # user_smartfarm = SmartFarm.objects.filter(user=request.user, sfid=smartfarm)
            # if not user_smartfarm.exists():
            #     Response({'message': '스마트팜이 없거나 권한이 없습니다.'}, status=404)
            try:
                latest_sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
                latest_sensor = SmartFarmSensor.objects.latest('id')
                remotepower = latest_sensor.remotepower
            except SmartFarmSensor.DoesNotExist:
                latest_sensor = SmartFarmSensor()
                remotepower = remotepower
                
        # except SmartFarm.DoesNotExist:
        #     return Response({'message': '스마트팜이 없거나 권한이 없습니다.'}, status=404)
        # except SmartFarmSensor.DoesNotExist:
        #     return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
            # else:
            # for smartfarm in user_smartfarm:
            #     print("여기 들어옴?", remotepower)
            # if remotepower == True:
            #     SmartFarmSensor.objects.filter(smartfarm=smartfarm).update(
            #         smartfarm = smartfarm,
            #         remotepower = remotepower,
            #         temperature = temperature,
            #         humidity = humidity,
            #         waterlevelvoltage = waterlevelvoltage,
            #         watertemperature = watertemperature,
            #     # ).save()
            #     )
                
            # if remotepower == False:

            SmartFarmSensor(
                smartfarm = smartfarm,
                remotepower = remotepower,
                temperature = temperature,
                humidity = humidity,
                light = light,
                soil = soil,
                ledpower = ledpower,
                ledstate = ledstate,
                ledtoggle = ledtoggle,
                ledautotoggle = ledautotoggle,
                ledstarttimevalue = ledstarttimevalue,
                ledstartminutevalue = ledstartminutevalue,
                ledendtimevalue = ledendtimevalue,
                ledendminutevalue = ledendminutevalue,
                waterpumppower = waterpumppower,
                waterpumpstate = waterpumpstate,
                waterpumptoggle = waterpumptoggle,
                waterpumpautotoggle = waterpumpautotoggle,
                waterpumpstarttime = waterpumpstarttime,
                waterpumprunningtime = waterpumprunningtime,
                waterlevelvoltage = waterlevelvoltage,
                watertemperature = watertemperature,
                fanpower = fanpower,
                fanstate = fanstate,
                fantoggle = fantoggle,
                fanautotoggle = fanautotoggle,
                fanstarttimevalue = fanstarttimevalue,
                fanstartminutevalue = fanstartminutevalue,
                fanendtimevalue = fanendtimevalue,
                fanendminutevalue = fanendminutevalue,
                doorpower = doorpower,
                doorstate = doorstate,
                doortoggle = doortoggle,
                doorautotoggle = doorautotoggle,
                doorstarttimevalue = doorstarttimevalue,
                doorstartminutevalue = doorstartminutevalue,
                doorendtimevalue = doorendtimevalue,
                doorendminutevalue = doorendminutevalue,
                waterlevelwarning = waterlevelwarning,
                watertempwarning = watertempwarning,
                tempwarning = tempwarning,
                humwarning = humwarning,
                soilwarning = soilwarning,
            ).save()
            
            now_id = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            
            try:
                latest_id = SmartFarmSensor.objects.filter(smartfarm=smartfarm, id__lte=now_id.id-1).latest('id')
            # latest_id = SmartFarmSensor.objects.filter(smartfarm=smartfarm, id__lte=now_id.id-1).latest('id')
            # latest_id = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            except SmartFarmSensor.DoesNotExist:
                latest_id = None
            
            if latest_id is not None:
                now_fileds = {field: value for field, value in now_id.__dict__.items() if field != 'id' and field != '_state' and field != 'timestamp'}
                latest_fileds = {field: value for field, value in latest_id.__dict__.items() if field != 'id' and field != '_state' and field != 'timestamp'}
            
                if now_fileds == latest_fileds:   
                    now_id.delete()
                # print("now_fileds_af:", now_id.id)
                # print('latest_fileds_af: ', latest_id.id)
        
            waterlevelwarning = request.data.get("waterlevelwarning", "")
            send_push_notification(request, waterlevelwarning)
        
            watertempwarning = request.data.get("watertempwarning", "")
            send_push_notification2(request, watertempwarning)

            tempwarning = request.data.get("tempwarning", "")
            send_push_notification3(request, tempwarning)

            humwarning = request.data.get("humwarning", "")
            send_push_notification4(request, humwarning)

            soilwarning = request.data.get("soilwarning", "")
            send_push_notification5(request, soilwarning)
            
            latest_sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            latest_sensor = SmartFarmSensor.objects.latest('id')
            remotepower = latest_sensor.remotepower
                
        # except SmartFarm.DoesNotExist:
        #     return Response({'message': '스마트팜이 없거나 권한이 없습니다.'}, status=404)
        
        except Exception as e:
            return Response({'message': 'Error'+ str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        
        return Response({'remotepower': remotepower})
        # return Response({'su':'ccess_rsp'})
        # latest_id = SmartFarmSensor.objects.latest('id').id
        # remote = SmartFarmSensor.objects.filter(id=latest_id)
        # print(remote.first().remotepower, len(remote))
        # return Response({'remotepower': remote.first().remotepower})

          
class InfoView(generics.ListAPIView):
# class InfoView(APIView):
    # queryset = SmartFarmSensor.objects.all()
    serializer_class = InfoListModelSerializer

    def post(self, request):
        remotepower = request.data['remotepower']
        
        # try:
        #     smartfarm = SmartFarm.objects.get(user=request.user)
        # except SmartFarmSensor.DoesNotExist:
        #     return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        
        try:
            userin = self.request.user
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            existing_sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            
            sensor = copy.copy(existing_sensor)
            
            sensor.id = None
            sensor.remotepower = remotepower
            sensor.save()
            
        
        # SmartFarmSensor(smartfarm=smartfarm, remotepower=remotepower).save()
        # latest_id = SmartFarmSensor.objects.latest('id').id
        # SmartFarmSensor.objects.filter(id=latest_id).update(smartfarm=smartfarm, remotepower=remotepower)
            return Response({"message": "Info 제어 성공"}, status=200)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_queryset(self):
        # 최신 ID 값을 기준으로 QuerySet 필터링
        try:
            userin = self.request.user                
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            return SmartFarmSensor.objects.filter(id=sensor.id)

        except not SmartFarmSensor.objects.filter(user=userin).exists():
            return Response({'message': '해당 사용자 정보가 없습니다.'}, status=404)
        except SmartFarm.DoesNotExist:
            return Response({'message': '스마트팜 등록을 해주세요'}, status=404)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': 'Info Error.'}, status=500)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class LedView(generics.ListAPIView):
    # queryset = SmartFarmSensor.objects.all()
    serializer_class = LedListModelSerializer
    
    def post(self, request):   
        ledtoggle = request.data['ledtoggle']
        ledautotoggle = request.data['ledautotoggle']
        ledstarttimevalue = request.data['ledstarttimevalue']
        ledstartminutevalue = request.data['ledstartminutevalue']
        ledendtimevalue = request.data['ledendtimevalue']
        ledendminutevalue = request.data['ledendminutevalue']

        try:
            # smartfarm = SmartFarm.objects.get(user=request.user)
            userin = self.request.user
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            existinng_sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            # return SmartFarmSensor.objects.filter(id=sensor.id)
            # try:
            #     SmartFarmSensor.objects.get(smartfarm=smartfarm)
            # except SmartFarmSensor.DoesNotExist:
            #     return Response({'message': '스마트팜 센서 데이터가 없습니다.'}, status=404)
            
            sensor = copy.copy(existinng_sensor)
            
            sensor.id = None
            sensor.ledtoggle = ledtoggle
            sensor.ledautotoggle = ledautotoggle
            sensor.ledstarttimevalue = ledstarttimevalue
            sensor.ledstartminutevalue = ledstartminutevalue
            sensor.ledendtimevalue = ledendtimevalue
            sensor.ledendminutevalue = ledendminutevalue
            sensor.save()
            # SmartFarmSensor(smartfarm=smartfarm, ledtoggle=ledtoggle, 
                        # ledautotoggle=ledautotoggle, ledstarttimevalue=ledstarttimevalue, 
                        # ledstartminutevalue=ledstartminutevalue, ledendtimevalue=ledendtimevalue, 
                        # ledendminutevalue=ledendminutevalue).save()
            
            return Response({"message": "LED 제어 성공"}, status=200)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
 
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_queryset(self):
        # 최신 ID 값을 기준으로 QuerySet 필터링
        try:
            userin = self.request.user                
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            return SmartFarmSensor.objects.filter(id=sensor.id)
        except not SmartFarmSensor.objects.filter(user=userin).exists():
            return Response({'message': '해당 사용자 정보가 없습니다.'}, status=404)
        except SmartFarm.DoesNotExist:
            return Response({'message': '스마트팜 등록을 해주세요'}, status=404)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': 'LED Error.'}, status=500)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class WaterView(generics.ListAPIView):
    # queryset = SmartFarmSensor.objects.all()
    serializer_class = WaterListModelSerializer
    
    def post(self, request):   
        waterpumptoggle = request.data['waterpumptoggle']
        waterpumpautotoggle = request.data['waterpumpautotoggle']
        waterpumpstarttime = request.data['waterpumpstarttime']
        waterpumprunningtime = request.data['waterpumprunningtime']

        try:
            userin = self.request.user
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            existinng_sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            
            sensor = copy.copy(existinng_sensor)

            sensor.id = None
            sensor.waterpumptoggle = waterpumptoggle
            sensor.waterpumpautotoggle = waterpumpautotoggle
            sensor.waterpumpstarttime = waterpumpstarttime
            sensor.waterpumprunningtime = waterpumprunningtime
            sensor.save()
            
            # SmartFarmSensor(smartfarm=smartfarm, waterpumptoggle=waterpumptoggle, 
            #     waterpumpautotoggle=waterpumpautotoggle, waterpumpstarttime=waterpumpstarttime, 
            #     waterpumprunningtime=waterpumprunningtime).save()
        
            return Response({"message": "Water 제어 성공"}, status=200)
            
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    def get_queryset(self):
        # 최신 ID 값을 기준으로 QuerySet 필터링
        try:
            userin = self.request.user                
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            return SmartFarmSensor.objects.filter(id=sensor.id)
        except not SmartFarmSensor.objects.filter(user=userin).exists():
            return Response({'message': '해당 사용자 정보가 없습니다.'}, status=404)
        except SmartFarm.DoesNotExist:
            return Response({'message': '스마트팜 등록을 해주세요'}, status=404)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': 'Water Error.'}, status=500)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
class FanView(generics.ListAPIView):
    # queryset = SmartFarmSensor.objects.all()
    serializer_class = FanListModelSerializer
    
    def post(self, request):   
        fantoggle = request.data['fantoggle']
        fanautotoggle = request.data['fanautotoggle']
        fanstarttimevalue = request.data['fanstarttimevalue']
        fanstartminutevalue = request.data['fanstartminutevalue']
        fanendtimevalue = request.data['fanendtimevalue']
        fanendminutevalue = request.data['fanendminutevalue']

        try:
            userin = self.request.user
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            existinng_sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            
            sensor = copy.copy(existinng_sensor)

            sensor.id = None
            sensor.fantoggle = fantoggle
            sensor.fanautotoggle = fanautotoggle
            sensor.fanstarttimevalue = fanstarttimevalue
            sensor.fanstartminutevalue = fanstartminutevalue
            sensor.fanendtimevalue = fanendtimevalue
            sensor.fanendminutevalue = fanendminutevalue
            sensor.save()
            
            # SmartFarmSensor(smartfarm=smartfarm, fantoggle=fantoggle, fanautotoggle=fanautotoggle, 
            #     fanstarttimevalue=fanstarttimevalue, fanstartminutevalue=fanstartminutevalue, 
            #     fanendtimevalue=fanendtimevalue, fanendminutevalue=fanendminutevalue).save()
            
            return Response({"message": "Fan 제어 성공"}, status=200)
        except SmartFarm.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_queryset(self):
        # 최신 ID 값을 기준으로 QuerySet 필터링
        try:
            userin = self.request.user                
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            return SmartFarmSensor.objects.filter(id=sensor.id)
        except not SmartFarmSensor.objects.filter(user=userin).exists():
            return Response({'message': '해당 사용자 정보가 없습니다.'}, status=404)
        except SmartFarm.DoesNotExist:
            return Response({'message': '스마트팜 등록을 해주세요'}, status=404)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': 'Fan Error.'}, status=500)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DoorView(generics.ListAPIView):
    # queryset = SmartFarmSensor.objects.all()
    serializer_class = DoorListModelSerializer
    
    def post(self, request):
        doortoggle = request.data['doortoggle']
        doorautotoggle = request.data['doorautotoggle']
        doorstarttimevalue = request.data['doorstarttimevalue']
        doorstartminutevalue = request.data['doorstartminutevalue']
        doorendtimevalue = request.data['doorendtimevalue']
        doorendminutevalue = request.data['doorendminutevalue']
        
        try:
            userin = self.request.user
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            existinng_sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            
            sensor = copy.copy(existinng_sensor)

            sensor.id = None
            sensor.doortoggle = doortoggle
            sensor.doorautotoggle = doorautotoggle
            sensor.doorstarttimevalue = doorstarttimevalue
            sensor.doorstartminutevalue = doorstartminutevalue
            sensor.doorendtimevalue = doorendtimevalue
            sensor.doorendminutevalue = doorendminutevalue
            sensor.save()
            
            # SmartFarmSensor(smartfarm=smartfarm, doortoggle=doortoggle, doorautotoggle=doorautotoggle, 
            #             doorstarttimevalue=doorstarttimevalue, doorstartminutevalue=doorstartminutevalue, 
            #             doorendtimevalue=doorendtimevalue, doorendminutevalue=doorendminutevalue).save()
        
            return Response({"message": "Door 제어 성공"}, status=200)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_queryset(self):
        # 최신 ID 값을 기준으로 QuerySet 필터링
        try:
            userin = self.request.user                
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            return SmartFarmSensor.objects.filter(id=sensor.id)
        except not SmartFarmSensor.objects.filter(user=userin).exists():
            return Response({'message': '해당 사용자 정보가 없습니다.'}, status=404)
        except SmartFarm.DoesNotExist:
            return Response({'message': '스마트팜 등록을 해주세요'}, status=404)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': 'Door Error.'}, status=500)
        except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class WarningView(generics.ListAPIView):
    # queryset = SmartFarmSensor.objects.all()
    # serializer_class = WarningListModelSerializer
    
    # post시, delete
    # def post(self, request):
    #     # waterlevelwarning = request.data['waterlevelwarning']
    #     # watertempwarning = request.data['watertempwarning']
    #     # tempwarning = request.data['tempwarning']
    #     # humwarning = request.data['humwarning']
    #     # soilwarning = request.data['soilwarning']
        
    #     try:
    #         smartfarm = SmartFarm.objects.get(user=request.user)
    #     except SmartFarmSensor.DoesNotExist:
    #         return Response({'message': '등록한 스마트팜이 없습니다.'}, status=status.HTTP_NOT_FOUND)
        
    #     smartfarmSensor = SmartFarmSensor.objects.get(smartfarm=smartfarm)
    #     smartfarmSensor.waterlevelwarning = ''
    #     smartfarmSensor.watertempwarning = ''
    #     smartfarmSensor.tempwarning = ''
    #     smartfarmSensor.humwarning = ''
    #     smartfarmSensor.soilwarning = ''
    #     smartfarmSensor.save()
        
    #     return Response({'message': '경고 값이 초기화되었습니다.'}, status=status.HTTP_OK)
        
        # if not waterlevelwarning or not watertempwarning or not tempwarning or not humwarning or not soilwarning:
        #     return Response({'message': '경고메세지가 없습니다.'}, status=status.HTTP_OK)
        
        # SmartFarmSensor(smartfarm=smartfarm, waterlevelwarning=waterlevelwarning,
        #                 watertempwarning=watertempwarning, tempwarning=tempwarning,
        #                 humwarning=humwarning, soilwarning=soilwarning).save()
        
    #     return Response({'su':'ccess_warning'})
            
# warninglist GET (jiwon이용)
@api_view(['GET'])
def get_warning(request):

    date = timezone.now() - timezone.timedelta(days=90)
    
    warning_result = []
    
    try:
        userin = request.user
        smartfarm = SmartFarm.objects.get(user=userin)
        warning = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
        
        # queryset = SmartFarmSensor.objects.filter(Q(id__gte=warning.id - 90) & Q(id__lte=warning.id)).exclude(
        #         Q(waterlevelwarning=None) & Q(watertempwarning=None) & Q(tempwarning=None) & Q(humwarning=None) & Q(soilwarning=None)).annotate(
        #             time=TruncDate('timestamp'), body=F('waterlevelwarning') | F('watertempwarning') | F('tempwarning') | F('humwarning') | F('soilwarning')).values(
        #             ('body', 'time')
        #             )
        queryset = SmartFarmSensor.objects.filter(smartfarm=smartfarm, timestamp__gte=date).exclude(
                Q(waterlevelwarning=None) & Q(watertempwarning=None) & Q(tempwarning=None) & Q(humwarning=None) & Q(soilwarning=None)).values(
                    'waterlevelwarning', 'watertempwarning', 'tempwarning', 'humwarning', 'soilwarning', 'timestamp'
                )

        for idx, item in enumerate(queryset):
            warning = {
                'id' : idx + 1,
                'body' : ', '.join([v for k, v in item.items() if k != 'timestamp' and v != '']),
                'time' : item['timestamp'].strftime('%Y-%m-%d %H:%M:%S')
            }
            
            if warning['body']:
                warning_result.append(warning)
                
        # for i in range(len(queryset)):
        #     warning_list = {k : v for k, v in queryset[i].items() if v != ""}
        #     if warning_list:
        #         warning_result.append(warning_list)
    
        return Response(warning_result)
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록된 스마트팜이 없습니다.'}, status=404)

    except SmartFarmSensor.DoesNotExist:
        return Response({'message': '등록한 스마트팜 센서 값이 없습니다.'}, status=404)
    
    except Exception as e:
            return Response({'message': 'Error' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

        
    # def get_queryset(self):
    #     # 최신 ID 값을 기준으로 QuerySet 필터링
    #     date = timezone.now() - timezone.timedelta(days=90)
        
    #     try:
    #         userin = self.request.user
    #         smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
    #         sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
    #         # queryset = SmartFarmSensor.objects.filter(Q(id__gte=F('id')-90)&Q(id__lte=F('id')))
    #         queryset = SmartFarmSensor.objects.filter(Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)).exclude(
    #             Q(waterlevelwarning=None) & Q(watertempwarning=None) & Q(tempwarning=None) & Q(humwarning=None) & Q(soilwarning=None))
            
    #         return queryset
            # queryset = []
            
            # warninglist = []
            # for i in queryset:
            #     queryset.append(queryset)
            #     print(queryset)
            #     if queryset[i] != "":
            #         warninglist[i] = queryset[i]
            #         print(warninglist[i])
                    # warninglist[i] = queryset[i]
            # for item in queryset:
            #     warning = {
            #         "waterlevelwarning" : item.waterlevelwarning if item.waterlevelwarning != "" else None,
            #         "watertempwarning" : item.watertempwarning if item.watertempwarning != "" else None,
            #         "tempwarning" : item.tempwarning if item.tempwarning != "" else None,
            #         "humwarning" : item.humwarning if item.humwarning != "" else None,
            #         "soilwarning" : item.soilwarning if item.soilwarning != "" else None,
            #     }
                # if warning != "":
                # warninglist.append(warning)
                # if queryset[i] != "":
                #     warninglist[i] = queryset[i]
                             
            # queryset = SmartFarmSensor.objects.filter(
            #     Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)
            # ).exclude(
            #    Q(waterlevelwarning__exact='') | Q(waterlevelwarning__isnull=True)
            # )
            # return warninglist
    
        # except SmartFarmSensor.DoesNotExist:
        #     return Response({'message': 'Warning Error.'}, status=500)
            
            # queryset = SmartFarmSensor.objects.filter(Q(id__gte=F('id')-90) & Q(id__lte=F('id'))).exclude(waterlevelwarning="", watertempwarning="", tempwarning="", humwarning="", soilwarning="")
                # & ~Q(waterlevelwarning=NULL) & ~Q(watertempwarning='') & ~Q(tempwarning='') & ~Q(humwarning='') & ~Q(soilwarning=''))
            
            # 빈 문자열을 가진 레코드를 필터링
            # filtered_queryset = [item for item in queryset if any(
            #     [field for field in [item.waterlevelwarning, item.watertempwarning, item.tempwarning, item.humwarning, item.soilwarning] if field]
            # )]
            # filtered_queryset = [item for item in queryset if any(
            #     [field for field in [item.waterlevelwarning, item.watertempwarning, item.tempwarning, item.humwarning, item.soilwarning] if field is not None and field != ""]
            # )]
            # queryset = SmartFarmSensor.objects.filter(Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)).exclude(
            #     Q(waterlevelwarning=None) | Q(waterlevelwarning='')
            # )

            # queryset = SmartFarmSensor.objects.filter(Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)).exclude(
            #     Q(watertempwarning=None) | Q(watertempwarning='')
            # )

            # queryset = SmartFarmSensor.objects.filter(Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)).exclude(
            #     Q(tempwarning=None) | Q(tempwarning='')
            # )

            # queryset = SmartFarmSensor.objects.filter(Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)).exclude(
            #     Q(humwarning=None) | Q(humwarning='')
            # )

            # queryset = SmartFarmSensor.objects.filter(Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)).exclude(
            #     Q(soilwarning=None) | Q(soilwarning='')
            # )
        # Q(watertempwarning=None) | Q(watertempwarning='') |
        #         Q(tempwarning=None) | Q(tempwarning='') |
        #         Q(humwarning=None) | Q(humwarning='') |
        #         Q(soilwarning=None) | Q(soilwarning='')
            #     item.waterlevelwarning != "" or
            #     item.watertempwarning != "" or
            #     item.tempwarning != "" or
            #     item.humwarning != "" or
            #     item.soilwarning != ""
            # )]

        
    
    # def get(self, request):
    #     try:
    #         smartfarm = SmartFarm.objects.get(user=request.user)
    #         smartfarm = SmartFarm.objects.order_by('user').last()
    #         query = SmartFarmSensor.objects.filter(smartfarm=smartfarm).values()
            
    #         # query = SmartFarmSensor.objects.aggregate(id=Max(id))
    #         return Response(query, status=200)
    #     except SmartFarmSensor.DoesNotExist:
    #         return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        

        # try:
        #     latest_id = SmartFarmSensor.objects.latest('id').id
        #     queryset = list(SmartFarmSensor.objects.filter(id=latest_id).values()& SmartFarmSensor.objects.filter(user=request.user).values())
            # queryset = SmartFarmSensor.objects.filter(user=request.user)
            # queryset = list(SmartFarmSensor.objects.filter(id=latest_id).values())
            # smartfarm = list(SmartFarmSensor.objects.filter(user=request.user).values())
        #     return Response(queryset, status=status.HTTP_200_OK)

        # except SmartFarmSensor.DoesNotExist:
        #     return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        
        # soil = request.get(soil=soil)
    
        # ledpower = request.get(ledpower=ledpower)
        # ledstate = request.get(ledstate=ledstate)
        # ledtoggle = request.get(ledtoggle=ledtoggle)
        # ledautotoggle = request.get(ledautotoggle=ledautotoggle)
        # ledstarttimevalue = request.get(ledstarttimevalue=ledstarttimevalue)
        # ledstartminutevalue = request.get(ledstartminutevalue=ledstartminutevalue)
        # ledendtimevalue = request.get(ledendtimevalue=ledendtimevalue)
        # ledendminutevalue = request.get(ledendminutevalue=ledendminutevalue)
    
        # waterpumppower = request.get(waterpumppower=waterpumppower)
        # waterpumpstate = request.get(waterpumpstate=waterpumpstate)
        # waterpumptoggle = request.get(waterpumptoggle=waterpumptoggle)
        # waterpumpautotoggle = request.get(waterpumpautotoggle=waterpumpautotoggle)
        # waterpumpstarttime = request.get(waterpumpstarttime=waterpumpstarttime)
        # waterpumprunningtime = request.get(waterpumprunningtime=waterpumprunningtime)
        # waterlevelvoltage = request.get(waterlevelvoltage=waterlevelvoltage)
        # watertemperature = request.get(watertemperature=watertemperature)
    
        # fanpower = request.get(fanpower=fanpower)
        # fanstate = request.get(fanstate=fanstate)
        # fantoggle = request.get(fantoggle=fantoggle)
        # fanautotoggle = request.get(fanautotoggle=fanautotoggle)
        # fanstarttimevalue = request.get(fanstarttimevalue=fanstarttimevalue)
        # fanstartminutevalue = request.get(fanstartminutevalue=fanstartminutevalue)
        # fanendtimevalue = request.get(fanendtimevalue=fanendtimevalue)
        # fanendminutevalue = request.get(fanendminutevalue=fanendminutevalue)

        # doorpower = request.get(doorpower=doorpower)
        # doorstate = request.get(doorstate=doorstate)
        # doortoggle = request.get(doortoggle=doortoggle)
        # doorautotoggle = request.get(doorautotoggle=doorautotoggle)
        # doorstarttimevalue = request.get(doorstarttimevalue=doorstarttimevalue)
        # doorstartminutevalue = request.get(doorstartminutevalue=doorstartminutevalue)
        # doorendtimevalue = request.get(doorendtimevalue=doorendtimevalue)
        # doorendminutevalue = request.get(doorendminutevalue=doorendminutevalue)
    
        # waterlevelwarning = request.get(waterlevelwarning=waterlevelwarning)
        # watertempwarning = request.get(watertempwarning=watertempwarning)
        # tempwarning = request.get(tempwarning=tempwarning)
        # humwarning = request.get(humwarning=humwarning)
        # soilwarning = request.get(soilwarning=soilwarning)
        