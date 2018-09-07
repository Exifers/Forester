var global_image_scale;

var player;

var li;

function setup() {
  setupManager.run_all();
  global_image_scale = 0.5;

  createCanvas(screen.width, screen.height);

  imageManager.reload("assets/player.png");
  imageManager.reload("assets/spruce.png");
  imageManager.reload("assets/spruce_trunk.png");
}

function draw() {
  background(70, 114, 69);
  executer.run_on_first_loop(() => mapGenerator.loadData());
  if (all_images_loaded()) {
    executer.run_once(() => mapGenerator.generate(), 1);
    executer.run_once(() => player = Player.newPlayer(), 2);
    executer.run_once(() => li = LayeredElement.newSpruce(), 3);
    player.draw();
    player.update();
    for (var e of mapGenerator.elements) {
      e.draw();
      e.update();
    }
    li.draw();
    li.update(player);
  }
  executer.endLoop();
}

function keyPressed() {
}
