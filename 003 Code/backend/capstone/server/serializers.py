from rest_framework.serializers import ModelSerializer

from .models import SmartFarm, SmartFarmSensor

class SmartFarmSensorBaseModelSerializer(ModelSerializer):
    class Meta:
        model = SmartFarmSensor
        # fields = '__all__'
        fields = [ 
                  'remotepower', 
                  'temperature', 
                  'humidity',
                  'light',
                  'soil',
                  'ledpower', 
                  'ledstate', 
                  'ledtoggle', 
                  'ledautotoggle', 
                  'ledstarttimevalue', 
                  'ledstartminutevalue', 
                  'ledendtimevalue', 
                  'ledendminutevalue',
                  'waterpumppower',
                  'waterpumpstate',
                  'waterpumptoggle',
                  'waterpumpautotoggle',
                  'waterpumpstarttime',
                  'waterpumprunningtime',
                  'waterlevelvoltage',
                  'watertemperature',
                  'fanpower',
                  'fanstate',
                  'fantoggle',
                  'fanautotoggle',
                  'fanstarttimevalue',
                  'fanstartminutevalue',
                  'fanendtimevalue',
                  'fanendminutevalue',
                  'doorpower',
                  'doorstate',
                  'doortoggle',
                  'doorautotoggle',
                  'doorstarttimevalue',
                  'doorstartminutevalue',
                  'doorendtimevalue',
                  'doorendminutevalue',
                  'waterlevelwarning',
                  'watertempwarning',
                  'tempwarning',
                  'humwarning',
                  'soilwarning'
        ]
        # exclude = ("")
    
class InfoListModelSerializer(SmartFarmSensorBaseModelSerializer):
    class Meta(SmartFarmSensorBaseModelSerializer.Meta):
        fields = [ 
                #   'sfid', 
                  'remotepower', 
                  'temperature', 
                  'humidity']
        
class LedListModelSerializer(SmartFarmSensorBaseModelSerializer):
    class Meta(SmartFarmSensorBaseModelSerializer.Meta):
        fields = ['ledpower', 
                  'ledstate', 
                  'ledtoggle', 
                  'ledautotoggle', 
                  'ledstarttimevalue', 
                  'ledstartminutevalue', 
                  'ledendtimevalue', 
                  'ledendminutevalue']
        
class WaterListModelSerializer(SmartFarmSensorBaseModelSerializer):
    class Meta(SmartFarmSensorBaseModelSerializer.Meta):
        fields = ['waterpumppower',
                'waterpumpstate',
                'waterpumptoggle',
                'waterpumpautotoggle',
                'waterpumpstarttime',
                'waterpumprunningtime',
                'waterlevelvoltage',
                'watertemperature']
class FanListModelSerializer(SmartFarmSensorBaseModelSerializer):
    class Meta(SmartFarmSensorBaseModelSerializer.Meta):
        fields = [
            'fanpower',
            'fanstate',
            'fantoggle',
            'fanautotoggle',
            'fanstarttimevalue',
            'fanstartminutevalue',
            'fanendtimevalue',
            'fanendminutevalue'
        ]
        
class DoorListModelSerializer(SmartFarmSensorBaseModelSerializer):
    class Meta(SmartFarmSensorBaseModelSerializer.Meta):
        fields = [
                'doorpower',
                'doorstate',
                'doortoggle',
                'doorautotoggle',
                'doorstarttimevalue',
                'doorstartminutevalue',
                'doorendtimevalue',
                'doorendminutevalue'
        ]
        
class WarningListModelSerializer(SmartFarmSensorBaseModelSerializer):
    class Meta(SmartFarmSensorBaseModelSerializer.Meta):
        fields = [
                'waterlevelwarning',
                'watertempwarning',
                'tempwarning',
                'humwarning',
                'soilwarning'
        ]
        
