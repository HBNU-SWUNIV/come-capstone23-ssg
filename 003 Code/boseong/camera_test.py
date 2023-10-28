import os
import time
import datetime
import threading
import subprocess
import schedule
import requests

class smartfarm_camera:
	
    def __init__(self, folder_path):
        self.folder_path=folder_path
        self.camera_url = "http://203.230.102.75:10924/image"
    
    def capture_image(self):
        while True:
            timestamp= datetime.datetime.now().strftime("%Y%m%d%H%M%S")
            filename = f"image_{timestamp}.jpg"
            filepath=os.path.join(self.folder_path,filename)
            subprocess.run(["fswebcam","-r","640x480","--no-banner",filepath])
            files = {'file':open(filepath,'rb')}
            response_image = requests.post(self.camera_url,files=files)
            print(response_image)
            time.sleep(5)


if __name__ == "__main__":
    try:

        folder_path = "/home/boseong/smartfarm/bronze/smartfarm_image"
        camera_instance = smartfarm_camera(folder_path)
        camera_thread = threading.Thread(target = camera_instance.capture_image)
        
        camera_thread.start()
        
        camera_thread.join()
        
    except KeyboardInterrupt:
        pass
