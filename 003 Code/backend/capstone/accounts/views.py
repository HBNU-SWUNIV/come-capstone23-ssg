from django.contrib.auth import authenticate

from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

import string, random

from accounts.models import User
from server.serializers import SmartFarmSensorBaseModelSerializer
from crops.models import SmartFarmCrop
from server.models import SmartFarm, SmartFarmSensor

# Create your views here.
# 회원가입
@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    name = request.data['name']
    username = request.data['username']
    phone_number = request.data['phone_number']
    password = request.data['password']

    # 아이디 중복 확인
    if User.objects.filter(username=username).exists():
        return Response({'message': '이미 가입된 아이디입니다.'}, status=405)

    # 전화번호 중복 확인
    if User.objects.filter(phone_number=phone_number).exists():
        return Response({'message': '이미 가입된 전화번호입니다.'}, status=405)
    
    user = User.objects.create_user(
        name=name,
        username=username,
        phone_number=phone_number,
        password=password,
    )

    user.save()

    return Response(status=200)


# 로그인
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data['username']
    password = request.data['password']
    fcm_token = request.data.get('fcm_token')
    fcm_webtoken = request.data.get('fcm_webtoken')

    user = authenticate(request, username=username, password=password)
    
    # fcm_token, fcm_webtoken 받기
    if fcm_token:
        user.fcm_token = fcm_token
        user.save()
    elif fcm_webtoken:
        user.fcm_webtoken = fcm_webtoken
        user.save()
    else:
        Response({'message': '알람이 가지 않습니다.'}, status=200)
        # return Response({'message': '토큰이 없습니다.'}, status=401)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)

        return Response({'token': token.key})
    else:
        return Response({'message': '비밀번호를 잘못 입력했습니다.'}, status=401)

# 로그인 확인 후 전체 값 렌더링
@api_view(['GET'])
def check_view(request):
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
    try:
        smartfarm = SmartFarm.objects.get(user=user)
        sensor = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id')
        sensor_serializer = SmartFarmSensorBaseModelSerializer(sensor)
        sensor_data = sensor_serializer.data
        
        sensor_data['name'] = user.name
        # sensor_data['remotepower'] = sensor.remotepower is not None
        sensor_data['smartfarm_check'] = smartfarm is not None
        sensor_data['smartfarm'] = smartfarm.sfid if smartfarm else ""
        
        crop = SmartFarmCrop.objects.get(smartfarm=smartfarm) if smartfarm else None
        sensor_data['crop_check'] = crop is not None
        sensor_data['crop_name'] = crop.name if crop else ""
        sensor_data['crop_day'] = crop.day if crop else ""
        
        ndvi = SmartFarmCrop.objects.filter(smartfarm=smartfarm).latest('id') if smartfarm else None
        sensor_data['ndvi'] = ndvi.ndvi if crop else ""
        
        return Response(sensor_data)
    
    except SmartFarmSensor.DoesNotExist:
            return Response({'message': '등록한 스마트팜 센서 값이 없습니다.'}, status=404)

    except SmartFarmCrop.DoesNotExist:

        sensor_data['name'] = user.name
        sensor_data['smartfarm_check'] = smartfarm is not None
        sensor_data['smartfarm'] = smartfarm.sfid is not None
        sensor_data['crop_check'] = False
        sensor_data['crop_name'] = ''
        sensor_data['crop_day'] = ''
        sensor_data['ndvi'] = ndvi.ndvi if crop else ""
        
        return Response(sensor_data, status=200)
    
    except SmartFarm.DoesNotExist:
        sensor_data = {
            'name': user.name,
            'smartfarm_check': False,
            'smartfarm': '',
            'crop_check': False,
            'crop_name': '',
            'crop_day': '',
            'ndvi': ndvi.ndvi if crop else ""
        }
        
        return Response(sensor_data, status=200)
    
    # # 스마트팜 가져오기
    # try:
    #     smartfarm = SmartFarm.objects.get(user=user)
    # except SmartFarm.DoesNotExist:
    #     smartfarm = None
    
    # # 작물 가져오기
    # try:
    #     crop = SmartFarmCrop.objects.get(smartfarm=smartfarm)
    # except SmartFarmCrop.DoesNotExist:
    #     crop = None
    
    # # remotepower 가져오기
    # remotepower = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id').remotepower
    # if remotepower == None:
    #     remotepower = False
        
    # # temperature 가져오기
    # temperature = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id').temperature
    # if temperature == None:
    #     temperature = 0
        
    # # humidity 가져오기
    # humidity = SmartFarmSensor.objects.filter(smartfarm=smartfarm).latest('id').humidity
    # if humidity == None:
    #     humidity = 0
    # # ndvi 가져오기
    # ndvi = SmartFarmCrop.objects.filter(smartfarm=smartfarm).latest('id').ndvi
    # if ndvi == None:
    #     ndvi = 0
        
    # data = {
    #     'username' : user.username if user else '',
    #     'smartfarm_check' : smartfarm is not None,
    #     'smartfarm' : smartfarm.sfid,
    #     'remotepower' : remotepower,
    #     'temperature' : temperature,
    #     'humidity' : humidity,
    #     'crop_check' : crop is not None,
    #     'crop_name' : crop.name,
    #     'crop_day' : crop.day,
    #     'ndvi' : ndvi,
    # }
    
    # return Response(data, status=200)
    # return Response({'message': '로그인이 확인되었습니다.'}, status=200)

# 사용자 개인정보 가져오기
@api_view(['GET'])
def user_view(request):
    user = User.objects.get(id=request.user.id)
    
    return Response({'name':user.name, 'phone_number': user.phone_number}, status=200)

# 아이디 찾기
@api_view(['POST'])
@permission_classes([AllowAny])
def search_id_view(request):
    name = request.data['name']
    phone_number = request.data['phone_number']

    if not User.objects.filter(name=name, phone_number=phone_number).exists():
        return Response({'message': '해당 사용자 정보가 없습니다.'}, status=404)
    
    user = User.objects.get(name=name, phone_number=phone_number)

    return Response({'username': user.username}, status=200)


# 비밀번호 찾기
@api_view(['POST'])
@permission_classes([AllowAny])
def search_password_view(request):
    name = request.data['name']
    username = request.data['username']
    phone_number = request.data['phone_number']

    if not User.objects.filter(
        name=name,
        username=username,
        phone_number=phone_number
    ).exists():
        return Response({'message': '해당 사용자 정보가 없습니다.'}, status=404)
    
    user = User.objects.get(name=name, username=username, phone_number=phone_number)
    tmp_password = ''.join(random.sample(string.ascii_letters, 30))
    user.set_password(tmp_password)
    user.save()

    return Response({'password': tmp_password}, status=200)


# 비밀번호 확인
@api_view(['POST'])
def verify_view(request):
    password = request.data['password']

    user = authenticate(request, username=request.user, password=password)

    if user:
        return Response(status=200)
    else:
        return Response({'message' : '비밀번호를 잘못 입력했습니다.'}, status=400)


# 비밀번호 수정
@api_view(['PUT'])
def modify_password_view(request):
    password = request.data['password']

    user = User.objects.get(id=request.user.id)
    user.set_password(password)
    user.save()

    return Response(status=200)


# 회원정보 수정
@api_view(['PUT'])
def modify_personal_information_view(request):
    name = request.data['name']
    phone_number = request.data['phone_number']

    user = User.objects.get(id=request.user.id)

    user.name = name
    user.phone_number = phone_number

    user.save()

    return Response(status=200)


# 회원 탈퇴
@api_view(['DELETE'])
def withdraw_view(request):
    password = request.data['password']

    user = authenticate(request, username=request.user, password=password)

    if user:
        user.delete()
        return Response(status=200)
    else:
        return Response({'message': '비밀번호를 잘못 입력했습니다.'}, status=400)
    