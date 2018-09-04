/** @class: Element
 *  @desc : Describes an element as an image, dimensions and a position.
*/
class Element {
  constructor(pos, image_path) {
    this.pos = pos;
    this.image_path = image_path;

    this.dims = this.computeDimensions();
    this.dimx = this.dims.dot(createVector(1, 0));
    this.dimy = this.dims.dot(createVector(0, 1));
  }
  computeDimensions() {
    var image = imageManager.getFromPath(this.image_path);
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
