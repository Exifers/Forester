/** @class: MapGenerator
  * @desc : Generates a map as an array of Element.
  * @ctor : @param: mapGenData: data used to generate the map, it has the
  *         following format:
  *         {
  *           dimensions: (p5.Vector)
  *           density: (int),
  *           elements: [
  *             { path:(string), relCount: (int) },
  *             { ... },
  *             ...
  *           ]
  *         }
  *         dimensions: dimensions of the map in pixels.
  *         density   : indicator of surface to be covered by elements relative
  *                     to the surface of the whole map.
  *         elements  : list of possible images used to fill the map, with their
  *                     path and a indicator (relCount) of how often the image
  *                     should appear.
  * @usage: generate() returns the list of Element.
*/

class MapGenerator {
  constructor(mapGenData) {
    this.mapGenData = mapGenData;
    this.elements = [];
  }
  generate() {
    var count_coeff = this.getCountCoeff();
    var res = [];
    for (var element_data of this.mapGenData.elements) {
      var count = Math.round(element_data.relCount * count_coeff);
      for (var i = 0; i < count; i++) {
        this.addNewElement(res, element_data);
      }
    }
    this.elements = res;
    return res;
  }
  addNewElement(elements, element_data) {
    var max_attempts = 20;
    for (var i = 0; i < max_attempts; i++) {
      let randomPos = this.createRandomPos(element_data);
      var new_element = new Element(randomPos, element_data.path);
      if (!elements.some((e) => {return e.overlap(new_element)})) {
        elements.push(new_element);
        console.log("added");
        return;
      }
      console.log("retry");
    }
  }
  createRandomPos(element_data) {
    var dims = imageManager.getDimsFromPath(element_data.path);
    var map_width = this.mapGenData.dimensions.x;
    var map_height = this.mapGenData.dimensions.y;
    var x = Math.random()*(map_width - dims.x * global_image_scale);
    var y = Math.random()*(map_height - dims.y * global_image_scale);
    return createVector(x, y);
  }
  getCountCoeff() {
    var map_area = this.mapGenData.dimensions.x * this.mapGenData.dimensions.y;
    var count_coeff = map_area*this.mapGenData.density/this.getUniqueSumArea();
    return count_coeff;
  }
  getUniqueSumArea() {
    var sum = 0;
    for (var element_data of this.mapGenData.elements) {
      sum += imageManager.getAreaFromPath(element_data.path)
           * global_image_scale * global_image_scale
           * element_data.relCount;
    }
    return sum;
  }
  loadData() {
    for (var element_data of this.mapGenData.elements) {
      imageManager.reload(element_data.path);
    }
  }
}


/** @section: globals
  * @desc   : declaration of global variables and their setup function.
*/

var mapGenerator;
var mapGenData;

setupManager.add_function(() => {
  mapGenData = {
    dimensions: createVector(screen.width, screen.height),
    density: 0.6,
    elements: [
        {path: "assets/stones.png", relCount: 8},
        {path: "assets/gold_mine.png", relCount: 2},
        {path: "assets/oak.png", relCount: 10},
        {path: "assets/spruce.png", relCount: 5}
      ]
  };
  mapGenerator = new MapGenerator(mapGenData);
});
