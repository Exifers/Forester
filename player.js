
class Player {
  constructor(pos, dir) {
    this.pos = pos;
    this.dir = dir;
  }
  static newPlayer() {
    return newPlayer(createVector(screen.width/2, screen.height/2));
  }
  draw() {
  }
  update() {
  }
}
