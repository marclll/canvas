var fx,fy,fw=10,fh=10; 				// f=fruit
var b=[{dir:"right",x:0,y:0,w:25,h:25}];	  // b=snake 
var dp=15;		// dp=pixels moved each time it moves
var WIDTH=450,HEIGHT=400;
var ctx;
var interval;				// in order to be able to clear setInterval
var fin=false;
var score=0;

function initialize(){
	ctx=document.getElementById("context").getContext("2d");
	updateFruit();
	interval=setInterval(update,100);
}

function draw(x,y,w,h,color){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}

function updateSnake(){
	var act=b[0].dir;
	for (i=0;i<b.length;++i){
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
		var k=b[i].dir;
		b[i].dir=act;
		act=k;
	}
	if (!fin){
		draw(b[0].x,b[0].y,b[0].w,b[0].h,"black");
		draw(b[1].x,b[1].y,b[1].w,b[1].h,"black");
		if (b.length>2)draw(b[2].x,b[2].y,b[2].w,b[2].h,"grey");
	}
	for (i=3;i<b.length && !fin;++i){
		draw(b[i].x,b[i].y,b[i].w,b[i].h,"grey");
		if (((b[i].x+b[i].w>=b[0].x) && b[i].x<=b[0].x+b[0].w)&&((b[i].y+b[i].h>=b[0].y) && b[i].y<=b[0].y+b[0].h)) gameover();
	}
}

function updateFruit(){
	fx=0,fy=0;
	while (fx>WIDTH-fw-10 || fx<10) fx=Math.floor(Math.random()*WIDTH);
	while (fy>HEIGHT-fh-10 || fy<10) fy=Math.floor(Math.random()*HEIGHT);
	while ((fx>b[0].x-20 && fx<b[0].x+b[0].w+20)&&(fy>b[0].y-20 && fy<b[0].y+b[0].h+20)){	//per que no surtigui la fruta on esta la snake
		while (fx>WIDTH-fw-10 || fx<10) fx=Math.floor(Math.random()*WIDTH);
		while (fy>HEIGHT-fh-10 || fy<10) fy=Math.floor(Math.random()*HEIGHT);
	}
	var n=b.length-1;
	if (n==0) b.push({dir:"neut",x:b[n].x+5,y:b[n].y+5,w:15,h:15});
	else b.push({dir:"neut",x:b[n].x,y:b[n].y,w:15,h:15}),++score;
	document.getElementById("number").innerHTML=score;
	draw(fx,fy,fw,fh,"red");
	updateSnake();
}

function update(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	if (((fx+fw>=b[0].x) && fx<=b[0].x+b[0].w)&&((fy+fh>=b[0].y) && fy<=b[0].y+b[0].h)) updateFruit();
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
	if (keynumber==37 && b[0].dir!="right") b[0].dir="left";
	if (keynumber==38 && b[0].dir!="down") b[0].dir="up";
	if (keynumber==39 && b[0].dir!="left") b[0].dir="right";
	if (keynumber==40 && b[0].dir!="up") b[0].dir="down";
}

window.onload=function(){
	initialize();
	window.onkeydown=keys;
}