
# from firebase_admin import messaging
# import fcm_notification

# def send_to_firebase_cloud_messaging():
#     # This registration token comes from the client FCM SDKs.
#     registration_token = '클라이언트의 FCM 토큰'

#     # See documentation on defining a message payload.
#     message = messaging.Message(
#     notification=messaging.Notification(
#         title='안녕하세요 타이틀 입니다',
#         body='안녕하세요 메세지 입니다',
#     ),
#     token=registration_token,
#     )

#     response = messaging.send(message)
    
#     try:
#         response = messaging.send(message)
#         # Response is a message ID string.
#         print('Successfully sent message:', response)
#     except Exception as e:
#         print('예외가 발생했습니다.', e)
        
#     # Response is a message ID string.
#     print('Successfully sent message:', response)
    
# fcm_notification.send_push_when_new_family_question_registered(family_question)

# from pyfcm import FCMNotification
 
# APIKEY = "Your Server Key"
# TOKEN = "Your Token"
 
# # 파이어베이스 콘솔에서 얻어 온 서버 키를 넣어 줌
# push_service = FCMNotification(APIKEY)
 
# def sendMessage(body, title):
#     # 메시지 (data 타입)
#     data_message = {
#         "body": body,
#         "title": title
#     }
 
#     # 토큰값을 이용해 1명에게 푸시알림을 전송함
#     result = push_service.single_device_data_message(registration_id=TOKEN, data_message=data_message)
 
#     # 전송 결과 출력
#     print(result)
 
# sendMessage("배달의 민족", "치킨 8000원 쿠폰 도착!")

# This registration token comes from the client FCM SDKs.


# from .accounts.models import User
# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import messaging
# from rest_framework.response import Response

# json_path = "/home/dfx/naro/cap/smartfarmKey.json"
# path = credentials.Certificate(json_path)
# firebase_admin.initialize_app(path)

# def send_push_notification(registration_token, message):
#     try:
#         user = User.objects.get(username='fcm_token')
#         user.fcm_token = registration_token

#         message = messaging.Message(
#             notification = messaging.Notification(
#                 data = '물 높이 경고!',
#                 body = '스마트팜을 확인해주세요!'
#             ),    
#             token = registration_token,
#         )

#         response = messaging.send(message)
#         print('successfully waterlevel message: ', response)
#     except User.DoesNotExist:
#         return Response({'message': '사용자 프로필이 없습니다.'}, status=404)
    
# def send_push_notification2(registration_token, message):
#     try:
#         user = User.objects.get(username='fcm_token')
#         user.fcm_token = registration_token


#         message = messaging.Message(
#             notification = messaging.Notification(
#                 data = '물 온도 경고!',
#                 body = '스마트팜을 확인해주세요!'
#             ),    
#             token = registration_token,
#         )

#         response = messaging.send(message)
#         print('successfully watertemp message: ', response)
        
#     except User.DoesNotExist:
#         return Response({'message': '사용자 프로필이 없습니다.'}, status=404)
    
# def send_push_notification3(registration_token, message):
#     try:
#         user = User.objects.get(username='fcm_token')
#         user.fcm_token = registration_token


#         message = messaging.Message(
#             notification = messaging.Notification(
#                 data = '내부 온도 경고!',
#                 body = '스마트팜을 확인해주세요!'
#             ),    
#             token = registration_token,
#         )

#         response = messaging.send(message)
#         print('successfully temp message: ', response)
        
#     except User.DoesNotExist:
#         return Response({'message': '사용자 프로필이 없습니다.'}, status=404)
    
# def send_push_notification4(registration_token, message):
#     try:
#         user = User.objects.get(username='fcm_token')
#         user.fcm_token = registration_token


#         message = messaging.Message(
#             notification = messaging.Notification(
#                 data = '습도 경고!',
#                 body = '스마트팜을 확인해주세요!'
#             ),    
#             token = registration_token,
#         )

#         response = messaging.send(message)
#         print('successfully hum message: ', response)
        
#     except User.DoesNotExist:
#         return Response({'message': '사용자 프로필이 없습니다.'}, status=404)
    
# def send_push_notification5(registration_token, message):
#     try:
#         user = User.objects.get(username='fcm_token')
#         user.fcm_token = registration_token


#         message = messaging.Message(
#             notification = messaging.Notification(
#                 data = '수분 경고!',
#                 body = '스마트팜을 확인해주세요!'
#             ),    
#             token = registration_token,
#         )

#         response = messaging.send(message)
#         print('successfully soil message: ', response)
        
#     except User.DoesNotExist:
#         return Response({'message': '사용자 프로필이 없습니다.'}, status=404)
    

import firebase_admin
from firebase_admin import credentials, initialize_app
from firebase_admin import messaging
from rest_framework.response import Response

# json_path = "/home/dfx/naro/cap/smartfarmKey.json"
# path = credentials.Certificate(json_path)
# # firebase_admin.initialize_app(path)
# initialize_app(path, name='smartfarm')

def send_push_notification(request, waterlevelwarning):
    user = User.objects.get(username=request.user)

    # fcm_token 가져오기
    registration_token = user.fcm_token

    if waterlevelwarning != "":
        print("waterlevelwarning 메세지가 있습니다.")
        
        message = messaging.Message(
        notification=messaging.Notification(
                title = '물 높이 경고!',
                body = '스마트팜을 확인해주세요!'
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
                title = '물 온도 경고!',
                body = '스마트팜을 확인해주세요!'
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
                title = '내부 온도 경고!',
                body = '스마트팜을 확인해주세요!'
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
                title = '습도 경고!',
                body = '스마트팜을 확인해주세요!'
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
                title = '건조 경고!',
                body = '스마트팜을 확인해주세요!'
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
    
# if __name__ == "__main__":
#     user = User.objects.get(username='fcm_token')
#     user.fcm_token = registration_token
#     registration_token = registration_token
    
#     send_push_notification(registration_token, message)
#     send_push_notification2(registration_token, message)
#     send_push_notification3(registration_token, message)
#     send_push_notification4(registration_token, message)
#     send_push_notification5(registration_token, message)