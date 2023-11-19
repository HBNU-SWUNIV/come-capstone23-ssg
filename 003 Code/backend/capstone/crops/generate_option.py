class GenerateOption:
    def __init__(self):
        # <test_model.py>
        self.gpu_ids = [0]  # gpu ids: e.g. 0 0,1,2, 0,2. use -1 for CPU
        self.preprocess = 'resize_and_crop'  # scaling and cropping of images at load time [resize_and_crop | crop | scale_width | scale_width_and_crop | none]
        self.model_suffix = '' # In checkpoints_dir, [epoch]_net_G[model_suffix].pth will be loaded as the generator.
        self.input_nc = 3  # of input image channels: 3 for RGB and 1 for grayscale
        self.output_nc = 3  # of output image channels: 3 for RGB and 1 for grayscale
        self.ngf = 64  # of discrim filters in the first conv layer
        self.no_dropout = 'store_true'  # no dropout for the generator
        self.init_type = 'normal'  # network initialization [normal | xavier | kaiming | orthogonal]
        self.init_gain = 0.02  # scaling factor for normal, xavier and orthogonal
        self.direction = 'AtoB'
        self.load_size = 256
        self.crop_size = 256
        self.no_flip = True