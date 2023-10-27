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

# from cap.fcm_notification import send_push_notification, send_push_notification2, send_push_notification3, send_push_notification4, send_push_notification5

# from rest_framework.authtoken.models import Token

from .models import SmartFarmSensor, SmartFarm, User
from .serializers import DoorListModelSerializer, FanListModelSerializer, InfoListModelSerializer, LedListModelSerializer, SmartFarmBaseModelSerializer, WarningListModelSerializer, WaterListModelSerializer
from django.core import serializers

# from .accounts.models import User
import firebase_admin
from firebase_admin import credentials, initialize_app
from firebase_admin import messaging

json_path = "/home/dfx/naro/cap/smartfarmKey.json"
path = credentials.Certificate(json_path)
# firebase_admin.initialize_app(path)
initialize_app(path, name='smartfarm')

def send_push_notification(request, waterlevelwarning):
    user = User.objects.get(username=request.user)

    # fcm_token 가져오기
    registration_token = user.fcm_token

    if waterlevelwarning != "":
        print("waterlevelwarning 메세지가 있습니다.")
        
        message = messaging.Message(
        notification=messaging.Notification(
                title = '스마트팜 경고!',
                body = '스마트팜 물 높이를 확인해주세요.'
            ),
        token = registration_token,
        )
        
        try:
            response = messaging.send(message)
            # 전송 결과 출력
            print('Successfully sent message:', response)
            return Response({'message': 'waterlevelwarning FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
        except Exception as e:
            return Response({'message': 'waterlevelwarning FCM 메시지 전송 중 오류가 발생했습니다.'}, status=500)
    return Response({'message' : 'waterlevelwarning 경고 메시지가 없습니다.'}, status=200)
        
def send_push_notification2(request, watertempwarning):
    user = User.objects.get(username=request.user)

    # fcm_token 가져오기
    registration_token = user.fcm_token

    if watertempwarning != "":
        print("watertempwarning 메세지가 있습니다.")
        
        message = messaging.Message(
        notification=messaging.Notification(
                title = '스마트팜 경고!',
                body = '스마트팜 물 온도를 확인해주세요.'
            ),
        token = registration_token,
        )
        
        try:
            response = messaging.send(message)
            # 전송 결과 출력
            print('Successfully sent message:', response)
            return Response({'message': 'watertempwarning FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
        except Exception as e:
            return Response({'message': 'watertempwarning FCM 메시지 전송 중 오류가 발생했습니다.'}, status=500)
    return Response({'message' : 'watertempwarning 경고 메시지가 없습니다.'}, status=200)
    
def send_push_notification3(request, tempwarning):
    user = User.objects.get(username=request.user)

    # fcm_token 가져오기
    registration_token = user.fcm_token

    if tempwarning != "":
        print("tempwarning 메세지가 있습니다.")
        
        message = messaging.Message(
        notification=messaging.Notification(
                title = '스마트팜 경고!',
                body = '스마트팜 내부 온도를 확인해주세요.'
            ),
        token = registration_token,
        )
        
        try:
            response = messaging.send(message)
            # 전송 결과 출력
            print('Successfully sent message:', response)
            return Response({'message': 'tempwarning FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
        except Exception as e:
            return Response({'message': 'tempwarning FCM 메시지 전송 중 오류가 발생했습니다.'}, status=500)
    return Response({'message' : 'tempwarning 경고 메시지가 없습니다.'}, status=200)
    
def send_push_notification4(request, humwarning):
    user = User.objects.get(username=request.user)

    # fcm_token 가져오기
    registration_token = user.fcm_token

    if humwarning != "":
        print("humwarning 메세지가 있습니다.")
        
        message = messaging.Message(
        notification=messaging.Notification(
                title = '스마트팜 경고!',
                body = '스마트팜 내부 습도가 높습니다.'
            ),
        token = registration_token,
        )
        
        try:
            response = messaging.send(message)
            # 전송 결과 출력
            print('Successfully sent message:', response)
            return Response({'message': 'humwarning FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
        except Exception as e:
            return Response({'message': 'humwarning FCM 메시지 전송 중 오류가 발생했습니다.'}, status=500)
    return Response({'message' : 'humwarning 경고 메시지가 없습니다.'}, status=200)
    
def send_push_notification5(request, soilwarning):
    user = User.objects.get(username=request.user)

    # fcm_token 가져오기
    registration_token = user.fcm_token

    if soilwarning != "":
        print("soilwarning 메세지가 있습니다.")
        
        message = messaging.Message(
        notification=messaging.Notification(
                title = '스마트팜 경고!',
                body = '스마트팜 내부가 건조합니다.'
            ),
        token = registration_token,
        )
        
        try:
            response = messaging.send(message)
            # 전송 결과 출력
            print('Successfully sent message:', response)
            return Response({'message': 'soilwarning FCM 메시지가 성공적으로 전송되었습니다.'}, status=200)
        except Exception as e:
            return Response({'message': 'soilwarning FCM 메시지 전송 중 오류가 발생했습니다.'}, status=500)
    return Response({'message' : 'soilwarning 경고 메시지가 없습니다.'}, status=200)
    
# 스마트팜 고유번호 확인
@api_view(['POST'])
@permission_classes([AllowAny])
def check_smartfarm_id_view(request):
    sfid = request.data['sfid']
    try:
        existing_smartfarm = SmartFarm.objects.filter(sfid=sfid)
        if existing_smartfarm.exists():
            return Response({'message': '이미 등록되어 있는 스마트팜입니다.'}, status=400)
        else:
            return Response({'message': '등록되어 있지 않는 스마트팜입니다.'}, status=200)
    except Exception as e:
        return Response({'message': 'Error'+ str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    


# 스마트팜 등록      
@api_view(['POST'])
def register_smartfarm_view(request):
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=status.HTTP_404_NOT_FOUND)
    
    # 사용자 스마트팜 등록 여부 확인 후 등록하기
    sfid = request.data['sfid']
    existing_smartfarms = SmartFarm.objects.filter(user=user, sfid=sfid)
    if existing_smartfarms.exists():
        return Response({'message': '이미 등록된 스마트팜이 있습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    smartfarm = SmartFarm.objects.create(user=user, sfid=sfid)
    smartfarm.save()
    
    # 스마트팜 센서 등록하기
    smartfarmSensor = SmartFarmSensor.objects.create(smartfarm=smartfarm)
    smartfarmSensor.id = None
    smartfarmSensor.save()
    
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
        smartfarm = SmartFarm.objects.filter(user=user)
        smartfarm.delete()
        
        return Response({'message': '스마트팜이 삭제되었습니다.'}, status=200)
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 스마트팜입니다.'}, status=404)

# 스마트팜 센서 정보 GET (raspberry이용)
@api_view(['GET'])
def get_smartfarm_sensor(request, smartfarm_id):
        try:
            userin = request.user
            smartfarm = SmartFarm.objects.get(sfid=smartfarm_id, user=userin)
            sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            sensor_serializer = SmartFarmBaseModelSerializer(sensor)
            sensor_data = sensor_serializer.data
            sensor_data["smartfarm"] = smartfarm.sfid
            return Response(sensor_data)
        
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜 센서 값이 없습니다.'}, status=404)

        except SmartFarm.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)

# Create your views here.
# class RaspberryView(APIView):
class RaspberryView(generics.ListAPIView):
    # queryset = SmartFarmSensor.objects.all()
    serializer_class = SmartFarmBaseModelSerializer
    
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    # def get_smartfarm_sensor(self, smartfarm_id):
    #     try:
    #         userin = self.request.user
    #         smartfarm = SmartFarm.objects.get(id=smartfarm_id, user=userin)
    #         sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
    #         # smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
    #         # sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
    #         # print()
    #         return SmartFarmSensor.objects.filter(id=sensor.id)
            
    #     except SmartFarmSensor.DoesNotExist:
    #         return Response({'message': '등록한 스마트팜 센서 값이 없습니다.'}, status=404)

    #     except SmartFarm.DoesNotExist:
    #         return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)

    def post(self, request):
        # smartfarm = request.data['smartfarm']
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
        
        smartfarm = request.data.get('smartfarm')
        try:
            user_smartfarm = SmartFarm.objects.filter(user=request.user, sfid=smartfarm)
            if not user_smartfarm.exists():
                return Response({'message': '스마트팜이 없거나 권한이 없습니다.'}, status=404)
        except SmartFarm.DoesNotExist:
            return Response({'message': '스마트팜이 없거나 권한이 없습니다.'}, status=404)
        # except SmartFarmSensor.DoesNotExist:
        #     return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        
        for smartfarm in user_smartfarm:
        #     if remotepower == False:
        #         return Response({'message': '원격조정이 불가합니다.'}, status=200)
        
            SmartFarmSensor(
                smartfarm=smartfarm,
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
                
            return Response({'su':'ccess_rsp'})

          
class InfoView(generics.ListAPIView):
# class InfoView(APIView):
    # queryset = SmartFarmSensor.objects.all()
    serializer_class = InfoListModelSerializer

    def post(self, request):
        remotepower = request.data['remotepower']
        
        try:
            smartfarm = SmartFarm.objects.get(user=request.user)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        
        SmartFarmSensor(smartfarm=smartfarm, remotepower=remotepower).save()
        
        # latest_id = SmartFarmSensor.objects.latest('id').id
        # SmartFarmSensor.objects.filter(id=latest_id).update(remotepower=remotepower)
        return Response({'su':'ccess_info'})

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
            
            return Response({'su':'ccess_led'})
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
 
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
        
            return Response({'su':'ccess_water'})
            
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)

        
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
            
            return Response({'su':'ccess_fan'})
        except SmartFarm.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        
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
        
            return Response({'su':'ccess_door'})
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=404)
        
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
    
class WarningView(generics.ListAPIView):
    # queryset = SmartFarmSensor.objects.all()
    serializer_class = WarningListModelSerializer
    
    # post시, delete
    def post(self, request):
        # waterlevelwarning = request.data['waterlevelwarning']
        # watertempwarning = request.data['watertempwarning']
        # tempwarning = request.data['tempwarning']
        # humwarning = request.data['humwarning']
        # soilwarning = request.data['soilwarning']
        
        try:
            smartfarm = SmartFarm.objects.get(user=request.user)
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜이 없습니다.'}, status=status.HTTP_NOT_FOUND)
        
        smartfarmSensor = SmartFarmSensor.objects.get(smartfarm=smartfarm)
        smartfarmSensor.waterlevelwarning = ''
        smartfarmSensor.watertempwarning = ''
        smartfarmSensor.tempwarning = ''
        smartfarmSensor.humwarning = ''
        smartfarmSensor.soilwarning = ''
        smartfarmSensor.save()
        
        return Response({'message': '경고 값이 초기화되었습니다.'}, status=status.HTTP_OK)
        
        # if not waterlevelwarning or not watertempwarning or not tempwarning or not humwarning or not soilwarning:
        #     return Response({'message': '경고메세지가 없습니다.'}, status=status.HTTP_OK)
        
        # SmartFarmSensor(smartfarm=smartfarm, waterlevelwarning=waterlevelwarning,
        #                 watertempwarning=watertempwarning, tempwarning=tempwarning,
        #                 humwarning=humwarning, soilwarning=soilwarning).save()
        
    #     return Response({'su':'ccess_warning'})
        
    def get_queryset(self):
        # 최신 ID 값을 기준으로 QuerySet 필터링
        date = timezone.now() - timezone.timedelta(days=90)
        
        try:
            userin = self.request.user
            smartfarm = SmartFarm.objects.filter(user=userin).latest('sfid')
            sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
            # queryset = SmartFarmSensor.objects.filter(Q(id__gte=F('id')-90)&Q(id__lte=F('id')))
            queryset = SmartFarmSensor.objects.filter(Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)).exclude(
                Q(waterlevelwarning=None) & Q(watertempwarning=None) & Q(tempwarning=None) & Q(humwarning=None) & Q(soilwarning=None))

            # queryset = SmartFarmSensor.objects.filter(
            #     Q(id__gte=sensor.id - 90) & Q(id__lte=sensor.id)
            # ).exclude(
            #    Q(waterlevelwarning__exact='') | Q(waterlevelwarning__isnull=True)
            # )
            return queryset
        
        except SmartFarmSensor.DoesNotExist:
            return Response({'message': 'Warning Error.'}, status=500)
            
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
        