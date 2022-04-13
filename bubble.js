
class Bubble { 
  constructor(x, y, col, dim) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.dim = dim;
    
    
  }
  move() {
    this.x = this.x + random(-coeff, coeff);
    //this.y = this.y + random(-coeff, coeff);
    
  }
  
  show() {
    rectMode(CENTER);
    noStroke();
    fill(this.col);
    
    square(this.x, this.y, this.dim);
  }
  
}