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
        
        self.timer.start()
        initial_time = QTime(0, 0)
        
    def led_time_set(self):
        farm.json_data["led_start_time_value"] = int(self.led_auto_start_time.time().toString("hh"))
        farm.json_data["led_start_minute_value"] = int(self.led_auto_start_time.time().toString("mm"))
        farm.json_data["led_end_time_value"] = int(self.led_auto_end_time.time().toString("hh"))
        farm.json_data["led_end_minute_value"] = int(self.led_auto_end_time.time().toString("mm"))
    def water_pump_set(self):
        farm.json_data["water_pump_start_time"] = int(self.water_start_time.currentText())
        farm.json_data["water_pump_running_time"] = int(self.water_running_time.currentText())
    def fan_time_set(self):
        farm.json_data["fan_start_time_value"] = int(self.fan_auto_start_time.time().toString("hh"))
        farm.json_data["fan_start_minute_value"] = int(self.fan_auto_start_time.time().toString("mm"))
        farm.json_data["fan_end_time_value"] = int(self.fan_auto_end_time.time().toString("hh"))
        farm.json_data["fan_end_minute_value"] = int(self.fan_auto_end_time.time().toString("mm"))
    def door_time_set(self):
        farm.json_data["door_start_time_value"] = int(self.door_auto_start_time.time().toString("hh"))
        farm.json_data["door_start_minute_value"] = int(self.door_auto_start_time.time().toString("mm"))
        farm.json_data["door_end_time_value"] = int(self.door_auto_end_time.time().toString("hh"))
        farm.json_data["door_end_minute_value"] = int(self.door_auto_end_time.time().toString("mm"))
    
    def remote_init(self):
        if farm.json_data["remote_power"] != self.before_remote_power and farm.json_data["remote_power"] == True:
            
            self.before_remote_power = True
            #led time set
            farm.json_data["led_start_time_value"]=0
            farm.json_data["led_start_minute_value"]=0
            farm.json_data["led_end_time_value"]=0
            farm.json_data["led_end_time_value"]=0
            self.led_auto_start_time.setTime(initial_time)
            self.led_auto_end_time.setTime(initial_time)
            
            #led button set
            farm.json_data["led_power"]= False
            farm.json_data["led_toggle"]= False
            farm.json_data["led_auto_toggle"]= False
            farm.json_data["led_state"] = False
            self.led_onoff_button.setText("OFF")
            self.led_onoff_button.setChecked(False)
            self.led_onoff_button.setEnabled(False)
            self.led_auto_button.setChecked(False)
            self.led_auto_button.setEnabled(False)
            self.led_power_button.setText("OFF")
            self.led_power_button.setChecked(False)
            self.led_power_button.setEnabled(False)
            
            #water pump time set
            farm.json_data["wter_pump_start_time"]=0
            farm.json_data["water_pump_running_time"]=0
            self.water_start_time.setCurrentIndex(1)
            self.water_running_time.setCurrentIndex(1)
            
            #water pump button set
            farm.json_data["water_pump_power"] = False
            farm.json_data["water_pump_toggle"] = False
            farm.json_data["water_pump_state"] = False
            farm.json_data["water_pump_auto_toggle"] = False
            self.water_onoff_button.setText("OFF")
            self.water_onoff_button.setChecked(False)
            self.water_onoff_button.setEnabled(False)
            self.water_auto_button.setChekced(False)
            self.water_auto_button.setEnabled(False)
            self.water_power_button.setText("OFF")
            self.water_power_button.setChecked(False)
            self.water_power_button.setEnabled(False)
            
            #fan time set
            farm.json_data["fan_start_time_value"] = 0
            farm.json_data["fan_start_minute_value"] = 0
            farm.json_data["fan_end_time_value"] =0
            farm.json_data["fan_end_minute_value"] =0
            self.fan_auto_start_time.setTime(initial_time)
            self.fan_auto_end_time.setTime(initial_time)
            
            #fan button set
            farm.json_data["fan_power"] = False
            farm.json_data["fan_toggle"] = False
            farm.json_data["fan_auto_toggle"] = False
            farm.json_data["fan_state"] = False
            self.fan_onoff_button.setText("OFF")
            self.fan_onoff_button.setChecked(False)
            self.fan_onoff_button.setEnabled(False)
            self.fan_auto_button.setChecked(False)
            self.fan_auto_button.setEnabled(False)
            self.fan_power_button.setText("OFF")
            self.fan_power_button.setChecked(False)
            self.fan_power_button.setEnabled(False)
            
            #door time set
            farm.json_data["door_start_time_value"] = 0
            farm.json_data["door_start_minute_value"] = 0
            farm.json_data["door_end_time_value"] = 0
            farm.json_data["door_end_minute_value"] = 0
            self.door_auto_start_time.setTime(initial_time)
            self.door_auto_end_time.setTime(initial_time)
            
            #door button set
            farm.json_data["door_power"] = False
            farm.json_data["door_toggle"] = False
            farm.json_data["door_state"] = False
            farm.json_data["door_auto_toggle"] = False
            self.door_onoff_button.setText("OFF")
            self.door_onoff_button.setChecked(False)
            self.door_onoff_button.setEnabled(False)
            self.door_auto_button.setChecked(False)
            self.door_auto_button.setEnabled(False)
            self.door_power_button.setText("OFF")
            self.door_power_button.setChecked(False)
            self.door_power_button.setEnabled(False)
            
        elif farm.json_data["remote_power"] == False and self.before_remote_power != farm.json_data["remote_power"]:
            self.before_remote_power = False
            self.led_power_button.setEnabled(True)
            self.water_pump_button.setEnabled(True)
            self.fan_power_button.setEnabled(True)
            self.door_power_button.setEnabled(True)
            
            
            
            
            
    def door_tab_button(self):
        if self.door_power_button.isChecked() :
            farm.json_data["door_power"] = True
            self.door_auto_button.setEnabled(True)
            self.door_onoff_button.setEnabled(True)
            self.door_power_button.setText("ON")
            if self.door_onoff_button.isChecked() :
                self.door_onoff_button.setText("ON")
                self.door_auto_button.setEnabled(False)
                farm.json_data["door_toggle"] = True
            else:
                self.door_onoff_button.setText("OFF")
                self.door_auto_button.setEnabled(True)
                farm.json_data["door_toggle"] = False
            
            if self.door_auto_button.isChecked() :
                self.door_onoff_button.setEnabled(False)
                farm.json_data["door_auto_toggle"] = True
            else:
                self.door_onoff_button.setEnabled(True)
                farm.json_data["door_auto_toggle"] = False
        else:
            self.door_auto_button.setEnabled(False)
            self.door_onoff_button.setEnabled(False)
            self.door_power_button.setText("OFF")
            farm.json_data["door_power"] = False
        
    def fan_tab_button(self):
        if self.fan_power_button.isChecked() :
            farm.json_data["fan_power"] = True
            self.fan_auto_button.setEnabled(True)
            self.fan_onoff_button.setEnabled(True)
            self.fan_power_button.setText("ON")
            if self.fan_onoff_button.isChecked():
                self.fan_onoff_button.setText("ON")
                self.fan_auto_button.setEnabled(False)
                farm.json_data["fan_toggle"] = True
            else:
                self.fan_onoff_button.setText("OFF")
                self.fan_auto_button.setEnabled(True)
                farm.json_data["fan_toggle"]=False
            
            if self.fan_auto_button.isChecked() :
                self.fan_onoff_button.setEnabled(False)
                farm.json_data["fan_auto_toggle"] = True
            else:
                self.fan_onoff_button.setEnabled(True)
                farm.json_data["fan_auto_toggle"] = False
        else:
            self.fan_auto_button.setChecked(False)
            self.fan_onoff_button.setChecked(False)
            self.fan_onoff_button.setText("OFF")
            self.fan_power_button.setText("OFF")
            self.fan_auto_button.setEnabled(False)
            self.fan_onoff_button.setEnabled(False)
            farm.json_data["fan_power"] = False
    
    def led_tab_button(self):
        if self.led_power_button.isChecked() :
            farm.json_data["led_power"] = True
            self.led_auto_button.setEnabled(True)
            self.led_onoff_button.setEnabled(True)
            self.led_power_button.setText("ON")
            if self.led_onoff_button.isChecked() :
                self.led_onoff_button.setText("ON")
                self.led_auto_button.setEnabled(False)
                farm.json_data["led_toggle"] = True
            else:
                self.led_onoff_button.setText("OFF")
                self.led_auto_button.setEnabled(True)
                farm.json_data["led_toggle"] = False
            if self.led_auto_button.isChecked() :
                self.led_onoff_button.setEnabled(False)
                farm.json_data["led_auto_toggle"] = True
            else:
                self.led_onoff_button.setEnabled(True)
                farm.json_data["led_auto_toggle"] = False
        else:
            self.led_auto_button.setEnabled(False)
            self.led_onoff_button.setEnabled(False)
            self.led_power_button.setText("OFF")
            farm.json_data["led_power"] = False
            farm.json_data["led_toggle"] = False
    def water_tab_button(self):
        if self.water_power_button.isChecked() :
            farm.json_data["water_pump_power"] = True
            self.water_power_button.setText("ON")
            self.water_auto_button.setEnabled(True)
            self.water_auto_button.setEnabled(True)
            if self.water_onoff_button.isChecked():
                self.water_onoff_button.setText("ON")
                self.water_auto_button.setEnabled(False)
                farm.json_data["water_pump_toggle"] = True
            else:
                self.water_onoff_button.setText("OFF")
                farm.json_data["water_pump_toggle"] = False
            if self.water_auto_button.isChecked() :
                self.water_onoff_button.setEnabled(False)
                farm.json_data["water_pump_auto_toggle"] = True
            else:
                farm.json_data["water_pump_auto_toggle"] = False
        else:
            self.water_auto_button.setEnabled(False)
            self.water_onoff_button.setEnabled(False)
            self.water_power_button.setText("OFF")
            farm.json_data["water_pump_power"] = False
            farm.json_data["water_pump_toggle"] = False
    
    def display_image(self, label, image_path):
        pixmap = QPixmap(image_path)
        label.setPixmap(pixmap)
        
    def home_set_text(self):
        self.home_temperature.setText(str(farm.json_data["temperature"]))
        self.home_humidity.setText(str(farm.json_data["humidity"]))
        
        if farm.json_data["led_state"] == True:
            self.home_led_text.setText("현재 작동중입니다.")
        elif farm.json_data["led_state"] == False:
            self.home_led_text.setText("현재 작동중이지 않습니다.")
            
        if farm.json_data["water_pump_state"] == True:
            self.home_water_text.setText("현재 작동중입니다.")
        elif farm.json_data["water_pump_state"] == False:
            self.home_water_text.setText("현재 작동중이지 않습니다.")
        
        if farm.json_data["fan_state"] == True:
            self.home_fan_text.setText("현재 작동중입니다.")
        elif farm.json_data["fan_state"] == False:
            self.home_fan_text.setText("현재 작동중이지 않습니다.")
        
        if farm.json_data["door_state"] == False:
            self.home_door_text.setText("현재 닫혀 있습니다.")
        elif farm.json_data["door_state"] == True:
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
        
        #sf_id
        self.sf_id = 92
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
        self.json_data = {"sf_id" : self.sf_id, "temperature": self.temperature, "humidity": self.humidity,
            "light":self.light, "soil": self.soil, "water_level_voltage":self.water_level_voltage, "water_temperature": self.water_temperature,
            "water_pump_power" : self.water_pump_power,"water_pump_auto_toggle":self.water_pump_auto_toggle,
            "water_pump_start_time":self.water_pump_start_time,"water_pump_running_time":self.water_pump_running_time,
            "water_pump_state" : self.water_pump_state,"water_pump_toggle":self.water_pump_toggle,
            "led_start_time_value":self.led_start_time_value,"led_start_minute_value":self.led_start_minute_value,
            "led_end_time_value":self.led_end_time_value,
            "led_end_minute_value":self.led_end_minute_value,
            "fan_start_time_value":self.fan_start_time_value,"fan_start_minute_value":self.fan_start_minute_value,
            "fan_end_time_value":self.fan_end_time_value,"fan_end_minute_value":self.fan_end_minute_value,
            "led_power":self.led_power,"led_state": self.led_state, 
            "led_toggle": self.led_toggle,"led_auto_toggle":self.led_auto_toggle, "door_state": self.door_state,
            "door_toggle": self.door_toggle, "fan_state": self.fan_state,"fan_toggle": self.fan_toggle
            ,"fan_auto_toggle":self.fan_auto_toggle,"fan_power":self.fan_power,
            "door_power":self.door_power,"door_auto_toggle":self.door_auto_toggle,
            "door_start_time_value":self.door_start_time_value,"door_start_minute_value":self.door_start_minute_value,
            "door_end_time_value":self.door_end_time_value,"door_end_minute_value":self.door_end_minute_value,
            "water_level_warning":self.water_level_warning,"water_temp_warning":self.water_temp_warning,
            "temp_warning":self.temp_warning,"hum_warning":self.hum_warning,"soil_warning":self.soil_warning,
            "remote_power":self.remote_power}
        
    def setServodegree(self):
        while True:
            door_now = datetime.now()
            if self.json_data["door_power"] == True:
                if self.json_data["door_auto_toggle"] == True:
                    if self.json_data["remote_power"] == False:
                        widget.door_onoff_button.setEnabled(False)
                    if int(door_now.hour) == self.json_data["door_start_time_value"] and int(door_now.minute) == self.json_data["door_start_minute_value"]:
                        self.json_data["door_toggle"] = True
                        degree = 12
                        duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                        self.servo_pwm.ChangeDutyCycle(duty)
                        self.json_data["door_state"] = True
                    elif int(door_now.hour) == self.json_data["door_end_time_value"] and int(door_now.minute) == self.json_data["door_end_minute_value"]:
                        self.json_data["door_toggle"] = False
                        degree = 102
                        duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                        self.servo_pwm.ChangeDutyCycle(duty)
                        self.json_data["door_state"] = False
                else:
                    widget.door_onoff_button.setEnabled(True)
                    if self.json_data["door_toggle"] == True:
                        widget.door_auto_button.setEnabled(False)
                        degree = 12
                        duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                        self.servo_pwm.ChangeDutyCycle(duty)
                        self.json_data["door_state"] = True
                    else:
                        widget.door_auto_button.setEnabled(True)
                        if self.water_temperature > 26.0:
                            degree = 12
                            duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                            self.servo_pwm.ChangeDutyCycle(duty)
                            self.json_data["door_state"] = True
                        elif self.water_temperature <= 26.0:
                            degree = 102
                            duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                            self.servo_pwm.ChangeDutyCycle(duty)
                            self.json_data["door_state"] = False
            else:
                self.json_data["door_toggle"] = False
                self.json_data["door_state"] = False
                degree = 102
                duty = self.SERVO_MIN_DUTY + (degree*(self.SERVO_MAX_DUTY - self.SERVO_MIN_DUTY)/180.0)
                self.servo_pwm.ChangeDutyCycle(duty)
                if self.json_data["remote_power"] == False:
                    widget.door_onoff_button.setText("OFF")
                    widget.door_onoff_button.setChecked(False)
                    widget.door_onoff_button.setEnabled(False)
                    widget.door_auto_button.setChecked(False)
                    widget.door_auto_button.setEnabled(False)
                
                
    def fan_control(self):
        while True:
            fan_now = datetime.now()
            if self.json_data["fan_power"] == True:
                if self.json_data["fan_auto_toggle"] == True:
                    if self.json_data["remote_power"] == False:
                        widget.fan_auto_button.setEnabled(True)
                        widget.fan_onoff_button.setEnabled(False)
                    if int(fan_now.hour) == self.json_data["fan_start_time_value"] and int(fan_now.minute) == self.json_data["fan_start_minute_value"]:
                        self.json_data["fan_toggle"] = True
                        self.fan_pwm.ChangeDutyCycle(100)
                        self.json_data["fan_state"] = True
                    elif int(fan_now.hour) == self.json_data["fan_end_time_value"] and int(fan_now.minute) == self.json_data["fan_end_minute_value"]:
                        self.json_data["fan_toggle"] = False
                        self.fan_pwm.ChangeDutyCycle(0)
                        self.json_data["fan_state"] = False
                else:
                    if self.json_data["fan_toggle"] == True:
                        if self.json_data["remote_power"] == False:
                            widget.fan_onoff_button.setEnabled(True)
                            widget.fan_auto_button.setEnabled(False)
                        self.fan_pwm.ChangeDutyCycle(100)
                        self.json_data["fan_state"] = True
                    else:
                        if self.json_data["remote_power"] == False:
                            widget.fan_onoff_button.setEnabled(True)
                            widget.fan_auto_button.setEnabled(True)
                        if self.water_temperature > 26.0:
                            self.fan_pwm.ChangeDutyCycle(100)
                            self.json_data["fan_state"] = True
                        elif self.water_temperature <= 26.0:
                            self.fan_pwm.ChangeDutyCycle(0)
                            self.json_data["fan_state"] = False
            else:
                self.fan_pwm.ChangeDutyCycle(0)
                self.json_data["fan_state"] = False
                self.json_data["fan_toggle"] = False
                if self.json_data["remote_power"] == False:
                    widget.fan_onoff_button.setText("OFF")
                    widget.fan_onoff_button.setChecked(False)
                    widget.fan_onoff_button.setEnabled(False)
                    widget.fan_auto_button.setChecked(False)
                    widget.fan_auto_button.setEnabled(False)
            

    def water_pump_control(self):
        while True:
            now_water_time = datetime.now()
            if self.json_data["water_pump_power"] == True:
                #if self.json_data["remote_power"] == False:
                    #widget.water_auto_button.setEnabled(True)
                    #widget.water_onoff_button.setEnabled(True)
                if self.json_data["water_pump_auto_toggle"] == True:
                    if self.before_water_auto_toggle == False:
                        this_water_time = datetime.now()
                        self.before_water_auto_toggle = True
                    widget.water_onoff_button.setEnabled(False)
                    if int(now_water_time.minute) == int(this_water_time.minute) + self.json_data["water_pump_start_time"]:
                        self.json_data["water_pump_state"] = True
                        self.json_data["water_pump_toggle"] = True
                        self.water_pump_pwm.ChangeDutyCycle(100)
                        widget.water_onoff_button.setEnabled(False)
                        time.sleep(self.json_data["water_pump_running_time"])
                        self.water_pump_pwm.ChangeDutyCycle(0)
                        self.json_data["water_pump_state"] = False
                        self.json_data["water_pump_toggle"] = False
                        this_water_time = datetime.now()
                        widget.water_onoff_button.setEnabled(True)
                        
                else:
                    self.before_water_auto_toggle = False
                    if self.json_data["remote_power"] == False:
                        widget.water_onoff_button.setEnabled(True)
                    if self.json_data["water_pump_toggle"] == True:
                        if self.json_data["remote_power"] == False:
                            widget.water_auto_button.setEnabled(False)
                        self.json_data["water_pump_state"] = True
                        self.water_pump_pwm.ChangeDutyCycle(100)
                        widget.water_onoff_button.setEnabled(False)
                        if self.json_data["water_pump_running_time"] >0:
                            time.sleep(self.json_data["water_pump_running_time"])
                            self.water_pump_pwm.ChangeDutyCycle(0)
                            self.json_data["water_pump_state"] = False
                            self.json_data["water_pump_toggle"] = False
                            if self.json_data["remote_power"] == False:
                                widget.water_onoff_button.setChecked(False)
                                widget.water_onoff_button.setText("OFF")
                                widget.water_auto_button.setEnabled(True)
                        else:
                            time.sleep(8)
                            self.water_pump_pwm.ChangeDutyCycle(0)
                            self.json_data["water_pump_state"] = False
                            self.json_data["water_pump_toggle"] = False
                            if self.json_data["remote_power"] == False:
                                widget.water_onoff_button.setChecked(False)
                                widget.water_onoff_button.setText("OFF")
                                widget.water_auto_button.setEnabled(True)
                    else:
                        if self.json_data["remote_power"] == False:
                            widget.water_auto_button.setEnabled(True)
                            widget.water_onoff_button.setEnabled(True)
            else:
                self.water_pump_pwm.ChangeDutyCycle(0)
                self.json_data["water_pump_state"] = False
                self.json_data["water_pump_toggle"] = False
                self.json_data["water_pump_auto_toggle"] = False
                if self.json_data["remote_power"] == False:
                    widget.water_onoff_button.setChecked(False)
                    widget.water_onoff_button.setText("OFF")
                    widget.water_onoff_button.setEnabled(False)
                    widget.water_auto_button.setChecked(False)
                    widget.water_auto_button.setEnabled(False)
        
    def led_control(self):
        while True:
            now = datetime.now()
            if self.json_data["led_power"] == True:
                if self.json_data["led_auto_toggle"] == True:
                    if int(now.hour) == self.json_data["led_start_time_value"]and int(now.minute)==self.json_data["led_start_minute_value"]:
                        self.json_data["led_toggle"] = 1
                        self.led_pwm.ChangeDutyCycle(0)
                        self.json_data["led_state"] = True
                    elif int(now.hour) == self.json_data["led_end_time_value"]and int(now.minute)==self.json_data["led_end_minute_value"]:
                        self.json_data["led_toggle"] = 0
                        self.led_pwm.ChangeDutyCycle(100)
                        self.json_data["led_state"] = False
                else:            
                    if self.json_data["led_toggle"] == True:
                        self.led_pwm.ChangeDutyCycle(0)
                        self.json_data["led_state"] = True
                    elif self.json_data["led_toggle"] == False:
                        self.led_pwm.ChangeDutyCycle(100)
                        self.json_data["led_state"] = False
            else:
                self.led_pwm.ChangeDutyCycle(100)
                self.json_data["led_state"] = False
                self.json_data["led_toggle"] = False
                self.json_data["led_auto_toggle"] = False
                if self.json_data["remote_power"] == False:
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
        while True:
            #water level sensor 
            self.water_level_voltage = int(self.water_level_read(self.mcp3008_ch2)*10)/10.0
            self.json_data["water_level_voltage"] = self.water_level_voltage
            if self.json_data["water_level_voltage"] <=1.0:
                self.json_data["water_level_warning"] = "스마트팜 외부 수조의 물이 부족합니다"
            else:
                self.json_data["water_level_warning"] = ""
                
            #soil sensor call
            self.soil = int((self.soil_read(self.mcp3008_ch1))*10)/10.0
            self.json_data["soil"] = self.soil
            if self.json_data["soil"] <= 10:
                self.json_data["soil_warning"] = "스마트팜 내부의 흙이 건조합니다"
            else:
                self.json_data["soil_warning"] = ""
            
            
            #light sensor call
            self.light = self.light_read(self.mcp3008_ch0)
            self.json_data["light"] = self.light
            
            #watertemp read
            self.water_temperature = int(self.watertemp_sensor_pin.get_temperature()*10)/10.0
            self.json_data["water_temperature"] = self.water_temperature
            if self.json_data["water_temperature"] >= 40:
                self.json_data["water_temp_warning"] = "스마트팜 외부 수조의 수온이 너무 높습니다"
            else:
                self.json_data["water_temp_warning"] = ""
                
            
            #dht sensor read
            self.humidity, self.temperature = Adafruit_DHT.read_retry(self.hm_sensor, self.dht_pin)
            self.json_data["humidity"] = (self.humidity)
            self.json_data["temperature"] = (self.temperature)
            if self.json_data["humidity"] >= 90:
                self.json_data["hum_warning"] = "스마트팜 내부 습도가 너무 높습니다"
            else:
                self.json_data["hum_warning"] = ""
            
            if self.json_data["temperature"] >= 35.0:
                self.json_data["temp_warning"] = "스마트팜 내부 온도가 너무 높습니다"
            else:
                self.json_data["temp_warning"] =""
            
            #response = requests.post("http://203.230.102.75:10924/farm/inf",json=self.json_data)
            #response = requests.post("http://192.168.0.156:5000/")
            print(self.json_data)
            #self.json_data = response.json()
            #print(self.json_data)

            #self.json_data = requests.get("http://203.230.102.75:10924/farm/inf",json=self.json_data).json()
            #print(self.json_data)

farm = smartfarm()
widget = None

if __name__ == "__main__":
    try:

        
        app = QApplication(sys.argv)
        widget = smartfarm_ui()
        widget.show()
        
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
        
        
        sys.exit(app.exec_())
        digital_thread.join()
        servo_thread.join()
        led_thread.join()
        fan_thread.join()
        water_pump_thread.join()
        
        
    except KeyboardInterrupt:
        farm.led_pwm.stop()
        farm.water_pump_pwm.stop()
        farm.servo_pwm.stop()
        farm.fan_pwm.stop()
        GPIO.cleanup()
