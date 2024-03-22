let blockGround; //바닥 블록
let blockBrick; //벽돌 블록
let blockItemBrick; //아이템 블록

let b1 = 0; //블록 1 변수
let b2 = 0; //블록 2 변수
let b3 = 0; //블록 3 변수
let b4 = 0; //블록 4 변수

let i = 0; // 굼바 점프 변수
let goombaX = 150; //굼바 x좌표
let goombaY = 450; //굼바 y좌표
let goombaAngle = 0; //굼바의 회전정도
let goombaSize = 1 //굼바의 크기(기본 100x100)
let goombaJump = false; //굼바 현재 점프 상태
let jumpHeight = 0; //굼바의 점프 높이

function preload() {  // 이미지 미리 로드
  blockGround = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/ground.png');
  blockBrick = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/brick.png');
  blockItemBrick = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/itemBrick.png');
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220); 
  image(blockGround, 0, 500, 100, 100); //땅 생성
  image(blockGround, 100, 500, 100, 100);
  image(blockGround, 200, 500, 100, 100);
  image(blockGround, 300, 500, 100, 100);
  image(blockGround, 400, 500, 100, 100);
  image(blockGround, 500, 500, 100, 100);
  image(blockGround, 600, 500, 100, 100);
  image(blockGround, 700, 500, 100, 100);
  
  image(blockItemBrick, 200, 200 - b1, 100, 100); //벽돌생성, 굼바가 점프시 위로 이동
  image(blockBrick, 300, 200 - b2, 100, 100);
  image(blockBrick, 400, 200 - b3, 100, 100);
  image(blockItemBrick, 500, 200 - b4, 100, 100);
  
  if (keyIsDown(LEFT_ARROW)) goombaX -= 3; //굼바의 좌우 이동
  if (keyIsDown(RIGHT_ARROW)) goombaX += 3;
  
  if (goombaJump) { //굼바의 점프
    i += 0.02;
    jumpHeight = 120*sin(PI*i); //굼바의 점프 높이 조절
    goombaAngle = 2*PI*i; //굼바가 점프하면서 회전
    if (i > 1) {
      i = 0;
      goombaJump = false;
    }
    
    if (i > 0.4 && i < 0.6 && goombaX >= 190 && goombaX <= 310) b1 = 20; //굼바가 점프할때 블록이동
      else b1 = 0;
    if (i > 0.4 && i < 0.6 && goombaX >= 290 && goombaX <= 410) b2 = 20;
      else b2 = 0;
    if (i > 0.4 && i < 0.6 && goombaX >= 390 && goombaX <= 510) b3 = 20;
      else b3 = 0;
    if (i > 0.4 && i < 0.6 && goombaX >= 490 && goombaX <= 610) b4 = 20;
      else b4 = 0;
  }
  
  drawGoomba(goombaX, goombaY - jumpHeight, goombaAngle, goombaSize); //굼바 그리기
  
  /*
  for (let i = 100; i < width; i += 100) {
    line(i, 0, i, height); // 세로선
    line(0, i, width, i); // 가로선
  }//세로선 ,가로선 그리기
  */
}

function keyPressed() { //점프 입력
  if (keyCode === 32 && !goombaJump) {
    goombaJump = true;
  }
}

function drawGoomba(x, y, rotation, size) { //굼바 그리기
  push();
  translate(x, y); // 회전 중심을 굼바의 중심으로 이동
  rotate(rotation); // 회전
  scale(size); // 크기 조절
  
  noStroke();

  fill(204, 153, 102); // 굼바의 몸통
  circle(0, 25, 30);
  
  fill(102, 51, 19); // 굼바 얼굴
  beginShape();
  curveVertex(14,-22);
  curveVertex(14,-22);
  curveVertex(0, -40);
  curveVertex(-14,-22);
  curveVertex(-14,-22);
  vertex(-14,-22);
  vertex(-30,3);
  vertex(-30,3);
  curveVertex(-30,3);
  curveVertex(-40,20);
  curveVertex(-30,22);
  curveVertex(-30,22);
  vertex(-30,22);
  vertex(30,22);
  vertex(30,22);
  curveVertex(30,22);
  curveVertex(40,20);
  curveVertex(30,3);
  curveVertex(30,3);
  vertex(30,3);
  vertex(14,-22);
  vertex(14,-22);
  endShape();
  
  fill(51, 0, 0); // 굼바의 발
  circle(-15, 40, 20);
  circle(15, 40, 20);
  
  stroke(1) //굼바의 눈
  fill(240);
  ellipse(-10, -5, 15, 20);
  ellipse(10, -5, 15, 20);
  noStroke();
  
  push(); //이빨
  rotate(+0.23);
  triangle(17,10,20,2,23,10)
  pop();
  
  push(); //이빨
  rotate(-0.23);
  triangle(-17,10,-20,2,-23,10)
  pop();
  
  fill(10); //굼바의 눈동자
  ellipse(-7, -3, 4, 8);
  ellipse(7, -3, 4, 8);
  
  push(); //오른쪽 눈썹
  rotate(+0.9);
  rect(-7, -32, 3, 25);
  pop();
  
  push(); //왼쪽 눈썹
  rotate(-0.9);
  rect(4, -32, 3, 25);
  pop();
  
  stroke(3); //굼바의 입 모양 그리기
  noFill();
  beginShape();
  curveVertex(-20, 15);
  curveVertex(-20, 15);
  curveVertex(0, 10);
  curveVertex(20, 15);
  curveVertex(20, 15);
  endShape();
  noStroke();
  
  pop();
}