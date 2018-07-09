var fx,fy,fw=10,fh=10; 				// f=fruit
var sx=225,sy=200,sw=20,sh=20;		// s=snake
var b=1;	  						// b=number of parts of the body of the snake
var direction="right", dp=1;		// dp=pixels moved each time it moves
var WIDTH=450,HEIGHT=400;
var ctx;
var interval;						// in order to be able to clear setInterval

function initialize(){
	ctx=document.getElementById("context").getContext("2d");
	updateFruit();
}

function draw(x,y,w,h,color){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}

function updateSnake(){
	draw(sx,sy,sw,sh,"black");
}

function updateFruit(){
	fx=0,fy=0;
	while ( ((fx>sx-20 && fx<sx+sw+20)&&(fy>sy-20 && fy<sy+sh+20)) || (fx==0 && fy==0)){	//per que no surtigui la fruta on esta la snake
		while (fx>WIDTH-fw-10 || fx<10) fx=Math.floor(Math.random()*WIDTH);
		while (fy>HEIGHT-fh-10 || fy<10) fy=Math.floor(Math.random()*HEIGHT);
	}
	draw(fx,fy,fw,fh,"red");
	updateSnake();
}

function update(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	if ((fx>=sx && fx<=sx+sw)&&(fy>=sy && fy<=sy+sh)) updateFruit();
	else draw(fx,fy,fw,fh,"red");
	updateSnake();
}

function keys(key){
	var keynumber=key.keyCode;
	if (keynumber==37) direction="left";
	if (keynumber==38) direction="up";
	if (keynumber==39) direction="right";
	if (keynumber==40) direction="down";
}

window.onload=function(){
	initialize();
	window.onkeydown=keys;
}