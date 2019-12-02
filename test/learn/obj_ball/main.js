// setup canvas

var canvas = document.querySelector('canvas'); //�ŦXcss��ܾ�
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) { //�_�l�ȡA�̤j�ȡA�^�ǳo�϶����@�Ӽ�
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
//�]�w�y��ҫ� (�غc�l) �ݩ�
function Ball() {
  this.x = random(0,width);
  this.y = random(0,height);
  this.velX = random(-10,10);
  this.velY = random(-10,10);
  this.color = 'rgb(' + random(20,255) + ',' + random(20,255) + ',' + random(200,255) +')';
  this.size = random(10,30);
}

//ø�s�y�� �غc�l�禡 �쫬�~��
Ball.prototype.draw = function() {
  ctx.beginPath(); //�n���n�b�ȤW�e�X
  ctx.fillStyle = this.color; //�n�e�{���C��
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //arc�e���� (����xy�Asize�b�|�A�l�ר���0-2*180)
  ctx.fill();//�w�����Ϊ��A�ö�fillStyle�C��
}

// //�إ߷s���y
// var testBall = new Ball();
// testBall.x
// testBall.size
// testBall.color
// testBall.draw()

//�I������
  Ball.prototype.collisionDetect = function() {
  for(j = 0; j < balls.length; j++) {
	  //�P�_�����P�y
    if( (!(this.x === balls[j].x && this.y === balls[j].y && this.velX === balls[j].velX && this.velY === balls[j].velY)) ) {
      //var dx = this.x;
      var dx = this.x - balls[j].x;
      //var dy = this.y;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

		//�P�_��t�ۼ�
      if (distance < this.size + balls[j].size) {
     // if (distance < 1) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
		//balls[j].velX = -(this.velX);
		//balls[j].velY = -(this.velY);
			  console.log(this.velY);
				
      }
    }
  }
}

//��s�y����� �����I��4�|��t
Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX); 
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
  //console.log(balls[1].x);
}

//�x�s�m�y 
var balls = [];

//�y�y
function loop() {
  ctx.fillStyle = 'rgba(220,200,220,0.25)'; //�e��񺡪��C��
  ctx.fillRect(0,0,width,height); //�񺡰�

  while(balls.length < 5) {
    var ball = new Ball();
    balls.push(ball);
  }

  for(i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);//�P�s����ø�s�ɶ��t�X��
  //setTimeout(loop, 1000); //�������n��ø�s�k
}

loop();