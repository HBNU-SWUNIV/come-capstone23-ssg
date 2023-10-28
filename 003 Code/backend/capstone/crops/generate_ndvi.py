import numpy as np
import cv2

def compute_ndvi(rgb_img, nir_img):
    rgb_img = rgb_img.astype('float32')
    nir_img = nir_img.astype('float32')

    r_channel = rgb_img[:, :, 0]

    nir_channel = nir_img[:, :, 0]

    ndvi = (nir_channel - r_channel) / (nir_channel + r_channel)

    #Scaling
    ndvi = (ndvi + 1) / 2
    ndvi = (ndvi * 255).astype('uint8')

    return ndvi

if __name__ == '__main__':
    rgb = cv2.imread("0000_rgb.png")
    nir = genereate_nir(rgb)
    nir = cv2.imread("0000_nir.png")

    ndvi_img = compute_ndvi(rgb, nir)
    print(ndvi_img.shape, nir.shape, nir[0,0][0], nir[0,0][1], nir[0,0][2])
    cv2.imshow("result", ndvi_img)
    cv2.waitKey()