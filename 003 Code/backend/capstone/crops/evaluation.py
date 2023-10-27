import numpy
import cv2
from skimage.metrics import peak_signal_noise_ratio as psnr
from skimage.metrics import structural_similarity as ssim

# Calculate MSE
original_img = cv2.imread("original_img name")
constract_img = cv2.imread("constract_img name")

MSE = numpy.mean((original_img - constract_img)**2)

# Calculate PSNR and SSIM
original_img = cv2.cvtColor(original_img, cv2.COLOR_BGR2RGB)
original_img
constract_img = cv2.cvtcolor(constract_img, cv2.COLOR_BGR2RGB)

PSNR = psnr(original_img, constract_img)
SSIM = ssim(original_img, constract_img, multichannel=True)

print("MSE:", MSE)
print("PSNR:", PSNR)
print("SSIM:", SSIM)