//【球】物件
function Ball(x, y) {
	this.x = x; //random(0, width);
	this.y = y;
	this.velX = 10;
	this.velY = 10;
	this.color = 'rgb(' + random(20, 255) + ',' + random(20, 255) + ',' + random(200, 255) + ')';
	this.size = random(1, 4);
}	

//【球】碰撞事件
/*Ball.prototype.collisionDetect = function() {
	for (j = 0; j < balls.length; j++) {
		//判斷為不同球
		if ((!(this.x === balls[j].x && this.y === balls[j].y && this.velX === balls[j].velX && this.velY === balls[j].velY))) {
			//var dx = this.x;
			var dx = this.x - balls[j].x;
			//var dy = this.y;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			//判斷邊緣相撞
			if (distance < this.size + balls[j].size) {
				// if (distance < 1) {
				balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
				//balls[j].velX = -(this.velX);
				//balls[j].velY = -(this.velY);

			}
		}
	}
}*/
//【球】邊界偵測
/*Ball.prototype.edgeDetect = function() {
	if ((this.y - this.size) <= 0 || (this.x + this.size) >= width || (this.y + this.size) >= height || (this.y - this.size) <= 0) {
		this.x = zeroX + this.x;
		this.y = zeroY + this.y;
	}
}*/

//【球】繪製
Ball.prototype.draw = function() {
	ctx.beginPath(); //聲明要在紙上畫出
	ctx.fillStyle = this.color; //要呈現的顏色
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //arc畫弧形 (中心xy，size半徑，始終角度0-2*180)
	ctx.fill(); //已完成形狀，並填滿fillStyle顏色
}

//【球】實體化
function makeBalls(num,group,x,y){
	while (group.length < num) {
		var i = group.length;
		var ball = new Ball(x, y);
		ball.color = 'rgb(' +(120+i/60) + ','+(180-i/10)+',220)';
		group.push(ball);
	}
}

//【球】更新
/*Ball.prototype.update = function() {

	//this.x += this.velX * 0.01;
	//this.y += this.velY * 0.01;
	this.x += ((20) * Math.cos(s * Math.PI / 72) - (1) * Math.cos(s / 6) * (s * Math.PI / 72)) * 0.1;
	this.y += ((20) * Math.sin(s * Math.PI / 72) - (1) * Math.sin(s / 6) * (s * Math.PI / 72)) * 0.1;
	count++;
	s++;
}*/

function loop() {
	//console.log(finish)
	ctx.fillStyle = 'rgba(30,20,40,0.5)'; //畫格填滿的顏色
	ctx.fillRect(0, 0, width, height); //填滿區
	baseShap(wave);
	for (var i = 0; i < balls.length; i++) {
		//balls[i].edgeDetect();
		if (finish == false && change > 150) {
			//定時時間到，回基底動畫
			finish = true;
		} else if (finish == false) {
			balls[i].color = 'rgb(' +(200+i/50) + ','+random(0, 255)+',100)';
			if (balls[i].x - 5 > XposAry1[i] || balls[i].x + 5 < XposAry1[i] || balls[i].y - 5 > YposAry1[i] || balls[i].y + 5 < YposAry1[i]) {
				balls[i].x += (XposAry1[i] - balls[i].x) / 10 * Math.random();
				balls[i].y += (YposAry1[i] - balls[i].y) / 10 * Math.random();
			} else {
				//到達變形定位;
				balls[i].x = XposAry1[i];
				balls[i].y = YposAry1[i];
				balls[i].color = 'rgb(' +(255-change/2) + ','+random(0, 200)+',150)';
				if (i == balls.length - 1) {
					//到定位計時
					change++;
				}

			}
		} else if (finish == true) {
			change = 0;
			//回到基底動畫位置
			if (balls[i].x - 5 > XposAry2[i] || balls[i].x + 5 < XposAry2[i] || balls[i].y - 5 > YposAry2[i] || balls[i].y + 5 < YposAry2[i]) {
				balls[i].x += (XposAry2[i] - balls[i].x) / 10 * Math.random();
				balls[i].y += (YposAry2[i] - balls[i].y) / 10 * Math.random();
			} else {
				//基底動畫
				balls[i].color = 'rgb(' +(120+i/60) + ','+(180-i/10)+',220)';
				//XposAry2 = baseShap[0];
				//YposAry2 = baseShap[1];
				balls[i].x += 0.1 //* random(-20, 20);
				balls[i].y += 0.1 //* random(-10, 10);
			}

		}
		
		balls[i].draw();
	}
	
	//第二組求測試
	
	for(var i = 0; i < ballsInfo.length; i++){
		ballsInfo[i].x=XposAry3[i]*3+100;
		ballsInfo[i].y=YposAry3[i]*3+100;
		ballsInfo[i].draw();
	}
	count++; //時間計數
	
	if(wave==100 && toggle<0){
		toggle=-toggle;
		wave+=toggle;
	}else if(wave==1000 ){
		toggle=-toggle;
		wave+=toggle;
	}else if(wave<1000){
		wave+=toggle;
	}
	
	if (count < 80000) {
		requestAnimationFrame(loop);
	};

}




function makeBaseAnimine(wave) {
	var outAryX = [];
	var outAryY = [];
	var slowlyWave = wave;
	if(wave>250){
		slowlyWave=wave/50+250;
		}
	var group = "";
	for (var i = 0; i < ballNum; i++) {
		var _A = Math.abs(4 * Math.cos(4 * i/2));
		
		var pos = Math.exp(-_A * i/ width) * Math.sin(3 * Math.PI * (i + 10+wave*2) / width);
		
		outAryX.push(width/ballNum*i);

		outAryY.push(pos * slowlyWave+ zeroY+100);
	}
	return [outAryX, outAryY]
}
		var d = 1
function makeCircle(oX, oY) {
	var outAryX = [];
	var outAryY = [];
	var shapID = random(3, 4)
	console.log(shapID)
	if (shapID == 1) {
		var radius = random(50, 200);
		var beginX = oX - radius;
		var endX = oX - radius;
		var changeX = (radius * 2 / ballNum);
		for (var i = 0; i < ballNum; i++) {
			//XposAry1.push(i * 2);
			//YposAry1.push(10);
			outAryX.push(beginX + changeX * i);
			var distanceX = Math.abs(outAryX[i] - oX);
			var newY = Math.sqrt((radius * radius) - (distanceX * distanceX));
			if (i % 2 == 0) {
				outAryY.push(oY + newY);
			} else {
				outAryY.push(oY - newY);
			}
		}
	} else if (shapID == 2) {
		for (var i = 0; i < ballNum; i++) {
			outAryX.push(oX + i);
			outAryY.push(oY + i);
		}
	} else if (shapID == 3) {
		var R, r, O;
		R = 20 * 4 / 2;
		r = -8 * 7 / 1;
		O = 10;
		var x1 = R - O;
		var y1 = 0;
		var x2, y2;

		for (var i = 0; i < 3; i++) { //y軸平移
			for (var j = 0; j < 3; j++) { //x軸平移
			     R = random(12, 89) * (j + 2) / (j + 1);
				//R = 20 * (j + 2) / (j + 1);
				r = random(-50, 63) * (i + 3) / (i + 1);
				//r = 63 * (i + 3) / (i + 1);
				for (var i = 0; i < ballNum; i++) {
					x2 = (R + r) * Math.cos(i*d * Math.PI / 72) - (r + O) * Math.cos(((R + r) / r) * (i*d * Math.PI / 72)) + oX
					y2 = (R + r) * Math.sin(i*d * Math.PI / 72) - (r + O) * Math.sin(((R + r) / r) * (i*d * Math.PI / 72)) + oY
					//原點為x2 == R-O && y2 == 0 
					if(i%3==0){
					outAryX.push(x2);
					outAryY.push(y2);
					}

				}
			}
		}
	}
	return [outAryX, outAryY]
}

function changeShap(oX, oY) {
	finish = false; //觸發繪圖
	//var shapID = $("#shapID").val();
	var shap = makeCircle(oX, oY);
	XposAry1 = shap[0];
	YposAry1 = shap[1];
}

function baseShap(wave) {
	var shap = makeBaseAnimine(wave);
	XposAry2 = shap[0];
	YposAry2 = shap[1];
}

function random(min, max) { //起始值，最大值，回傳這區間的一個數
	var num = Math.floor(Math.random() * (max - min)) + min;
	return num;
}

function timer(time){
	setTimeout(function(){
	changeShap(zeroX,zeroY)
		timer(random(15000,25000))
	},time)	
}















