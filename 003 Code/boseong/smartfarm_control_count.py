import RPi.GPIO as GPIO
import time
import threading
import requests
from w1thermsensor import W1ThermSensor
from datetime import datetime
import schedule


import Adafruit_DHT
import spidev

import sys
from PyQt5.QtCore import pyqtSlot, QTimer, QTime
from PyQt5.QtWidgets import QApplication, QDialog, QLabel,QComboBox,QTimeEdit
from PyQt5.uic import loadUi
from PyQt5.QtGui import QPixmap

import os
import subprocess

"""
class smartfarm_camera:
    
    def __init__(self, folder_path):
        self.folder_path=folder_path
        self.camera_url = "http://203.230.102.75:10924/crop/upload/image"
        #self.headers = {'Authorization': "Token 8287d86f096ce97533855d3385be465c023cc72d"}
        
    def capture_image(self):
        while True:
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            filename = f"image_{timestamp}.jpg"
            filepath = os.path.join(self.folder_path,filename)
            subprocess.run(["fswebcam","-r","640x480","--no-banner",filepath])
            files = {'file':open(self.filename,'rb')}
            response_image = requests.post(self.camera_url, files=files)
            time.sleep(3600)
"""
            
class smartfarm_ui(QDialog):
    def __init__(self):
        super(smartfarm_ui,self).__init__()
        loadUi('test2.ui',self)
        image_paths = ['/home/boseong/bulb.png',
        '/home/boseong/raindrops.png','/home/boseong/door.png','/home/boseong/wind.png']
                        
        self.led_image_label = self.findChild(QLabel, 'led_image_label')
        self.water_image_label = self.findChild(QLabel, 'water_image_label')
        self.door_image_label = self.findChild(QLabel, 'door_image_label')
        self.fan_image_label = self.findChild(QLabel, 'fan_image_label')

                        
        self.display_image(self.led_image_label, image_paths[0])
        self.display_image(self.water_image_label, image_paths[1])
        self.display_image(self.door_image_label, image_paths[2])
        self.display_image(self.fan_image_label, image_paths[3])
		
        self.led_onoff_button.setEnabled(False)
        self.led_auto_button.setEnabled(False)
        self.led_power_button.setCheckable(True)
        self.led_onoff_button.setCheckable(True)
        self.led_auto_button.setCheckable(True)
        
        self.water_power_button.setCheckable(True)
        self.water_onoff_button.setCheckable(True)
        self.water_auto_button.setCheckable(True)
        self.water_onoff_button.setEnabled(False)
        self.water_auto_button.setEnabled(False)
        
        self.fan_power_button.setCheckable(True)
        self.fan_onoff_button.setEnabled(False)
        self.fan_auto_button.setEnabled(False)
        self.fan_onoff_button.setCheckable(True)
        self.fan_auto_button.setCheckable(True)
        
        self.door_power_button.setCheckable(True)
        self.door_onoff_button.setEnabled(False)
        self.door_auto_button.setEnabled(False)
        self.door_onoff_button.setCheckable(True)
        self.door_auto_button.setCheckable(True)
        
        self.led_power_button.clicked.connect(self.led_tab_button)
        self.led_onoff_button.clicked.connect(self.led_tab_button)
        self.led_auto_button.clicked.connect(self.led_tab_button)
        
        self.led_auto_start_time.timeChanged.connect(self.led_time_set)
        self.led_auto_end_time.timeChanged.connect(self.led_time_set)
        
        self.water_power_button.clicked.connect(self.water_tab_button)
        self.water_onoff_button.clicked.connect(self.water_tab_button)
        self.water_auto_button.clicked.connect(self.water_tab_button)
        
        self.water_start_time.activated.connect(self.water_pump_set)
        self.water_running_time.activated.connect(self.water_pump_set)
        
        self.fan_power_button.clicked.connect(self.fan_tab_button)
        self.fan_onoff_button.clicked.connect(self.fan_tab_button)
        self.fan_auto_button.clicked.connect(self.fan_tab_button)
        
        self.fan_auto_start_time.timeChanged.connect(self.fan_time_set)
        self.fan_auto_end_time.timeChanged.connect(self.fan_time_set)
        
        self.door_power_button.clicked.connect(self.door_tab_button)
        self.door_onoff_button.clicked.connect(self.door_tab_button)
        self.door_auto_button.clicked.connect(self.door_tab_button)
        
        self.door_auto_start_time.timeChanged.connect(self.door_time_set)
        self.door_auto_end_time.timeChanged.connect(self.door_time_set)
        
        #remote control value
        self.before_remote_power = 0
        
        self.timer = QTimer(self)
        self.timer.setInterval(500)
        self.timer.timeout.connect(self.home_set_text)
        self.timer.timeout.connect(self.remote_init)
        
        self.timer.start()
        
    def led_time_set(self):
        farm.json_data["ledstarttimevalue"] = int(self.led_auto_start_time.time().toString("hh"))
        farm.json_data["ledstartminutevalue"] = int(self.led_auto_start_time.time().toString("mm"))
        farm.json_data["ledendtimevalue"] = int(self.led_auto_end_time.time().toString("hh"))
        farm.json_data["ledendminutevalue"] = int(self.led_auto_end_time.time().toString("mm"))
    def water_pump_set(self):
        farm.json_data["waterpumpstarttime"] = int(self.water_start_time.currentText())
        farm.json_data["waterpumprunningtime"] = int(self.water_running_time.currentText())
    def fan_time_set(self):
        farm.json_data["fanstarttimevalue"] = int(self.fan_auto_start_time.time().toString("hh"))
        farm.json_data["fanstartminutevalue"] = int(self.fan_auto_start_time.time().toString("mm"))
        farm.json_data["fanendtimevalue"] = int(self.fan_auto_end_time.time().toString("hh"))
        farm.json_data["fanendminutevalue"] = int(self.fan_auto_end_time.time().toString("mm"))
    def door_time_set(self):
        farm.json_data["doorstarttimevalue"] = int(self.door_auto_start_time.time().toString("hh"))
        farm.json_data["doorstartminutevalue"] = int(self.door_auto_start_time.time().toString("mm"))
        farm.json_data["doorendtimevalue"] = int(self.door_auto_end_time.time().toString("hh"))
        farm.json_data["doorendminutevalue"] = int(self.door_auto_end_time.time().toString("mm"))
    
    def remote_init(self):
        if farm.json_data["remotepower"] != self.before_remote_power and farm.json_data["remotepower"] == True:
            
            self.before_remote_power = True
            #led time set
            farm.json_data["ledstarttimevalue"]=0
            farm.json_data["ledstartminutevalue"]=0
            farm.json_data["ledendtimevalue"]=0
            farm.json_data["ledendtimevalue"]=0
            self.led_auto_start_time.setTime(QTime(0, 0))
            self.led_auto_end_time.setTime(QTime(0, 0))
            
            #led button set
            farm.json_data["ledpower"]= False
            farm.json_data["ledtoggle"]= False
            farm.json_data["ledautotoggle"]= False
            farm.json_data["ledstate"] = False
            self.led_onoff_button.setText("OFF")
            self.led_onoff_button.setChecked(False)
            self.led_onoff_button.setEnabled(False)
            if self.led_auto_button.isChecked() == True:
                self.led_auto_button.toggle()
            #self.led_auto_button.setChecked(False)
            self.led_auto_button.setEnabled(False)
            self.led_power_button.setText("OFF")
            self.led_power_button.setChecked(False)
            self.led_power_button.setEnabled(False)
            
            #water pump time set
            farm.json_data["wterpumpstarttime"]=0
            farm.json_data["waterpumprunningtime"]=0
            self.water_start_time.setCurrentIndex(1)
            self.water_running_time.setCurrentIndex(1)
            
            #water pump button set
            farm.json_data["waterpumppower"] = False
            farm.json_data["waterpumptoggle"] = False
            farm.json_data["waterpumpstate"] = False
            farm.json_data["waterpumpautotoggle"] = False
            self.water_onoff_button.setText("OFF")
            self.water_onoff_button.setChecked(False)
            self.water_onoff_button.setEnabled(False)
            if self.water_auto_button.isChecked() == True:
                self.water_auto_button.toggle()
                
            #self.water_auto_button.setChekced(False)
            self.water_auto_button.setEnabled(False)
            self.water_power_button.setText("OFF")
            self.water_power_button.setChecked(False)
            self.water_power_button.setEnabled(False)
            
            #fan time set
            farm.json_data["fanstarttimevalue"] = 0
            farm.json_data["fanstartminutevalue"] = 0
            farm.json_data["fanendtimevalue"] =0
            farm.json_data["fanendminutevalue"] =0
            self.fan_auto_start_time.setTime(QTime(0, 0))
            self.fan_auto_end_time.setTime(QTime(0, 0))
            
            #fan button set
            farm.json_data["fanpower"] = False
            farm.json_data["fantoggle"] = False
            farm.json_data["fanautotoggle"] = False
            farm.json_data["fanstate"] = False
            self.fan_onoff_button.setText("OFF")
            self.fan_onoff_button.setChecked(False)
            self.fan_onoff_button.setEnabled(False)
            if self.fan_auto_button.isChecked() == True:
                self.fan_auto_button.toggle()
            #self.fan_auto_button.setChecked(False)
            self.fan_auto_button.setEnabled(False)
            self.fan_power_button.setText("OFF")
            self.fan_power_button.setChecked(False)
            self.fan_power_button.setEnabled(False)
            
            #door time set
            farm.json_data["doorstarttimevalue"] = 0
            farm.json_data["doorstartminutevalue"] = 0
            farm.json_data["doorendtimevalue"] = 0
            farm.json_data["doorendminutevalue"] = 0
            self.door_auto_start_time.setTime(QTime(0, 0))
            self.door_auto_end_time.setTime(QTime(0, 0))
            
            #door button set
            farm.json_data["doorpower"] = False
            farm.json_data["doortoggle"] = False
            farm.json_data["doorstate"] = False
            farm.json_data["doorautotoggle"] = False
            self.door_onoff_button.setText("OFF")
            self.door_onoff_button.setChecked(False)
            self.door_onoff_button.setEnabled(False)
            if self.door_auto_button.isChecked() == True:
                self.door_auto_button.toggle()
            #self.door_auto_button.setChecked(False)
            self.door_auto_button.setEnabled(False)
            self.door_power_button.setText("OFF")
            self.door_power_button.setChecked(False)
            self.door_power_button.setEnabled(False)
            
        elif farm.json_data["remotepower"] == False and self.before_remote_power != farm.json_data["remotepower"]:
            self.before_remote_power = False
            self.led_power_button.setEnabled(True)
            self.water_onoff_button.setEnabled(True)
            self.fan_power_button.setEnabled(True)
            self.door_power_button.setEnabled(True)
            
            
            
            
            
    def door_tab_button(self):
        if self.door_power_button.isChecked() :
            farm.json_data["doorpower"] = True
            self.door_auto_button.setEnabled(True)
            self.door_onoff_button.setEnabled(True)
            self.door_power_button.setText("ON")
            if self.door_onoff_button.isChecked() :
                self.door_onoff_button.setText("ON")
                self.door_auto_button.setEnabled(False)
                farm.json_data["doortoggle"] = True
            else:
                self.door_onoff_button.setText("OFF")
                self.door_auto_button.setEnabled(True)
                farm.json_data["doortoggle"] = False
            
            if self.door_auto_button.isChecked() :
                self.door_onoff_button.setEnabled(False)
                farm.json_data["doorautotoggle"] = True
            else:
                self.door_onoff_button.setEnabled(True)
                farm.json_data["doorautotoggle"] = False
        else:
            self.door_auto_button.setEnabled(False)
            self.door_onoff_button.setEnabled(False)
            self.door_power_button.setText("OFF")
            farm.json_data["doorpower"] = False
        
    def fan_tab_button(self):
        if self.fan_power_button.isChecked() :
            farm.json_data["fanpower"] = True
            self.fan_auto_button.setEnabled(True)
            self.fan_onoff_button.setEnabled(True)
            self.fan_power_button.setText("ON")
            if self.fan_onoff_button.isChecked():
                self.fan_onoff_button.setText("ON")
                self.fan_auto_button.setEnabled(False)
                farm.json_data["fantoggle"] = True
            else:
                self.fan_onoff_button.setText("OFF")
                self.fan_auto_button.setEnabled(True)
                farm.json_data["fantoggle"]=False
            
            if self.fan_auto_button.isChecked() :
                self.fan_onoff_button.setEnabled(False)
                farm.json_data["fanautotoggle"] = True
            else:
                self.fan_onoff_button.setEnabled(True)
                farm.json_data["fanautotoggle"] = False
        else:
            self.fan_auto_button.setChecked(False)
            self.fan_onoff_button.setChecked(False)
            self.fan_onoff_button.setText("OFF")
            self.fan_power_button.setText("OFF")
            self.fan_auto_button.setEnabled(False)
            self.fan_onoff_button.setEnabled(False)
            farm.json_data["fanpower"] = False
    
    def led_tab_button(self):
        if self.led_power_button.isChecked() :
            farm.json_data["ledpower"] = True
            self.led_auto_button.setEnabled(True)
            self.led_onoff_button.setEnabled(True)
            self.led_power_button.setText("ON")
            if self.led_onoff_button.isChecked() :
                self.led_onoff_button.setText("ON")
                self.led_auto_button.setEnabled(False)
                farm.json_data["ledtoggle"] = True
            else:
                self.led_onoff_button.setText("OFF")
                self.led_auto_button.setEnabled(True)
                farm.json_data["ledtoggle"] = False
            if self.led_auto_button.isChecked() :
                self.led_onoff_button.setEnabled(False)
                farm.json_data["ledautotoggle"] = True
            else:
                self.led_onoff_button.setEnabled(True)
                farm.json_data["ledautotoggle"] = False
        else:
            self.led_auto_button.setEnabled(False)
            self.led_onoff_button.setEnabled(False)
            self.led_power_button.setText("OFF")
            farm.json_data["ledpower"] = False
            farm.json_data["ledtoggle"] = False
    def water_tab_button(self):
        if self.water_power_button.isChecked() :
            farm.json_data["waterpumppower"] = True
            self.water_power_button.setText("ON")
            self.water_auto_button.setEnabled(True)
            self.water_auto_button.setEnabled(True)
            if self.water_onoff_button.isChecked():
                self.water_onoff_button.setText("ON")
                self.water_auto_button.setEnabled(False)
                farm.json_data["waterpumptoggle"] = True
            else:
                self.water_onoff_button.setText("OFF")
                farm.json_data["waterpumptoggle"] = False
            if self.water_auto_button.isChecked() :
                self.water_onoff_button.setEnabled(False)
                farm.json_data["waterpumpautotoggle"] = True
            else:
                farm.json_data["waterpumpautotoggle"] = False
        else:
            self.water_auto_button.setEnabled(False)
            self.water_onoff_button.setEnabled(False)
            self.water_power_button.setText("OFF")
            farm.json_data["waterpumppower"] = False
            farm.json_data["waterpumptoggle"] = False
    
    def display_image(self, label, image_path):
        pixmap = QPixmap(image_path)
        label.setPixmap(pixmap)
        
    def home_set_text(self):
        self.home_temperature.setText(str(farm.json_data["temperature"]))
        self.home_humidity.setText(str(farm.json_data["humidity"]))
        
        if farm.json_data["ledstate"] == True:
            self.home_led_text.setText("현재 작동중입니다.")
        elif farm.json_data["ledstate"] == False:
            self.home_led_text.setText("현재 작동중이지 않습니다.")
            
        if farm.json_data["waterpumpstate"] == True:
            self.home_water_text.setText("현재 작동중입니다.")
        elif farm.json_data["waterpumpstate"] == False:
            self.home_water_text.setText("현재 작동중이지 않습니다.")
        
        if farm.json_data["fanstate"] == True:
            self.home_fan_text.setText("현재 작동중입니다.")
        elif farm.json_data["fanstate"] == False:
            self.home_fan_text.setText("현재 작동중이지 않습니다.")
        
        if farm.json_data["doorstate"] == False:
            self.home_door_text.setText("현재 닫혀 있습니다.")
        elif farm.json_data["doorstate"] == True:
            self.home_door_text.setText("현재 열려 있습니다.")
    
class smartfarm:
    #watertemp setting
    watertemp_sensor_pin = W1ThermSensor()
    
    #dht setting
    hm_sensor = Adafruit_DHT.DHT11
    
    #mcp3008 setting
    spi = spidev.SpiDev()
    
    spi.open(0, 0)  #mcp channel 0 open
    spi.max_speed_hz = 1000000
    mcp3008_ch0 = 0
    mcp3008_ch1 = 1
    mcp3008_ch2 = 2
    
    def __init__(self):
        
        #gpio mode setting
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        
        #pin init
        self.dht_pin = 17
        self.water_temp = 4
        self.fan_pwm_pin = 6
        self.water_pump_pin = 5
        self.led_pin = 23
        self.servo_pin = 27
        
        #gpio setup
        GPIO.setup(self.led_pin,GPIO.OUT)
        GPIO.setup(self.water_pump_pin,GPIO.OUT)
        GPIO.setup(self.fan_pwm_pin,GPIO.OUT)
        GPIO.setup(self.servo_pin,GPIO.OUT)
        
        #pwm setting
        self.led_pwm = GPIO.PWM(self.led_pin,100)
        self.fan_pwm = GPIO.PWM(self.fan_pwm_pin,100)
        self.water_pump_pwm = GPIO.PWM(self.water_pump_pin,100)
        self.servo_pwm = GPIO.PWM(self.servo_pin, 50)
        
        #pwm start
        self.servo_pwm.start(0)
        self.fan_pwm.start(0)
        self.led_pwm.start(100)
        self.water_pump_pwm.start(0)
        
        #servo init
        self.SERVO_MAX_DUTY = 12
        self.SERVO_MIN_DUTY = 3
        
        #soil setting
        self.min_soil_value = 0 #moist
        self.max_soil_value = 1023  #dry
        
        #sensing value
        self.water_temperature = 0
        self.temperature = 0
        self.humidity = 0
        self.soil = 0
        self.water_level_voltage = 0
        self.light = 0
        #control value
        self.water_pump_power = False
        self.water_pump_state = False
        self.water_pump_auto_toggle = False
        self.water_pump_toggle = False
        self.led_state = False
        self.led_toggle = False
        self.door_power = False
        self.door_auto_toggle = False
        self.door_state = False
        self.door_toggle = False
        self.fan_power = False
        self.fan_state = False
        self.fan_toggle = False
        self.fan_auto_toggle = False
        self.led_power = False
        self.led_auto_toggle = False
        self.led_start_time_value = 0
        self.led_start_minute_value = 0
        self.led_end_time_value = 0
        self.led_end_minute_value = 0
        self.water_pump_start_time = 0
        self.water_pump_running_time = 0
        self.fan_start_time_value = 0
        self.fan_start_minute_value = 0
        self.fan_end_time_value = 0
        self.fan_end_minute_value = 0
        self.door_start_time_value = 0
        self.door_start_minute_value = 0
        self.door_end_time_value = 0
        self.door_end_minute_value = 0
        #warning data
        self.water_level_warning = ""
        self.water_temp_warning = ""
        self.temp_warning = ""
        self.hum_warning = ""
        self.soil_warning = ""
        #remote data
        self.remote_power = False
        
        self.before_water_auto_toggle = False
        
        
        
        #json init
        self.json_data = {"smartfarm":"ABC123","temperature": self.temperature, "humidity": self.humidity,
            "light":self.light, "soil": self.soil, "waterlevelvoltage":self.water_level_voltage, "watertemperature": self.water_temperature,
            "waterpumppower" : self.water_pump_power,"waterpumpautotoggle":self.water_pump_auto_toggle,
            "waterpumpstarttime":self.water_pump_start_time,"waterpumprunningtime":self.water_pump_running_time,
            "waterpumpstate" : self.water_pump_state,"waterpumptoggle":self.water_pump_toggle,
            "ledstarttimevalue":self.led_start_time_value,"ledstartminutevalue":self.led_start_minute_value,
            "ledendtimevalue":self.led_end_time_value,
            "ledendminutevalue":self.led_end_minute_value,
            "fanstarttimevalue":self.fan_start_time_value,"fanstartminutevalue":self.fan_start_minute_value,
            "fanendtimevalue":self.fan_end_time_value,"fanendminutevalue":self.fan_end_minute_value,
            "ledpower":self.led_power,"ledstate": self.led_state, 
            "ledtoggle": self.led_toggle,"ledautotoggle":self.led_auto_toggle, "doorstate": self.door_state,
            "doortoggle": self.door_toggle, "fanstate": self.fan_state,"fantoggle": self.fan_toggle
            ,"fanautotoggle":self.fan_auto_toggle,"fanpower":self.fan_power,
            "doorpower":self.door_power,"doorautotoggle":self.door_auto_toggle,
            "doorstarttimevalue":self.door_start_time_value,"doorstartminutevalue":self.door_start_minute_value,
            "doorendtimevalue":self.door_end_time_value,"doorendminutevalue":self.door_end_minute_value,
            "waterlevelwarning":self.water_level_warning,"watertempwarning":self.water_temp_warning,
            "tempwarning":self.temp_warning,"humwarning":self.hum_warning,"soilwarning":self.soil_warning,
            "remotepower":self.remote_power}
        
    def setServodegree(self):
        while True:
            door_now = datetime.now()
            if self.json_data["doorpower"] == True or self.json_data["remotepower"] == True:
                if self.json_data["doorautotoggle"] == True:
                    if self.json_data["remotepower"] == False:
                        widget.door_onoff_button.setEnabled(False)
                    if int(door_now.hour) == self.json_data["doorstarttimevalue"] and int(door_now.minute) == self.json_data["doorstartminutevalue"]:
                        self.json_data["doortoggle"] = True
                        degree = 12
                        duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                        self.servo_pwm.ChangeDutyCycle(duty)
                        self.json_data["doorstate"] = True
                    elif int(door_now.hour) == self.json_data["doorendtimevalue"] and int(door_now.minute) == self.json_data["doorendminutevalue"]:
                        self.json_data["doortoggle"] = False
                        degree = 102
                        duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                        self.servo_pwm.ChangeDutyCycle(duty)
                        self.json_data["doorstate"] = False
                else:
                    if self.json_data["doorpower"] == True:
                        widget.door_onoff_button.setEnabled(True)
                    if self.json_data["doortoggle"] == True:
                        widget.door_auto_button.setEnabled(False)
                        degree = 12
                        duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                        self.servo_pwm.ChangeDutyCycle(duty)
                        self.json_data["doorstate"] = True
                    else:
                        widget.door_auto_button.setEnabled(True)
                        if self.water_temperature > 26.0:
                            degree = 12
                            duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                            self.servo_pwm.ChangeDutyCycle(duty)
                            self.json_data["doorstate"] = True
                        elif self.water_temperature <= 26.0:
                            degree = 102
                            duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                            self.servo_pwm.ChangeDutyCycle(duty)
                            self.json_data["doorstate"] = False
            else:
                self.json_data["doortoggle"] = False
                self.json_data["doorstate"] = False
                degree = 102
                duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                self.servo_pwm.ChangeDutyCycle(duty)
                if self.json_data["remotepower"] == False:
                    widget.door_onoff_button.setText("OFF")
                    widget.door_onoff_button.setChecked(False)
                    widget.door_onoff_button.setEnabled(False)
                    widget.door_auto_button.setChecked(False)
                    widget.door_auto_button.setEnabled(False)
                
                
    def fan_control(self):
        while True:
            fan_now = datetime.now()
            if self.json_data["fanpower"] == True or self.json_data["remotepower"] == True:
                if self.json_data["fanautotoggle"] == True:
                    if self.json_data["remotepower"] == False:
                        widget.fan_auto_button.setEnabled(True)
                        widget.fan_onoff_button.setEnabled(False)
                    if int(fan_now.hour) == self.json_data["fanstarttimevalue"] and int(fan_now.minute) == self.json_data["fanstartminutevalue"]:
                        self.json_data["fantoggle"] = True
                        self.fan_pwm.ChangeDutyCycle(100)
                        self.json_data["fanstate"] = True
                    elif int(fan_now.hour) == self.json_data["fanendtimevalue"] and int(fan_now.minute) == self.json_data["fanendminutevalue"]:
                        self.json_data["fantoggle"] = False
                        self.fan_pwm.ChangeDutyCycle(0)
                        self.json_data["fanstate"] = False
                else:
                    if self.json_data["fantoggle"] == True:
                        if self.json_data["remotepower"] == False:
                            widget.fan_onoff_button.setEnabled(True)
                            widget.fan_auto_button.setEnabled(False)
                        self.fan_pwm.ChangeDutyCycle(100)
                        self.json_data["fanstate"] = True
                    else:
                        if self.json_data["remotepower"] == False:
                            widget.fan_onoff_button.setEnabled(True)
                            widget.fan_auto_button.setEnabled(True)
                        if self.water_temperature > 26.0:
                            self.fan_pwm.ChangeDutyCycle(100)
                            self.json_data["fanstate"] = True
                        elif self.water_temperature <= 26.0:
                            self.fan_pwm.ChangeDutyCycle(0)
                            self.json_data["fanstate"] = False
            else:
                self.fan_pwm.ChangeDutyCycle(0)
                self.json_data["fanstate"] = False
                self.json_data["fantoggle"] = False
                if self.json_data["remotepower"] == False:
                    widget.fan_onoff_button.setText("OFF")
                    widget.fan_onoff_button.setChecked(False)
                    widget.fan_onoff_button.setEnabled(False)
                    widget.fan_auto_button.setChecked(False)
                    widget.fan_auto_button.setEnabled(False)
            

    def water_pump_control(self):
        while True:
            now_water_time = datetime.now()
            if self.json_data["waterpumppower"] == True or self.json_data["remotepower"] == True:
                #if self.json_data["remote_power"] == False:
                    #widget.water_auto_button.setEnabled(True)
                    #widget.water_onoff_button.setEnabled(True)
                if self.json_data["waterpumpautotoggle"] == True:
                    if self.before_water_auto_toggle == False:
                        this_water_time = datetime.now()
                        self.before_water_auto_toggle = True
                    widget.water_onoff_button.setEnabled(False)
                    if int(now_water_time.minute) == int(this_water_time.minute) + self.json_data["waterpumpstarttime"]:
                        self.json_data["waterpumpstate"] = True
                        self.json_data["waterpumptoggle"] = True
                        self.water_pump_pwm.ChangeDutyCycle(100)
                        widget.water_onoff_button.setEnabled(False)
                        time.sleep(self.json_data["waterpumprunningtime"])
                        self.water_pump_pwm.ChangeDutyCycle(0)
                        self.json_data["waterpumpstate"] = False
                        self.json_data["waterpumptoggle"] = False
                        this_water_time = datetime.now()
                        widget.water_onoff_button.setEnabled(True)
                        
                else:
                    self.before_water_auto_toggle = False
                    if self.json_data["remotepower"] == False:
                        widget.water_onoff_button.setEnabled(True)
                    if self.json_data["waterpumptoggle"] == True:
                        if self.json_data["remotepower"] == False:
                            widget.water_auto_button.setEnabled(False)
                        self.json_data["waterpumpstate"] = True
                        self.water_pump_pwm.ChangeDutyCycle(100)
                        widget.water_onoff_button.setEnabled(False)
                        if self.json_data["waterpumprunningtime"] >0:
                            time.sleep(self.json_data["waterpumprunningtime"])
                            self.water_pump_pwm.ChangeDutyCycle(0)
                            self.json_data["waterpumpstate"] = False
                            self.json_data["waterpumptoggle"] = False
                            if self.json_data["remotepower"] == False:
                                widget.water_onoff_button.setChecked(False)
                                widget.water_onoff_button.setText("OFF")
                                widget.water_auto_button.setEnabled(True)
                        else:
                            time.sleep(8)
                            self.water_pump_pwm.ChangeDutyCycle(0)
                            self.json_data["waterpumpstate"] = False
                            self.json_data["waterpumptoggle"] = False
                            if self.json_data["remotepower"] == False:
                                widget.water_onoff_button.setChecked(False)
                                widget.water_onoff_button.setText("OFF")
                                widget.water_auto_button.setEnabled(True)
                    else:
                        if self.json_data["remotepower"] == False:
                            widget.water_auto_button.setEnabled(True)
                            widget.water_onoff_button.setEnabled(True)
            else:
                self.water_pump_pwm.ChangeDutyCycle(0)
                self.json_data["waterpumpstate"] = False
                self.json_data["waterpumptoggle"] = False
                self.json_data["waterpumpautotoggle"] = False
                if self.json_data["remotepower"] == False:
                    widget.water_onoff_button.setChecked(False)
                    widget.water_onoff_button.setText("OFF")
                    widget.water_onoff_button.setEnabled(False)
                    widget.water_auto_button.setChecked(False)
                    widget.water_auto_button.setEnabled(False)
        
    def led_control(self):
        while True:
            now = datetime.now()
            if self.json_data["ledpower"] == True or self.json_data["remotepower"] == True:
                if self.json_data["ledautotoggle"] == True:
                    if int(now.hour) == self.json_data["ledstarttimevalue"]and int(now.minute)==self.json_data["ledstartminutevalue"]:
                        self.json_data["ledtoggle"] = True
                        self.led_pwm.ChangeDutyCycle(0)
                        self.json_data["ledstate"] = True
                    elif int(now.hour) == self.json_data["ledendtimevalue"]and int(now.minute)==self.json_data["ledendminutevalue"]:
                        self.json_data["ledtoggle"] = 0
                        self.led_pwm.ChangeDutyCycle(100)
                        self.json_data["ledstate"] = False
                else:            
                    if self.json_data["ledtoggle"] == True:
                        self.led_pwm.ChangeDutyCycle(0)
                        self.json_data["ledstate"] = True
                    elif self.json_data["ledtoggle"] == False:
                        self.led_pwm.ChangeDutyCycle(100)
                        self.json_data["ledstate"] = False
            else:
                self.led_pwm.ChangeDutyCycle(100)
                self.json_data["ledstate"] = False
                self.json_data["ledtoggle"] = False
                self.json_data["ledautotoggle"] = False
                if self.json_data["remotepower"] == False:
                    widget.led_onoff_button.setText("OFF")
                    widget.led_onoff_button.setChecked(False)
                    widget.led_auto_button.setChecked(False)
            
    def water_level_read(self,channel):
        water_level_adc = self.spi.xfer2([1,(8+channel)<<4,0])
        water_level_data = ((water_level_adc[1]&3)<<8)+water_level_adc[2]
        water_level_voltage = water_level_data*5.0/1024
        return water_level_voltage
        
    def soil_read(self,channel):
        soil_adc = self.spi.xfer2([1,(8+channel)<<4,0])
        soil_data = ((soil_adc[1]&3)<<8)+soil_adc[2]
        soil_percentage = abs(((soil_data - self.max_soil_value)/(self.min_soil_value-self.max_soil_value))*100)
        return soil_percentage
        
    def light_read(self,channel):
        light_adc = self.spi.xfer2([1, (8+channel)<<4,0])
        light_data = ((light_adc[1]&3<<8)+light_adc[2])
        return light_data
        
        
    
    def digital_sensor(self):
        watertemp_count = 0
        temp_count = 0
        hum_count = 0
        waterlevel_count = 0
        soil_count = 0
        while True:
            #water level sensor 
            self.water_level_voltage = int(self.water_level_read(self.mcp3008_ch2)*10)/10.0
            self.json_data["waterlevelvoltage"] = self.water_level_voltage
            if self.json_data["waterlevelvoltage"] <=1.0:
                waterlevel_count = waterlevel_count + 1
                if waterlevel_count == 10:
                    self.json_data["waterlevelwarning"] = "스마트팜 외부 수조의 물이 부족합니다."
                    waterlevel_count = 0
                else:
                    self.json_data["waterlevelwarning"] = ""
            else:
                self.json_data["waterlevelwarning"] = ""
                
            #soil sensor call
            self.soil = int((self.soil_read(self.mcp3008_ch1))*10)/10.0
            self.json_data["soil"] = self.soil
            if self.json_data["soil"] <= 10:
                soil_count = soil_count + 1
                if soil_count == 10:
                    self.json_Data["soilwarning"] = "스마트팜 내부의 흙이 건조합니다."
                    soil_count = 0
                else:
                    self.json_data["soilwarning"] = ""
            else:
                self.json_data["soilwarning"] = ""
            
            
            #light sensor call
            self.light = self.light_read(self.mcp3008_ch0)
            self.json_data["light"] = self.light
            
            #watertemp read
            self.water_temperature = int(self.watertemp_sensor_pin.get_temperature()*10)/10.0
            self.json_data["watertemperature"] = self.water_temperature
            if self.json_data["watertemperature"] >= 40:
                watertemp_count = watertemp_count + 1
                if watertemp_count == 10:
                    self.json_data["watertempwarning"] = "스마트팜 외부 수조의 수온이 너무 높습니다."
                    watertemp_count = 0
                else:
                    self.json_data["watertempwarning"] = ""
            else:
                self.json_data["watertempwarning"] = ""
                
            
            #dht sensor read
            self.humidity, self.temperature = Adafruit_DHT.read_retry(self.hm_sensor, self.dht_pin)
            self.json_data["humidity"] = (self.humidity)
            self.json_data["temperature"] = (self.temperature)
            if self.json_data["humidity"] >= 90:
                hum_count = hum_count + 1
                if hum_count == 10:
                    self.json_data["humwarning"] = "스마트팜 내부 습도가 너무 높습니다."
                    hum_count = 0
                else:
                    self.json_data["humwarning"] = ""
            else:
                self.json_data["humwarning"] = ""
            
            if self.json_data["temperature"] >= 35.0:
                temp_count = temp_count + 1
                if temp_count == 10:
                    self.json_data["tempwarning"] = "스마트팜 내부 온도가 너무 높습니다."
                    temp_count = 0
                else:
                    self.json_data["tempwarning"] = ""
            else:
                self.json_data["tempwarning"] =""
            
            #send data
            #headers = {'Authorization': "Token 980b2eac1963b0113d05714bdb5cb9a03e1b4003"}
            response = requests.post("http://203.230.102.75:10924/farm/raspberry",json=self.json_data).json()
            print("reponse data: "+str(response["remotepower"]))
            if response["remotepower"] == True:
                self.json_data = requests.get("http://203.230.102.75:10924/farm/smartfarm/ABC123/",json=self.json_data).json()
                self.json_data["remotepower"] = True
                print(self.json_data)
            elif response["remotepower"] == False:
                self.json_data["remotepower"] = False
                print(self.json_data)
                
            #print(response)
            #receive data
            #print(self.json_data)
            #response2 = requests.get("http://203.230.102.75:10924/farm/smartfarm/ABC1234/",headers=headers,json=self.json_data)
            #self.json_data -> json -> ret it be  / else json_data -> list -> [0]

farm = smartfarm()
widget = None

if __name__ == "__main__":
    try:

        folder_path = "/home/boseong/smartfarm/equipment/smartfarm_image"
        
        app = QApplication(sys.argv)
        widget = smartfarm_ui()
        widget.show()
        
        #camera_instance = smartfarm_camera(folder_path)
        #camera_thread = threading.Thread(target = smartfarm_camera.capture_image)
        fan_thread = threading.Thread(target = farm.fan_control)
        water_pump_thread = threading.Thread(target = farm.water_pump_control)
        digital_thread = threading.Thread(target = farm.digital_sensor)
        servo_thread = threading.Thread(target=farm.setServodegree)
        led_thread = threading.Thread(target = farm.led_control)
        
        digital_thread.start()
        servo_thread.start()
        led_thread.start()
        fan_thread.start()
        water_pump_thread.start()
        #camera_thread.start()
        
        
        sys.exit(app.exec_())
        digital_thread.join()
        servo_thread.join()
        led_thread.join()
        fan_thread.join()
        water_pump_thread.join()
        #camera_thread.join()
        
        
    except KeyboardInterrupt:
        farm.led_pwm.stop()
        farm.water_pump_pwm.stop()
        farm.servo_pwm.stop()
        farm.fan_pwm.stop()
        GPIO.cleanup()
