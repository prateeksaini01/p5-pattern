var canvasSize = 128;
var squareSize = 4;
var squares = [{x:0, y:0, l:canvasSize}];
var gradient = 1.2;

function drawSquare(sq) {
  // return;
  let fac = log(sq.l)/log(canvasSize);
  let valR = lerp(100, 255, fac);
  let valB = lerp(255, 100, fac);
  fill(valR, 0, valB);
  stroke(1);
  // noStroke();
  square(sq.x*squareSize, sq.y*squareSize, sq.l*squareSize);       
}

function shouldSubdivide(sq) {
  if( sq.l == 1 ) return false;
  let fac = (sq.x+sq.y)/2/canvasSize;
  
  return log(sq.l)/log(2) >= (fac + 0.0*random())*log(canvasSize)/log(2)

  // console.log(log(1-fac)/log(gradient));
  // console.log(log(canvasSize)/log(sq.l));
  // return log(1-fac)/log(gradient) >= log(canvasSize)/log(sq.l) - 4 + 0.5*random();
  
  // return random() <= 0.7;
}

function setup() {
  createCanvas(canvasSize*squareSize, canvasSize*squareSize);
  background(0);
  noLoop();
  randomSeed(0);
}

function draw() {
  console.log(squares)
  squares.forEach(drawSquare);
  
  var newSquares = [];
  squares.forEach(sq => {
    if( shouldSubdivide(sq) ) {
      // subdivide
      newSquares.push({
        x: sq.x,
        y: sq.y,
        l: floor(sq.l/2)
      },
      {
        x: sq.x + floor(sq.l/2),
        y: sq.y,
        l: floor(sq.l/2)
      },
      {
        x: sq.x,
        y: sq.y + floor(sq.l/2),
        l: floor(sq.l/2)        
      },
      {
        x: sq.x + floor(sq.l/2),
        y: sq.y + floor(sq.l/2),
        l: floor(sq.l/2)                
      });
    }
  });
  squares = JSON.parse(JSON.stringify(newSquares));
}

function mousePressed() {
  redraw();
}
