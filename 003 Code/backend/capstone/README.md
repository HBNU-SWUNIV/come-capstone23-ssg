# Getting Started with Django

## How to run
`pip install -r requirements.txt`

### Change route settings
`crops/views.py`

Change the path of model_path, rgb_img_path, croped_rgb_img_path, nir_img_path, ndvi_img_path

### smartfarm.json
If you want to have the smartfarm.json, you need to use the Firebase alarm service.

Create the Firebase Cloud Messaging and download smartfarm.json.

### Now you can run:
`python manage.py makemigrations`

`python manage.py migrate`

`python manage.py runserver`
