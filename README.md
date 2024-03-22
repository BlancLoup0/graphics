# graphics
let x = 550;
let y = 150;
let speedY = 2;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  drawFireFlowerItem(x, y, 50);

  // Update position
  y += speedY;

  // Reset position if it reaches the bottom
  if (y > 450) {
    y = 150;
  }
}

function drawFireFlowerItem(x, y, size) {
  push(); // 변환 상태 저장
  translate(x, y);

  //  (빨간 원)
  fill(255, 0, 0); // Red
  ellipse(0, 0, 70, 40);

  //  (하얀 원)
  fill(255); // White
  ellipse(0, 0, 50, 30);
  rectMode(CENTER);

  //  (눈)
  fill(0); // Black
  ellipse(-size * 0.2, -size * 0.1, size * 0.1, size * 0.1);
  ellipse(size * 0.2, -size * 0.1, size * 0.1, size * 0.1);

  // Draw stem (green rectangle)
  fill(0, 255, 0); // Green
  rect(2, 35, 10, 40, 20);
  triangle(1, 55, 35, 1, 40, 30);
  triangle(1, 55, -35, 1, -40, 30);
  
  pop(); // 변환 상태 복원
}
