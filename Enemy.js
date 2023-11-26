// Enemy class
class Enemy {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector();
    this.hp = 50; // Hit points
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset acceleration
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    fill(255, 0, 0, this.hp * 5); // Color depends on HP
    noStroke();
    ellipse(this.pos.x, this.pos.y, 20, 20);
  }

  isDead() {
    return this.hp <= 0;
  }
}

// BossEnemy class
class BossEnemy extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.size = 40; // Size of the boss
    this.color = color(128, 0, 128); // Purple color for the boss
    this.hp = 10000; // Hit points
    this.shootingInterval = 10; // Interval between shots
    this.shootingTimer = 0;
  }

  update() {
    super.update();
    if (this.shootingTimer >= this.shootingInterval) {
      this.shoot(); // Call the shooting function
      this.shootingTimer = 0; // Reset the timer
    }
  }

  shoot() {
    // Shoot at each vehicle
    for (let v of vehicles) {
      let bullet = new Bullet(this.pos.x, this.pos.y, v.pos);
      bullets.push(bullet);
    }
  }

  show() {
    // Custom rendering for boss appearance
    fill(126, 0, 126);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 40, 40);
  }
}
