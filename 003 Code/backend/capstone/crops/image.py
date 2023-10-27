import numpy
import cv2
import matplotlib
from generate_option import GenerateOption
from test_model import TestModel
from load_image import LoadImage

class GenerateModel:
    def __init__(self, model_path):
        self.opt = GenerateOption()
        self.model = TestModel(self.opt)
        self.model.load_networks(model_path)
        self.model.eval()

    def generate_nir(self, rgb_img):
        self.rgb_image = LoadImage(self.opt, rgb_img).get_image()
        self.model.set_input(self.rgb_image)  # test_model.py: set_input function
        self.model.test()

        return self.rgb_image['A'], self.model.get_current_visuals()['fake']

def nir_to_ndvi(rgb_img, nir_img):
    rgb_img = cv2.imread(rgb_img)
    nir_img = cv2.imread(nir_img)
    rgb_img = rgb_img.astype('float32')
    nir_img = nir_img.astype('float32')

    r_channel = rgb_img[:, :, -1]
    nir_channel = nir_img[:, :, -1]

    ndvi = (nir_channel - r_channel) / (nir_channel + r_channel)
    ndvi_value = numpy.mean(ndvi)

    # Scaling
    ndvi = (ndvi + 1) / 2
    viridis_map = matplotlib.colormaps.get_cmap('coolwarm')

    ndvi_colormap = (viridis_map(numpy.clip(ndvi, 0, 1)) * 255).astype(numpy.uint8)
    ndvi_image = cv2.cvtColor(ndvi_colormap, cv2.COLOR_RGBA2BGR)

    return ndvi_value, ndvi_image
    

if __name__ == '__main__':
    model_path = ""   # model path
    rgb_img_path = ""   # RGB image path

    croped_rgb_img_path = ""   # path to save preprocessed RGB image
    nir_img_path = ""   # path to save NIR image
    ndvi_img_path = ""   # path to save NDVI image

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

    # calculate NDVI
    ndvi_value, ndvi_img = nir_to_ndvi(croped_rgb_img_path, nir_img_path)
    print('NDVI:', ndvi_value)
    cv2.imwrite(ndvi_img_path, ndvi_img)   # save NDVI image