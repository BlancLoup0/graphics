let blockGround; //바닥 블록
let blockBrick; //벽돌 블록
let blockItemBrick; //아이템 블록


let b1 = 0; //블록 1 변수
let eatb1 = 0; //블록1의 아이템 호출 
let ableb1 = 0; //블록1의 아이템 호출 
let b2 = 0; //블록 2 변수
let b3 = 0; //블록 3 변수
let b4 = 0; //블록 4 변수

let posX = 300; // 버섯 시작 X 위치
let posY = 100; //버섯 시작 y위치 
let targetX = 100; // 버섯 목표 X 위치
let targetY = 100; // 버섯 목표 Y 위치
let easing = 0.1; // 이동 속도 (Easing)
let sal = 0.0125; //버섯 크기


let i = 0; // 굼바 점프 변수
let goombaX = 150; //굼바 x좌표
let goombaY = 450; //굼바 y좌표
let goombaAngle = 0; //굼바의 회전정도
let goombaSize = 1 //굼바의 크기(기본 100x100)
let goombaJump = false; //굼바 현재 점프 상태
let jumpHeight = 0; //굼바의 점프 높이

let kx = 1000; 
let ky = 50;
let kr = 0;
let ks = 0.7;

function preload() {  // 이미지 미리 로드
  blockGround = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/ground.png');
  blockBrick = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/brick.png');
  blockItemBrick = loadImage('https://raw.githubusercontent.com/BlancLoup0/graphics/main/marioBlock/itemBrick.png');
function preload(){
   img = loadImage("https://candyfunhouse.ca/cdn/shop/products/Candyfunhouse_supermariobros_coincandies_34g-Top-jpg-1.jpg?v=1628524712&width=1200")
  jpg = loadImage("https://static.wikia.nocookie.net/mario/images/9/98/Empty_Block_NSMB_Wii_artwork.png/revision/latest?cb=20230915030712")
}
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
  if (eatb1 == 0) image(blockItemBrick, 200, 200 - b1, 100, 100); 
  else image(blockBrick, 200, 200 - b1, 100, 100);
   //벽돌생성, 굼바가 점프시 위로 이동
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
  
  strokeWeight(1);
  drawGoomba(goombaX, goombaY - jumpHeight, goombaAngle, goombaSize); //굼바 그리기
  drawKiller(kx,ky,kr,ks);
  if  (  posX > goombaX - 80 && eatb1 == 1 && posY >400) 
  { ableb1 = 1;
    while(goombaSize <= 1.4) goombaSize += 0.1;
   // 버섯블록 b1사용 완료
  } //버섯 섭취 여부 확인 섭취시   스케일1.5조정
  if (ableb1 == 0) mushroomdraw();
     // 버섯을 소환하지 않았을때 버섯 처음 생성
  
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


function mushroomdraw() {
  if ( b1 == 20 ) {
    eatb1 = 1;
  //블럭 1이 사용됨;
  }
  if (eatb1 == 1){
  
  // 현재 위치와 목표 위치 간의 거리를 계산합니다.
  let dx = targetX - posX;
  let dy = targetY - posY;

  // Easing을 사용하여 부드러운 이동을 구현합니다.
  posX += dx * easing;
  posY += dy * easing;

  // 현재 위치를 바탕으로 그림을 그립니다.
  translate(posX, posY);
  if (sal >= 0.125) sal = 0.125;
  scale(sal = sal + 0.01); // 캔버스 크기를 1/8로 축소합니다.

  fill(0);
  strokeWeight(10);
  stroke(0, 0, 0);
  push();
  beginShape();
  curveVertex(216, 416);
  curveVertex(140, 373);
  curveVertex(97, 306);
  curveVertex(110, 225);
  curveVertex(129, 199);
  curveVertex(163, 166);
  curveVertex(247, 108);
  curveVertex(287, 89);
  curveVertex(323, 81);
  curveVertex(384, 71);
  curveVertex(451, 72);
  curveVertex(509, 91);
  curveVertex(595, 126);
  curveVertex(648, 176);
  curveVertex(697, 239);
  curveVertex(695, 326);
  curveVertex(635, 387);
  curveVertex(591, 412);
  curveVertex(592, 407);
  curveVertex(535, 365);
  curveVertex(568, 381);
  curveVertex(522, 357);
  curveVertex(464, 343);
  curveVertex(402, 341);
  curveVertex(344, 342);
  curveVertex(287, 357);
  curveVertex(241, 381);
  fill(255, 0, 0);
  endShape(CLOSE);
  pop();
  push();
  beginShape();
  fill(251, 206, 177);
  ellipse(400, 400, 380, 145);
  fill(0, 0, 0);
  ellipse(347, 399, 20, 40);
  ellipse(468, 400, 20, 40);
  endShape(CLOSE);
  fill(255, 255, 255);
  ellipse(402, 188, 200, 160);
  pop();

  // 목표지점에 도달했는지 확인하고, 도달했다면 목표지점을 변경합니다.
  if (dist(posX, posY, targetX, targetY) < 1) {
    targetX = 100;
    targetY = 420;
  }}
}

function drawKiller(x,y, rotation, size) {
  push();
  kx=kx-3;
  if (kx<160) {
  ky=ky+5; kx=160; kr=kr+0.5; ks=ks-0.015;
    if (ks<0){ kx=1200; ky=50; kr=0; ks=0.7;
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
