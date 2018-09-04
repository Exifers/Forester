var global_image_scale;

function setup() {
  setupManager.run_all();
  global_image_scale = 0.5;

  createCanvas(screen.width, screen.height);
}

function draw() {
  background(80, 134, 79);
  executer.run_on_first_loop(() => mapGenerator.loadData());
  if (all_images_loaded()) {
    executer.run_once(() => mapGenerator.generate(), 1);
    for (var e of mapGenerator.elements) {
      e.draw();
      e.update();
    }
  }
  executer.endLoop();
}
