// setup canvas

var canvas = document.querySelector('canvas'); //符合css選擇器
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) { //起始值，最大值，回傳這區間的一個數
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
//設定球體模型 (建構子) 屬性
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

//繪製球體 建構子函式 原型繼承
Ball.prototype.draw = function() {
  ctx.beginPath(); //聲明要在紙上畫出
  ctx.fillStyle = this.color; //要呈現的顏色
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //arc畫弧形 (中心xy，size半徑，始終角度0-2*180)
  ctx.fill();//已完成形狀，並填滿fillStyle顏色
}

// //建立新的球
// var testBall = new Ball();
// testBall.x
// testBall.size
// testBall.color
// testBall.draw()

//碰撞換色
  Ball.prototype.collisionDetect = function() {
  for(j = 0; j < balls.length; j++) {
	  //判斷為不同球
    if( (!(this.x === balls[j].x && this.y === balls[j].y && this.velX === balls[j].velX && this.velY === balls[j].velY)) ) {
      //var dx = this.x;
      var dx = this.x - balls[j].x;
      //var dy = this.y;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

		//判斷邊緣相撞
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

//更新球的資料 偵測碰撞4ㄍ邊緣
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

//儲存彩球 
var balls = [];

//造球
function loop() {
//畫格填滿的顏色
ctx.fillStyle = 'rgba(50,50,50,0.1)'; 
  ctx.fillRect(0,0,width,height); //填滿區
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

  requestAnimationFrame(loop);//與瀏覽器繪製時間配合的
  //setTimeout(loop, 1000); //必較不好的繪製法
}

loop();