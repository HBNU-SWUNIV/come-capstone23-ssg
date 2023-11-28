# 한밭대학교 컴퓨터공학과 SSG팀
**🧑‍🌾 작물 생장 모니터링 및 알람 자동화 기능을 갖춘 스마트팜 시스템**
<br/>
<p align="center">
  <img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/af3bff9c-e230-4238-ab30-91a0ebbea42a" width="630px" height="500px">
<p/>

<br/><br/>


## 👤 Team Member
- ### 🛠 장비
  - 20181629 이보성
- ### 🌱 작물 생장 모니터링
  - 20201733 마하나로
  - 20201785 이지원
- ### 🛰 백엔드
  - 20171758 홍성민
  - 20201733 마하나로
- ### 🌐 프론트엔드
  - 20201785 이지원


<br/><br/>


## 🔎 Project Background
- ### 필요성
  - 작물 생산 인구의 고령화와 농가 수 감소에 대응하고 생산을 향상하기 위한 대안으로 스마트팜에 주목하고 있다.
  - 기존 스마트팜 시스템 내부 환경 문제 발생 시 알림의 부재로 인해 신뢰도가 부족하다.
  - 작물 생장 상태를 파악하기 위해서 사용자가 직접 확인해야 한다는 불편함이 있다.

- ### 기존 해결책의 문제점
  - NDVI(Normalized Difference Vegetation Index, 정규 식생 지수)를 이용한 작물 생장 상태를 파악하기 위해서는 고가의 멀티 스펙트럼 카메라가 필요하다는 문제점이 있다.


<br/><br/>


## 📋 System Design
### 기술 스택
- #### 🛠 장비
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"> <img src="https://img.shields.io/badge/Raspberry Pi-A22846?style=for-the-badge&logo=Raspberry Pi&logoColor=white">

- #### 🌱 작물 생장 모니터링
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">

- #### 🛰 백엔드
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"> <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"> <img src="https://img.shields.io/badge/Django REST framework-092E20?style=for-the-badge&logo=Django&logoColor=white"> <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">

- #### 🌐 웹&앱
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/React Native-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/Redux Saga-999999?style=for-the-badge&logo=Redux-Saga&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">

<br/>

### 시스템 구성도
  <p align="center">
    <img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/ab160cc2-c50d-43c7-aa5c-73f1d7f44e05" width="750px" height="400px">
  </p>

<br/>

### 시스템 기능
  - #### 🏡 스마트팜
    - 디스플레이 제공: 디스플레이를 통해 스마트팜 내부 환경 정보 확인 및 시스템을 제어한다.
    - 스마트팜 내부 환경 정보 확인 및 수집 기능: 다음 아래와 같은 스마트팜 내부 환경 정보를 확인 및 수집한다.
      - 온도
      - 습도
      - 조도
      - 토양 수분
      - 관수 시스템 내 수위
      - 관수 시스템 내 수온
    - LED 제어 기능: 켜고 끌 수 있으며, 자동 켜는 시각과 끄는 시각을 설정하여 스마트팜이 자동으로 설정한 시각에 맞춰 켜고 끌 수 있다.
      - 켜기/끄기
      - 자동 켜기/끄기 여부
      - 자동 켜는 시각
      - 자동 끄는 시각
    - 관수 시스템 제어 기능: 설정한 물 공급하는 시간동안 작물에게 물을 줄 수 있으며, 자동 물 공급하는 주기(단위: 시간)를 설정하여 스마트팜이 자동으로 설정한 주기마다 일정 시간동안 작물에게 물을 줄 수 있다.
      - 물 공급하기/중단하기
      - 물 공급하는 시간
      - 자동 물 공급하기 여부
      - 자동 물 공급하는 주기
    - 환기팬 제어 기능: 작동하고 중단할 수 있으며, 자동 작동 시각과 중단 시각을 설정하여 스마트팜이 자동으로 설정한 시각에 맞춰 작동하고 중단할 수 있다.
      - 작동하기/중단하기
      - 자동 작동하기/중단하기 여부
      - 자동 작동하는 시각
      - 자동 중단하는 시각
    - 중앙문 제어 기능: 열고 닫을 수 있으며, 자동 여는 시각과 닫는 시각을 설정하여 스마트팜이 자동으로 설정한 시각에 맞춰 열고 닫을 수 있다.
      - 문 열기/닫기
      - 자동 문 열기/닫기 여부
      - 자동 여는 시각
      - 자동 닫는 시각
    - 작물 사진 촬영 기능: 작물 생장 모니터링을 위하여 작물을 촬영한다.
    - 센싱 데이터를 기반한 알림 기능: 스마트팜 내부 환경에 대한 센싱 데이터를 기반하여 스마트팜 내부 환경 문제를 판별한 후, 사용자에게 알린다.
  - #### 🌱 작물 생장 모니터링
    : 카메라를 통해 촬영한 RGB 이미지를 CycleGAN을 활용하여 NIR(Near-Infrared Spectrometer) 이미지로 변환한다. RGB 이미지와 생성한 NIR 이미지를 토대로 NDVI를 추정하여 사용자에게 제공한다.
      
    |RGB 이미지|NIR 이미지|NDVI 이미지|
    |:---:|:---:|:---:|
    |<img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/a98df898-0cd8-4054-ad3a-2bdd47e6ac76" width="200px" height="200px">|<img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/1ffaa80d-3241-4e66-b268-6f269b0921b0" width="200px" height="200px">|<img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/1bc87d85-348a-41b8-ad23-6a3a19621bf3" width="200px" height="200px">|

    - CycleGAN 관련 논문: [Unpaired Image-to-Image Translation Using Cycle-Consistent Adversarial Networks](https://ieeexplore.ieee.org/document/8237506)
    - CycleGAN 논문 저자 코드: [URL](https://github.com/junyanz/CycleGAN)

  - #### 🌐 웹&앱
    - 작물 생장 상태 확인 기능: NDVI 값을 통해 작물 생장 상태를 확인한다.
    - 스마트팜 내부 환경 정보 확인 기능: 스마트팜 내부 환경 정보를 확인한다.
    - 스마트팜 시스템 제어 기능: 스마트팜 시스템인 LED, 관수 시스템, 환기팬, 중앙문을 원격으로 제어한다.
    - 스마트팜 내부 환경 문제 푸시 알림 기능: 스마트팜 내부 환경 문제 발생 시 사용자에게 푸시 알림으로 즉각 알린다.
      
      - 웹 화면
        <p align="center">
          <img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/796dcdf4-838d-4dfb-b7bf-39aaf96d97a2" width="600px" height="325px">
          <img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/25e58663-2649-4a7c-94e9-b745fc87f1ea" width="600px" height="325px">
        </p>
      - 앱 화면
        <p align="center">
          <img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/61d3a5fb-5f5a-46f5-8517-0520bf7c15dd" width="280px" height="500px">
          <img src="https://github.com/HBNU-SWUNIV/come-capstone23-ssg/assets/96428770/4b412328-ec2a-426b-ba00-2fa971bdb456" width="280px" height="500px">
        </p>

<br/><br/>


## 💬 Conclusion
  - RGB 이미지를 이용한 딥러닝 기반 정규 식생 지수 측정 알고리즘을 이용하여 실시간 작물 생장 상태 모니터링을 할 때 고가의 멀티 스펙트럼 카메라 대신 저가의 RGB 카메라를 사용하여 비용을 절감한다.
  - 실시간 작물 생장 상태 모니터링을 통해 사용자가 직접 작물 생장 상태를 확인해야 한다는 불편함을 해소한다.
  - 스마트팜 내부 환경에 대한 센싱 데이터를 기반한 알림을 통해 이에 대해 사용자가 즉각 인지하고 대응할 수 있도록 함으로써 스마트팜 시스템의 신뢰도를 향상시킨다.
  - 해당 프로젝트에 안정성 높은 센서와 모듈을 적용시켜 대규모 스마트팜 농장을 관제할 수 있는 효과를 기대할 수 있다.


<br/><br/>

  
## 🏆 Project Outcome
