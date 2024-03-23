let blockGround; //바닥 블록
let blockBrick; //벽돌 블록
let blockItemBrick; //아이템 블록
let blockHardBrick; //단단한 블록
let b1 = 0; //블록 1 변수
let b1Hit = 0; //b1 블록 히트 여부
let b2 = 0; //블록 2 변수
let b3 = 0; //블록 3 변수
let b4 = 0; //블록 4 변수

let mushX = 250; // 버섯 시작 X 위치
let mushY = 170; //버섯 시작 y위치 
let mushRotation = 0; //버섯 회전
let mushSize = 0.1; //버섯 크기
let mushSpawn = 0; //버섯 소환 
let mushM = -2 //버섯섯 이동변수

let i = 0; // 굼바 점프 변수
let goombaX = 150; //굼바 x좌표
let goombaY = 450; //굼바 y좌표
let goombaRotation = 0; //굼바의 회전
let goombaSize = 1 //굼바의 크기(기본 100x100)
let goombaJump = false; //굼바 현재 점프 상태
let jumpHeight = 0; //굼바의 점프 높이

let kx = 1000;  //killerX
let ky = 50; //killerY
let kr = 0; //killerRotation
let ks = 0.7; ////killerSize

let fx = 550;
let fy = 250;
let fr = 0;
let fs = 0;
let flowerSpawn = 0;

function preload() {  // 이미지 미리 로드
  blockGround = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/ground.png');
  blockBrick = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/brick.png');
  blockItemBrick = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/itemBrick.png');
  blockHardBrick = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/hardBrick.png');
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  drawFireFlower(fx,fy,fr,fs); //꽃 그리기
  drawBlock();  
  
  goombaMove(); //굼바 움직이기
  drawGoomba(goombaX, goombaY - jumpHeight, goombaRotation, goombaSize); //굼바 소환
  
  drawKiller(kx,ky,kr,ks); //킬러 소환
  
  if(b1 == 20 && goombaSize == 1) {
    b1Hit = 1; //블록 변환
    mushSpawn = 1; 
  } //버섯 소환 체크
   
  if(mushSpawn) {
    if(mushSize<1) mushSize+=0.02;
    mushroomDraw(mushX, mushY - b1, mushRotation, mushSize); //버섯 소환
    if(mushSize > 1) mushroomMove();
    mushRotation = (mushY - 170)/300*2*PI;
    let distance = dist(mushX, mushY - 20, goombaX, goombaY);
    if(distance<20) {
      mushSpawn = 0;
      goombaSize = 1.5;
      goombaY -= 25
    }
  }
}

function drawBlock() { //블록을 생성하는 함수
  image(blockGround, 0, 500, 100, 100); //땅 생성
  image(blockGround, 100, 500, 100, 100);
  image(blockGround, 200, 500, 100, 100);
  image(blockGround, 300, 500, 100, 100);
  image(blockGround, 400, 500, 100, 100);
  image(blockGround, 500, 500, 100, 100);
  image(blockGround, 600, 500, 100, 100);
  image(blockGround, 700, 500, 100, 100);

  image(blockHardBrick, 0, 0, 100, 100); //킬러가 부딛히는 블록
  
  if (!b1Hit) image(blockItemBrick, 200, 200 - b1, 100, 100); //벽돌생성, 굼바가 점프시 위로 이동
    else image(blockBrick, 200, 200 - b1, 100, 100);
  image(blockBrick, 300, 200 - b2, 100, 100);
  image(blockBrick, 400, 200 - b3, 100, 100);
  image(blockItemBrick, 500, 200 - b4, 100, 100);
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

function keyPressed() { //점프 입력
  if (keyCode === 32 && !goombaJump) {
    goombaJump = true;
  }
}

function goombaMove() { //굼바의 이동
  if (keyIsDown(LEFT_ARROW)) goombaX -= 3; //굼바의 좌우 이동
  if (keyIsDown(RIGHT_ARROW)) goombaX += 3;
  
  if (goombaJump) { //굼바의 점프
    i += 0.02;
    jumpHeight = 120*sin(PI*i); //굼바의 점프 높이 조절
    goombaRotation = 2*PI*i; //굼바가 점프하면서 회전
    if (i > 1) {
      i = 0;
      goombaJump = false;
    }    
    //굼바가 점프할때 블록이동
    if (i > 0.3 && i < 0.7 && goombaX >= 190 && goombaX <= 310 && goombaSize == 1.5) b1 = 50*sin(PI*i); 
      else if(i > 0.4 && i < 0.6 && goombaX >= 190 && goombaX <= 310 && b1 < 20) b1 += 2;
      else b1 = 0;
    if (i > 0.3 && i < 0.7 && goombaX >= 290 && goombaX <= 410 && goombaSize == 1.5) b2 = 50*sin(PI*i); 
      else if (i > 0.4 && i < 0.6 && goombaX >= 290 && goombaX <= 410 && b2 < 20) b2 += 2;
      else b2 = 0;
    if (i > 0.3 && i < 0.7 && goombaX >= 390 && goombaX <= 510 && goombaSize == 1.5) b3 = 50*sin(PI*i); 
      else if (i > 0.4 && i < 0.6 && goombaX >= 390 && goombaX <= 510 && b3 < 20) b3 += 2;
      else b3 = 0;
    if (i > 0.3 && i < 0.7 && goombaX >= 490 && goombaX <= 610 && goombaSize == 1.5) b4 = 50*sin(PI*i); 
      else if (i > 0.4 && i < 0.6 && goombaX >= 490 && goombaX <= 610 && b4 < 20) b4 += 2;
      else b4 = 0;
  }
}

function mushroomDraw(x,y,rotation, size) {
  push();
  translate(x, y);
  scale(size/8);
  rotate(rotation);

  fill(0);
  strokeWeight(10);
  stroke(0, 0, 0);
  push();
  beginShape();
  curveVertex(-184, 176);
  curveVertex(-260, 133);
  curveVertex(-303, 66);
  curveVertex(-290, -15);
  curveVertex(-271, -41);
  curveVertex(-237, -74);
  curveVertex(-153, -132);
  curveVertex(-113, -151);
  curveVertex(-77, -159);
  curveVertex(-16, -169);
  curveVertex(51, -168);
  curveVertex(109, -147);
  curveVertex(195, -112);
  curveVertex(248, -62);
  curveVertex(297, 1);
  curveVertex(295, 88);
  curveVertex(235, 159);
  curveVertex(191, 200);
  curveVertex(192, 195);
  curveVertex(135, 153);
  curveVertex(168, 173);
  curveVertex(122, 153);
  curveVertex(64, 127);
  curveVertex(2, 125);
  curveVertex(-56, 126);
  curveVertex(-113, 141);
  curveVertex(-159, 165);

  fill(255, 0, 0);
  endShape(CLOSE);
  pop();
    
  push();
  beginShape();
  fill(251, 206, 177);
  ellipse(0, 160, 380, 145);
  fill(0, 0, 0);
  ellipse(-53, 159, 20, 40);
  ellipse(68, 160, 20, 40);
  endShape(CLOSE);
  fill(255, 255, 255);
  ellipse(2, -52, 200, 160);
  pop();
  pop();
}

function mushroomMove() {
  mushX += mushM
  if(mushX<185 && mushY<470) mushY += 4 ;
  if(mushX<35) mushM = 3;
  if(mushX>725) mushM = -3;
}

function drawKiller(x,y, rotation, size) {
  push();
  kx=kx-3;
  if (kx<160) {
    ky=ky+5; kx=160; kr=kr+0.5; ks=ks-0.015;
    if (ks<0) { 
      kx=1200; ky=50; kr=0; ks=0.7;
    }
  }             
  noStroke();
  translate(x, y);
  rotate(rotation);
  scale(size);
  fill(25);
  beginShape();
  vertex(0,-50);
  bezierVertex(-120,-50,-120,50,0,50);
  endShape(CLOSE);
  rect(0,-50,30,100);
  rect(30,-45,5,90);
  rect(40,-50,30,100);
  fill(255);
  rect(35,-45,5,90);
  arc(-60,-20,40,40,PI+HALF_PI+QUARTER_PI,HALF_PI+QUARTER_PI,CHORD);
  beginShape();
  vertex(-10,-2);
  bezierVertex(-20,-23,8,-23,10,-5);
  bezierVertex(-5,-15,-5,-17,-10,-2);
  endShape();
  beginShape();
  vertex(3,-5);
  quadraticVertex(20,10,-10,20);
  vertex(-15,10);
  quadraticVertex(10,5,-5,-5);
  quadraticVertex(-8,-10,3,-5);
  endShape();
  beginShape();
  curveVertex(-8,20);
  curveVertex(-8,20);
  curveVertex(-15,28);
  curveVertex(-25,30);
  curveVertex(-35,10);
  curveVertex(-20,2);
  curveVertex(-10,15);
  curveVertex(-8,10);
  curveVertex(-8,10);
  endShape();
  fill(20);
  ellipse(-61,-17,10,15);
  ellipse(-28,6,9,6);
  pop();
}

function drawFireFlower(x, y, rotation, size) {
  push(); // 변환 상태 저장
  
    if(b4 >= 20) flowerSpawn = 1;
    if(flowerSpawn)
    {
      fs=fs+0.01; fy=fy-1;
    if(fs>=1) fs=1;
    if(fy<150) fy=150;
    if(fs==1) {fr+=QUARTER_PI/7;
    fx+=2; fy+=3;          }
    if(fx>750) fx=750;
  }
  
  
  if(fy>800) {
    flowerSpawn = 0;
    fx=550; fy=250; fr=0; fs=0;
  }
  
  strokeWeight(1);
  translate(x, y);
  rotate(rotation);
  scale(size);

  //  (빨간 원)
  fill(255, 0, 0); // Red
  ellipse(0, 0, 70, 40);

  //  (하얀 원)
  fill(255); // White
  ellipse(0, 0, 50, 30);
  rectMode(CENTER);

  //  (눈)
  fill(0); // Black
  ellipse(-10, -5, 5, 5);
  ellipse(10, -5, 5, 5);

  // Draw stem (green rectangle)
  fill(0, 255, 0); // Green
  rect(2, 35, 10, 40, 20);
  triangle(1, 55, 35, 1, 40, 30);
  triangle(1, 55, -35, 1, -40, 30);
  pop(); // 변환 상태 복원
}

function fireFlowerMove() {
    mushX += mushM
  if(mushX<135 && mushY<440) mushY += 4 ;
  if(mushX<-10) mushM = 3;
  if(mushX>785) mushM = -3;
}
