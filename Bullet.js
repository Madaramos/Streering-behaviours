class Bullet {
    constructor(x, y, target) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.sub(target, this.pos).setMag(5);
      this.target = target.copy();
      this.maxForce = 0.1;
      this.maxSpeed = 4;
    }
  
    update() {
      this.pos.add(this.vel);
    }
  
    show() {
      fill(255, 0, 0);
      noStroke();
      ellipse(this.pos.x, this.pos.y, 8, 8);
    }
  
    applyForce(force) {
      this.vel.add(force);
      this.vel.limit(this.maxSpeed);
    }
  
    arrive(target) {
      let desired = p5.Vector.sub(target, this.pos);
      let d = desired.mag();
      let speed = this.maxSpeed;
      if (d < 100) {
        speed = map(d, 0, 100, 0, this.maxSpeed);
      }
      desired.setMag(speed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
  }
  