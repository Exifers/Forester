class Player extends Element {
  constructor(pos, theta) {
    super(pos, "assets/player.png");
    this.theta = theta;
    this.sensitivity = 4;
    this.running_factor = 1.8;
    this.crawling_factor = 0.5;
  }
  static newPlayer() {
    return new Player(createVector(screen.width/2, screen.height/2),
                     90);
  }
  draw() {
    super.draw();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.theta));
    fill(20, 255, 10);
    noStroke();
    rect(0, 0, 40, 20);
    pop();
  }
  update() {
    var dir = createVector(0, 0);
    if (keyIsDown(LEFT_ARROW)) {
      dir.add(createVector(-1, 0));
    }
    if (keyIsDown(RIGHT_ARROW)) {
      dir.add(createVector(1, 0));
    }
    if (keyIsDown(UP_ARROW)) {
      dir.add(createVector(0, -1));
    }
    if (keyIsDown(DOWN_ARROW)) {
      dir.add(createVector(0, 1));
    }
    if (!dir.equals(createVector(0, 0))) {
      dir.normalize();
      dir.mult(this.sensitivity);
      if (keyIsDown(SHIFT)) {
        dir.mult(this.running_factor);
      }
      if (keyIsDown(CONTROL)) {
        dir.mult(this.crawling_factor);
      }
      this.pos.add(dir);
    }
  }
}
