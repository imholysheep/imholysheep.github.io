// setup canvas
//阿建canvas動畫
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
  /*this.x = random(0,width);
  this.y = random(0,height);*/
  this.x = width/2;
  this.y = height/2;
  this.oldX = random(90,420);
  //this.xF = 1;
  if(random(1,100)%2 == 1){
	  this.xF=1;
  }else{
	  this.xF=-1;
  }
  
  if(random(1,100)%2 == 1){
	  this.yF=1;
  }else{
	  this.yF=-1;
  }

  this.yF = 1;
  this.maxvalue = random(90,420);
  this.count = 0;
  this.velX = 1//random(-10,10);
  this.velY = 1//random(-10,10);
  //this.color = 'rgb(' + random(20,255) + ',' + random(20,255) + ',' + random(200,255) +')';
  this.color = 'rgb(255,'+random(100,200)+',' + random(80,200) +')';
  this.size = random(2,8);
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
        balls[j].color ='rgb(100,'+random(200,255)+ ','+ random(200,255) +')';
		balls[j].velX = -(this.velX);
		balls[j].velY = -(this.velY);
			 // console.log(this.velY);
				
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
  //console.log(this.oldX);
  //console.log(this.x);
  if(this.xF == 1)
  {
	this.x += 1;
	if(this.x > width)
	{
		this.xF = 0;
		this.oldX = random(0,width);
	}
  }
  else
  {
	  this.x -= 1;
	if(this.x < 0)
	{
		this.xF = 1;
		this.oldX = random(0,width);
	}
  }
  
  if(this.y > height)
  {
	  this.yF = -1;
  }
  if(this.y < 0)
  {
	  this.yF = 1;
  }
  

	if((this.count%240) < 60)
	{
		this.y += 0.7*this.yF*Math.sin(((this.x - this.oldX)/this.oldX) * Math.PI);	
	
	}
	else if((this.count%240) < 70)
	{
		this.y += 0.7*this.yF*Math.cos(((this.x - this.oldX)/this.oldX) * Math.PI);	
	}
	else
	{
		this.y += this.yF*Math.tan((this.x - this.oldX)/this.oldX * Math.PI);	
	}
	
	

	
	this.count++;
  //console.log('aftercount',this.x);
  //console.log(balls[1].x);
}

//�x�s�m�y 
var balls = [];

//�y�y
function loop() {
//�e��񺡪��C��
ctx.fillStyle = 'rgba(60,60,80,0.08)'; 
  ctx.fillRect(0,0,width,height); //�񺡰�
  while(balls.length < 10) {
    var ball = new Ball();
    balls.push(ball);
  }

  for(i = 0; i < balls.length; i++) {
	if(balls[i].y > height || balls[i].y < 0)
	{
		balls.splice(i,1)
	}
	else
	{
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();	
	}
  }

  requestAnimationFrame(loop);//�P�s����ø�s�ɶ��t�X��
  //setTimeout(loop, 1000); //�������n��ø�s�k
}

loop();