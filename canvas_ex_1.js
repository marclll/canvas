var x=150;
var y=150;
var dx= 4;
var dy= 3.5;
var r=20;
var WIDTH= 300;
var HEIGHT= 300;
var ctx;
var interval;

function init(){
	ctx=document.getElementById("container").getContext("2d");
	interval = setInterval(draw,500);
}

function clear(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
}

function draw(){
	clear();
	if (x + r + dx > WIDTH || x - r + dx < 0){
		dx=-dx;
	}
	if (y + r + dy > HEIGHT || y - r+ dy < 0){
		dy=-dy;
	}
	x+=dx;
	y+=dy;
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2,true);
	ctx.fillStyle ="rgba(10,150,150,.5)";
	ctx.fill();
}

window.onload=init;