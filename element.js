/** @class: Element
 *  @desc : Describes an element as an image, dimensions and a position.
*/
class Element {
  constructor(pos, image_path) {
    this.pos = pos;
    this.image_path = image_path;

    this.dims = this.computeDimensions(image_path);
    this.dimx = this.dims.dot(createVector(1, 0));
    this.dimy = this.dims.dot(createVector(0, 1));
  }
  computeDimensions(image_path) {
    var image = imageManager.getFromPath(image_path);
    return createVector(image.width  * global_image_scale,
                        image.height * global_image_scale);
  }
  draw() {
    imageManager.displayFromPath(this.image_path, this.pos);
  }
  update() {
  }
  overlap_one(other_element) {
    return this.overlap_point(other_element.pos)
    || this.overlap_point(p5.Vector.add(other_element.pos, other_element.dimx))
    || this.overlap_point(p5.Vector.add(other_element.pos, other_element.dimy))
    || this.overlap_point(p5.Vector.add(other_element.pos, other_element.dims));
  }
  overlap(other_element) {
    return this.overlap_one(other_element) || other_element.overlap_one(this);
  }
  overlap_point(point) {
    return this.pos.x <= point.x && point.x <= this.pos.x + this.dims.x
        && this.pos.y <= point.y && point.y <= this.pos.y + this.dims.y;
  }
}

/** @class: LayeredElement
  * @desc : A layered element has two images. A top image and a bottom image.
  *         The top image is the one provided by the mother class Element. When
  *         the player approaches such an element, the top image becomes
  *         transparent.
*/
class LayeredElement extends Element {
  constructor(pos, top_image_path, bottom_image_path) {
    super(pos, top_image_path);
    this.bottom_image_path = bottom_image_path;
    this.bottom_dims = this.computeDimensions(this.image_path);

    this.playerIn = false;

    this.alpha = 1;
    this.alphaTick = 0.01;
    this.fading = false;
    this.showing = false;
  }
  draw() {
    imageManager.displayFromPath(this.bottom_image_path, this.pos);
    if (this.alpha != 0) {
      super.draw();
    }
  }
  update(player) {
    if (this.fading) {
      this.alpha = constrain(this.alpha - this.alphaTick, 0, 1);
      if (this.alpha == 0) {
        this.fading = false;
      }
    }
    if (this.showing) {
      this.alpha = constrain(this.alpha + this.alphaTick, 0, 1);
      if (this.alpha == 1) {
        this.showing = false;
      }
    }

    if (this.playerEnters(player)) {
      this.playerIn = true;
      this.fading = true;
      this.showing = false;
    }
    else if (this.playerLeaves(player)) {
      this.playerIn = false;
      this.showing = true;
      this.fading = false;
    }
  }
  playerEnters(player) {
    var res = !this.playerIn && this.overlap(player);
    return res;
  }
  playerLeaves(player) {
    return this.playerIn && !this.overlap(player);
  }
  static newSpruce() {
    return new LayeredElement(createVector(500, 500), "assets/spruce.png",
                              "assets/spruce_trunk.png");
  }
}
