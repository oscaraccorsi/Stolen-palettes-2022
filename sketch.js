//let imgLoad = 'assets/pal09.png';

let palette = [];
let bubbles = [];
let palettes = [];
let distance = [10, 15, 25, 40];

let X;
let Y;
let dist;
let X1;

let img;
let coeff = 5;

let low = 30;
let high = 3000;
const osc = new p5.Oscillator();
let pitch;
let rate;
let vol;

let c1;
let fibo = [5, 8, 13, 21, 34, 55, 89];
let many;

function preload() {
 palettes[0] = loadImage('assets/pal0.png');
 palettes[1] = loadImage('assets/pal1.png'); 
 palettes[2] = loadImage('assets/pal2.png');
 palettes[3] = loadImage('assets/pal3.png');
 palettes[4] = loadImage('assets/pal4.png'); 
 palettes[5] = loadImage('assets/pal5.png'); 
 palettes[6] = loadImage('assets/pal6.png'); 
 palettes[7] = loadImage('assets/pal7.png');
 palettes[8] = loadImage('assets/pal8.png');
 palettes[9] = loadImage('assets/pal9.png');  
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(resetSketch, 1000*120);
  img = random(palettes);
  img.resize(100, 200);
  img.loadPixels();
  
  osc.start();
  
  frameRate(10);
  background(20);
  many = random(fibo);
  X = random(0, windowWidth-100);
  Y = random(0, windowHeight/2);
  dist = int(random(distance));
  
  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 50);
    palette.push(c);    
  }
  let dim = 15;
  for (let i = 0; i < many; i++) {
    let x = X;
    let y = Y+i*dist;
    let col = random(palette);
    
    bubbles[i] = new Bubble (x, y, col, dim);
  }
  
  vol = 0.5;
  
  reverb = new p5.Reverb();
  reverb.process(osc, 3, 0, false);
}

function draw() {
  X1 = map(X, 0, windowWidth, low, high);
  pitch =  X1 + random(-coeff*5, coeff*5);
  vol = vol - 0.005;
  osc.freq(pitch);
  osc.amp(vol);
  if (vol <= 0.05) {
    vol = 0.07;
  }
  
  coeff += 0.2 ;
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    
    
  }  
}
function resetSketch() {
  //save();
  clear();
  background(20);
  bubbles = [];
  palette = [];
  X = random(0, windowWidth-100);
  Y = random(50, windowHeight/2);
  dist = int(random(distance));
  coeff = 5;
  
  
  
  img = random(palettes);
  img.loadPixels();
  img.resize(100, 200);
  
  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 50);
    palette.push(c);    
  }
  
  many = random(fibo);
  let dim = 15;
  for (let i = 0; i < many; i++) {
    let x = X;
    let y = Y+i*dist;
    let col = random(palette);
    
    
    bubbles[i] = new Bubble (x, y, col, dim); 
  }  
  
  
  vol = 0.7;
  
  reverb = new p5.Reverb();
  reverb.process(osc, 3, 0, false);
}
