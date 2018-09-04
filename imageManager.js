/** @class: ImageManager
  * @desc : Stores image paths and images
  * @usage: getFromPath(path) returns the image. Multiple calls won't load the
  *         image multiple times.
  *         displayFromPath(path) will draw the image directly. Multiple calls
  *         won't load the image multiple times.
  * @vocab: image: the pixels, image_path: the path,
  *         image_data: image and image_path
*/
class ImageManager {
  constructor(image_paths) {
    this.image_datas = this.build_images_data(image_paths)
    this.load_all_images();
  }
  getFromPath(image_path) {
    for (var data of this.image_datas) {
      if (data.path == image_path) {
        if (data.image == null) {
          data.image = ImageManager.loadImage(data.path);
        }
        return data.image;
      }
    }
    var new_image = ImageManager.loadImage(image_path);
    this.image_datas.push({image:new_image, path:image_path});
    return new_image;
  }
  reload(image_path) {
    for (var data of this.image_datas) {
      if (data.path == image_path) {
          data.image = ImageManager.loadImage(data.path);
        return data.image;
      }
    }
    var new_image = ImageManager.loadImage(image_path);
    this.image_datas.push({image:new_image, path:image_path});
    return new_image;
  }
  static loadImage(image_path) {
    non_resolved_load_requests++;
    var img = loadImage(image_path, image_loaded_callback,
        image_loaded_callback);
    return img;
  }
  /** @method: displayFromPath
    * @desc  : displays an image at some position given its file path.
    * @args  : image_path: the path, pos: a p5.Vector for the position.
    * @note  : p5.js must have been initialized via setup() to use this.
  */
  displayFromPath(image_path, pos) {
    var img = this.getFromPath(image_path);
    image(img, pos.x, pos.y,
        img.width * global_image_scale,
        img.height * global_image_scale);
  }
  /** @method: getAreaFromPath
    * @desc  : returns the surface in pixels of the image.
  */
  getAreaFromPath(image_path) {
    var img = this.getFromPath(image_path);
    return img.width * img.height;
  }
  /** @method : getDimsFromPath
    * @desc   : returns the dimensions of an image as 2D p5.Vector.
  */
  getDimsFromPath(image_path) {
    var img = this.getFromPath(image_path);
    return createVector(img.width, img.height);
  }
  build_images_data(image_paths) {
    var res = []
    for (var path of image_paths) {
      res.push({image:null, path:path});
    }
    return res;
  }
  load_all_images() {
    for (var data of this.image_datas) {
      if (data.image == null) {
        data.image = ImageManager.loadImage(data.path);
      }
    }
  }
}


/** @section: async helpers
  * @desc   : tells if all images to be loaded have been loaded.
  * @usage  : all_images_loaded() returns true if all images have been loaded,
  *           false otherwise.
*/
var non_resolved_load_requests = 0;

function image_loaded_callback(img) {
  non_resolved_load_requests--;
}

function all_images_loaded() {
  return non_resolved_load_requests == 0;
}

/** @section: globals
  * @desc   : declaration of globals variables and their setup function.
*/

var imageManager;

setupManager.add_function(() => {
  imageManager = new ImageManager([]);
});
