from urllib import response
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .forms import UploadImageForm

from .models import SmartFarmCrop, UploadImage
from accounts.models import User
from server.models import SmartFarm
from rest_framework import status

# import numpy
# import cv2
# import matplotlib
# from image import GenerateModel

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
    
    # 작물 등록하기
    name = request.data['name']
    day = request.data['day']
    crop = SmartFarmCrop.objects.create(name=name, day=day)
    crop.save()
    
    # 스마트팜에 작물 등록하기
    smartfarm.crop = crop
    smartfarm.save()
    
    return Response({'message': '작물이 등록되었습니다.'}, status=200)


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
        return response({'message': '등록된 스마트팜이 없습니다.'}, status=400)
    
    # 작물 삭제하기
    try:
        crop = SmartFarmCrop.objects.get(smartfarm=smartfarm)
        crop.delete()
        
        return Response({'message': '작물이 삭제되었습니다.'},status=200)
    except SmartFarmCrop.DoesNotExist:
        return Response({'message': '등록되어 있지 않은 스마트팜입니다.'}, status=404)
    
# 작물 이미지 보내기
@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST':
        form = UploadImageForm(request.POST, request.FILES)
        if form.is_valid():
            # uploaded_file = UploadImage(file=request.FILES['files'])
            form.save()  # 이미지를 데이터베이스에 저장
            return Response({'message': '이미지가 성공적으로 업로드되었습니다.'}, status=200)
        upload = request.FILES.get('file')
        if upload:
            with open(f'/uploads/{upload}', 'wb+') as destination:
                for chunk in upload.chunks():
                    destination.write(chunk)
                    
            return Response({'message': '이미지가 성공적으로 업로드되었습니다.'}, status=200)
    else:
        return Response({'error': '잘못된 요청입니다.'}, status=400)

      
    

    # def nir_to_ndvi(rgb_img, nir_img):
    #     rgb_img = cv2.imread(rgb_img)
    #     nir_img = cv2.imread(nir_img)
    #     rgb_img = rgb_img.astype('float32')
    #     nir_img = nir_img.astype('float32')

    #     r_channel = rgb_img[:, :, -1]
    #     nir_channel = nir_img[:, :, -1]

    #     ndvi = (nir_channel - r_channel) / (nir_channel + r_channel)
    #     ndvi_value = numpy.mean(ndvi)

    #     # Scaling
    #     ndvi = (ndvi + 1) / 2
    #     viridis_map = matplotlib.colormaps.get_cmap('coolwarm')

    #     ndvi_colormap = (viridis_map(numpy.clip(ndvi, 0, 1)) * 255).astype(numpy.uint8)
    #     ndvi_image = cv2.cvtColor(ndvi_colormap, cv2.COLOR_RGBA2BGR)

    #     return ndvi_value, ndvi_image
        

    # if __name__ == '__main__':
    #     model_path = "cap/crops/200_net_G_A.pth"   # model path
    #     rgb_img_path = ""   # RGB image path

    #     croped_rgb_img_path = ""   # path to save preprocessed RGB image
    #     nir_img_path = ""   # path to save NIR image
    #     ndvi_img_path = ""   # path to save NDVI image

    #     # create model
    #     model = GenerateModel(model_path)

    #     # RGB image → NIR image
    #     croped_rgb_img, nir_img = model.generate_nir(rgb_img_path)

    #     # save croped RGB image
    #     croped_rgb_img = croped_rgb_img.permute(1, 2, 0).cpu().numpy()
    #     croped_rgb_img = (croped_rgb_img - croped_rgb_img.min()) / (croped_rgb_img.max() - croped_rgb_img.min())
    #     arr_scaled = (croped_rgb_img * 255).astype(numpy.uint8)
    #     croped_rgb_img = cv2.cvtColor(arr_scaled, cv2.COLOR_RGB2BGR)
    #     cv2.imwrite(croped_rgb_img_path, croped_rgb_img)

    #     # save nir image
    #     nir_img = nir_img.permute(1, 2, 0).cpu().numpy()
    #     nir_img = (nir_img - nir_img.min()) / (nir_img.max() - nir_img.min())
    #     arr_scaled = (nir_img * 255).astype(numpy.uint8)
    #     nir_img = cv2.cvtColor(arr_scaled, cv2.COLOR_RGB2GRAY)
    #     nir_img = cv2.cvtColor(nir_img, cv2.COLOR_GRAY2BGR)
    #     cv2.imwrite(nir_img_path, nir_img)

    #     # calculate NDVI
    #     ndvi_value, ndvi_img = nir_to_ndvi(croped_rgb_img_path, nir_img_path)
    #     print('NDVI:', ndvi_value)
    #     cv2.imwrite(ndvi_img_path, ndvi_img)   # save NDVI image