import os
import time
import copy
from urllib import response
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from django.conf import settings

from crops.generate_option import GenerateOption
from crops.load_image import LoadImage
from crops.test_model import TestModel

from .forms import UploadImageForm

from .models import SmartFarmCrop, UploadImage
from accounts.models import User
from server.models import SmartFarm
from rest_framework import status

from rest_framework.views import APIView
from django.utils import timezone
from apscheduler.schedulers.background import BackgroundScheduler

import numpy
import cv2
from .testtest import GenerateModel, nir_to_ndvi

# Create your views here.

# 작물 등록
@api_view(['POST'])
def register_crop_view(request):
    
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
    # 스마트팜 가져오기
    try:
        smartfarm = SmartFarm.objects.get(user=user)
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록된 스마트팜이 없습니다.'}, status=400)

    try:
        crop = smartfarm.crop
    except SmartFarmCrop.DoesNotExist:
        crop = None
        
    if crop:
        return Response({'message': '스마트팜에 이미 작물이 등록되어 있습니다.'}, status=400)
    
    # 작물 등록하기
    user = request.user
    name = request.data['name']
    day = request.data['day']
    # crop = SmartFarmCrop.objects.create(name=name, day=day)
    crop = SmartFarmCrop.objects.create(user=user, name=name, day=day)
    crop.save()
    
    # 스마트팜에 작물 등록하기
    smartfarm.crop = crop
    smartfarm.save()
    
    # 스케쥴러 설정
    sched = BackgroundScheduler(daemon=True)
    
    @sched.scheduled_job('cron', hour='0' ,id='crop')
    def job():
        try:
            crop = SmartFarmCrop.objects.get(smartfarm=smartfarm)
            crop.day += 1
            crop.save()
            
            print(f'Crop ID {crop.id}의 day가 증가했습니다: {crop.day}')
            
        except SmartFarmCrop.DoesNotExist:
            return Response({'message': '작물이 존재하지 않습니다.'}, status=404)
    
    sched.start()

    return Response({'message': '작물이 등록되었습니다.'}, status=200)

# 작물 정보 가져오기
@api_view(['GET'])
def get_crop_view(request):
    
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
    # 스마트팜 가져오기
    try:
        smartfarm = SmartFarm.objects.get(user=user)
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록된 스마트팜이 없습니다.'}, status=400)
    
    crop = SmartFarmCrop.objects.get(smartfarm=smartfarm)
    
    return Response({'name': crop.name, 'day': crop.day}, status=200)

# 작물 수정
@api_view(['PUT'])
def modify_crop_view(request):
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
    # 스마트팜 가져오기
    try:
        smartfarm = SmartFarm.objects.get(user=user)
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록된 스마트팜이 없습니다.'}, status=400)
    
    # 작물 가져오기
    try:
        name = request.data['name']
        day = request.data['day']
        
        crop = SmartFarmCrop.objects.get(smartfarm=smartfarm)
        crop.name = name
        crop.day = day
        crop.save()
        
        return Response({'message': '작물이 수정되었습니다.'},status=200)
    
    except SmartFarmCrop.DoesNotExist:
        return Response({'message': '작물이 등록되어 있지 않습니다.'}, status=404)    


# 작물 삭제    
@api_view(['DELETE'])
def remove_crop_view(request):
    # 사용자 가져오기
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
    # 스마트팜 가져오기
    try:
        smartfarm = SmartFarm.objects.get(user=user)
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록된 스마트팜이 없습니다.'}, status=400)
    
    # 작물 삭제하기
    try:
        crop = SmartFarmCrop.objects.get(user=user, smartfarm=smartfarm)
        # crop.smartfarm = None
        smartfarm.crop = None
        # user = User.objects.get(name=None)
        # smartfarm.user = user
        # crop = None
        smartfarm.save()
        crop.delete()
        
        # crop.delete()
        
        return Response({'message': '작물이 삭제되었습니다.'},status=200)
    
    except SmartFarmCrop.DoesNotExist:
        return Response({'message': '등록된 작물이 없습니다.'}, status=400)
    
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 스마트팜입니다.'}, status=404)
    
# 작물 이미지 저장
# @api_view(['POST'])
class UploadView(APIView):
    permission_classes = [AllowAny]
    # serializer_class = UplaodImageModelSerializer
    def post(self, request):
        smartfarm = request.data['smartfarm']
        
        if request.method == 'POST':
            form = UploadImageForm(request.data, request.FILES)
            if form.is_valid():
                # uploaded_file = UploadImage(file=request.FILES['files'])
                form.save()  # 이미지를 데이터베이스에 저장
                Response({'message': '이미지가 성공적으로 업로드되었습니다.'}, status=200)
            
            upload = request.FILES.get('file')

            if upload:
                with open(os.path.join(settings.MEDIA_ROOT, upload.name), 'wb+') as destination:
                # with open(f'/uploads/{upload}', 'wb+') as destination:
                    for chunk in upload.chunks():
                        destination.write(chunk)
                
                Response({'message': '이미지가 성공적으로 업로드되었습니다.'}, status=200)

            # 스마트팜 가져오기
            try:
                smartfarm = SmartFarm.objects.get(sfid=smartfarm)
            except SmartFarm.DoesNotExist:
                return Response({'message': '등록된 스마트팜이 없습니다.'}, status=404)
            
            # 작물 가져오기
            try:
                # crop = SmartFarmCrop.objects.get(user=smartfarm.user)
                crop = SmartFarmCrop.objects.get(smartfarm=smartfarm)
            except SmartFarmCrop.DoesNotExist:
                return Response({'message': '작물이 등록되어 있지 않습니다.'}, status=404) 
            
            date = timezone.now().strftime("%Y%m%d%H%M%S")
            
            model_path = "/home/dfx/naro/cap/crops/200_net_G_A.pth"   # model path
            rgb_img_path = "/home/dfx/naro/cap/crops/uploads/" + upload.name   # RGB image path

            croped_rgb_img_path = "/home/dfx/naro/cap/crops/result/rgb/rgb_" + date + ".jpg"   # path to save preprocessed RGB image
            nir_img_path = "/home/dfx/naro/cap/crops/result/nir/nir_" + date + ".jpg"  # path to save NIR image
            ndvi_img_path = "/home/dfx/naro/cap/crops/result/ndvi/ndvi_" + date + ".jpg"  # path to save NDVI image

            # create model
            model = GenerateModel(model_path)

            # RGB image → NIR image
            croped_rgb_img, nir_img = model.generate_nir(rgb_img_path)

            # save croped RGB image
            croped_rgb_img = croped_rgb_img.permute(1, 2, 0).cpu().numpy()
            croped_rgb_img = (croped_rgb_img - croped_rgb_img.min()) / (croped_rgb_img.max() - croped_rgb_img.min())
            arr_scaled = (croped_rgb_img * 255).astype(numpy.uint8)
            croped_rgb_img = cv2.cvtColor(arr_scaled, cv2.COLOR_RGB2BGR)
            cv2.imwrite(croped_rgb_img_path, croped_rgb_img)

            # save nir image
            nir_img = nir_img.permute(1, 2, 0).cpu().numpy()
            nir_img = (nir_img - nir_img.min()) / (nir_img.max() - nir_img.min())
            arr_scaled = (nir_img * 255).astype(numpy.uint8)
            nir_img = cv2.cvtColor(arr_scaled, cv2.COLOR_RGB2GRAY)
            nir_img = cv2.cvtColor(nir_img, cv2.COLOR_GRAY2BGR)
            cv2.imwrite(nir_img_path, nir_img)

            timestamp = timezone.now()

            # calculate NDVI
            ndvi_value, ndvi_img = nir_to_ndvi(croped_rgb_img_path, nir_img_path)
            
            # latest_id = SmartFarmCrop.objects.filter(smartfarm=smartfarm).latest('id')
            
            # last = copy.copy(latest_id)
            
            # last.id = None
            # last.ndvi = ndvi_value
            # last.timestamp = timestamp
            smartfarm_ndvi = SmartFarmCrop.objects.get(id=crop.id)
            
            last = copy.copy(smartfarm_ndvi)
            
            last.id = None
            last.ndvi = ndvi_value
            last.timestamp = timestamp
            last.save()
            
            # smartfarm_ndvi.id = None
            # smartfarm_ndvi.ndvi = ndvi_value
            # smartfarm_ndvi.timestamp = timestamp
            # smartfarm_ndvi.save()
            
            # userin = SmartFarm.objects.filter(sfid=smartfarm)
            # SmartFarmCrop.objects.filter(user=userin).update(ndvi=ndvi_value, timestamp=timestamp)
            
            print('NDVI:', round(ndvi_value, 3))
            cv2.imwrite(ndvi_img_path, ndvi_img)   # save NDVI image
            
            return Response({'ndvi_value': round(ndvi_value, 3)}, status=200)

        else:
            return Response({'error': '잘못된 요청입니다.'}, status=400)



# ndvi 값 저장하기
@api_view(['GET'])
@permission_classes([AllowAny])
def image_ndvi(request):
    
    # 사용자 가져오기
    # user = request.user
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 사용자입니다.'}, status=404)
    
    # 스마트팜 가져오기
    try:
        smartfarm = SmartFarm.objects.get(user=user)
    except SmartFarm.DoesNotExist:
        return Response({'message': '등록된 스마트팜이 없습니다.'}, status=404)
    
    # 작물 가져오기
    try:
        crop = SmartFarmCrop.objects.get(smartfarm=smartfarm)
    except SmartFarmCrop.DoesNotExist:
        return Response({'message': '작물이 등록되어 있지 않습니다.'}, status=404) 
    
    date = timezone.now().strftime("%Y%m%d%H%M%S")
    
    model_path = "/home/dfx/naro/cap/crops/200_net_G_A.pth"   # model path
    rgb_img_path = "/home/dfx/naro/cap/crops/uploads/image_20231102220804.jpg"   # RGB image path

    croped_rgb_img_path = "/home/dfx/naro/cap/crops/result/rgb/rgb_" + date + ".jpg"   # path to save preprocessed RGB image
    nir_img_path = "/home/dfx/naro/cap/crops/result/nir/nir_" + date + ".jpg"  # path to save NIR image
    ndvi_img_path = "/home/dfx/naro/cap/crops/result/ndvi/ndvi_" + date + ".jpg"  # path to save NDVI image

    # create model
    model = GenerateModel(model_path)

    # RGB image → NIR image
    croped_rgb_img, nir_img = model.generate_nir(rgb_img_path)

    # save croped RGB image
    croped_rgb_img = croped_rgb_img.permute(1, 2, 0).cpu().numpy()
    croped_rgb_img = (croped_rgb_img - croped_rgb_img.min()) / (croped_rgb_img.max() - croped_rgb_img.min())
    arr_scaled = (croped_rgb_img * 255).astype(numpy.uint8)
    croped_rgb_img = cv2.cvtColor(arr_scaled, cv2.COLOR_RGB2BGR)
    cv2.imwrite(croped_rgb_img_path, croped_rgb_img)
# timestamp=int(time.time()))

    # save nir image
    nir_img = nir_img.permute(1, 2, 0).cpu().numpy()
    nir_img = (nir_img - nir_img.min()) / (nir_img.max() - nir_img.min())
    arr_scaled = (nir_img * 255).astype(numpy.uint8)
    nir_img = cv2.cvtColor(arr_scaled, cv2.COLOR_RGB2GRAY)
    nir_img = cv2.cvtColor(nir_img, cv2.COLOR_GRAY2BGR)
    cv2.imwrite(nir_img_path, nir_img)

    timestamp = timezone.now()
    
    # calculate NDVI
    ndvi_value, ndvi_img = nir_to_ndvi(croped_rgb_img_path, nir_img_path)
    
    # ndvi = SmartFarm.objects.filter(user=user).update(ndvi=ndvi_value, timestamp=timestamp)
    ndvi = SmartFarm.objects.filter(user=user)
    ndvi.save()
    
    print('NDVI:', ndvi_value)
    cv2.imwrite(ndvi_img_path, ndvi_img)   # save NDVI image
    
    return Response({'ndvi_value': ndvi_value if crop else ""}, status=200)
