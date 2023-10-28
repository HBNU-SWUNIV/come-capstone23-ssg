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
    
    def capture_image(self):
        while True:
            timestamp= datetime.datetime.now().strftime("%Y%m%d%H%M%S")
            filename = f"image_{timestamp}.jpg"
            filepath=os.path.join(self.folder_path,filename)
            subprocess.run(["fswebcam","-r","640x480","--no-banner",filepath])
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
