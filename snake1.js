var fx,fy,fw=10,fh=10; 				// f=fruit
var b=[{dir:"right",x:225,y:200,w:25,h:25}];	  // b=snake
var dp=10;		// dp=pixels moved each time it moves
var WIDTH=450,HEIGHT=400;
var ctx;
var interval;				// in order to be able to clear setInterval
var fin=false;

function initialize(){
	ctx=document.getElementById("context").getContext("2d");
	updateFruit();
	setInterval(update,100);
}

function draw(x,y,w,h,color){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}

function updateSnake(){
	var act=b[0].dir;
	for (i=0;i<b.length && !fin;++i){
		if (b[i].dir=="right"){
			if (b[i].x<=WIDTH-b[i].w-dp) b[i].x+=dp;
			else gameover();
		}
		else if (b[i].dir=="left"){
			if (b[i].x>=dp) b[i].x-=dp;
			else gameover();
		}
		else if (b[i].dir=="up"){
			if (b[i].y>=dp) b[i].y-=dp;
			else gameover();
		}
		else if (b[i].dir=="down"){
			if (b[i].y<=HEIGHT-b[i].h-dp) b[i].y+=dp;
			else gameover();
		}
		if (!fin){
			var k=b[i].dir;
			b[i].dir=act;
			act=k;
		}
	}
	for (i=0;i<b.length && !fin;++i){
		draw(b[i].x,b[i].y,b[i].w,b[i].h,"black");
	}
}

function updateFruit(){
	fx=0,fy=0;
	while ( ((fx>b[0].x-20 && fx<b[0].x+b[0].w+20)&&(fy>b[0].y-20 && fy<b[0].y+b[0].h+20)) || (fx==0 && fy==0)){	//per que no surtigui la fruta on esta la snake
		while (fx>WIDTH-fw-10 || fx<10) fx=Math.floor(Math.random()*WIDTH);
		while (fy>HEIGHT-fh-10 || fy<10) fy=Math.floor(Math.random()*HEIGHT);
	}
	var n=b.length-1;
	b.push({dir:"neut",x:b[n].x,y:b[n].y,w:12,h:12});
	draw(fx,fy,fw,fh,"red");
	updateSnake();
}

function update(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	if ((fx>=b[0].x && fx<=b[0].x+b[0].w)&&(fy>=b[0].y && fy<=b[0].y+b[0].h)) updateFruit();
	else draw(fx,fy,fw,fh,"red");
	updateSnake();
}

function gameover(){
	clearInterval(interval);
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	document.getElementById("h1").style.display="block";
	fin=true;
}

function keys(key){
	var keynumber=key.keyCode;
	if (keynumber==37) b[0].dir="left";
	if (keynumber==38) b[0].dir="up";
	if (keynumber==39) b[0].dir="right";
	if (keynumber==40) b[0].dir="down";
}

window.onload=function(){
	initialize();
	window.onkeydown=keys;
}