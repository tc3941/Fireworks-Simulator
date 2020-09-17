(function (){
	"use strict";

const canvasWidth = 800, canvasHeight = 600;
	let ctx;
		let x=0,y=0;
		let counter = 0;//angle
		//let c = 2;
        let size = 2;
        let randomFireworks = false;
        let interval = 1, timer = 0;
        let alpha = 0;
        let fps = 120;
        let trailRadius = 3;
    let demoFirework;
		window.onload = init;
		let n = 0,p = 0;
        const divergence = 137.5;
        let fireworks = [];

	function init(){
		ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        //drawCircle(ctx,canvasWidth/2,canvasHeight/2,3,"red");
        demoFirework = new Firework(canvasWidth/2,canvasHeight/2,200,3,5,"red",true,2*canvasWidth/3,canvasHeight);
        document.onmousedown = function(e){
         //   if(selectedElement)
                var mousePos = getMousePos(canvas,e);
                if(mousePos.x<canvasWidth&&mousePos.y<canvasHeight)
                fireworks.push(new Firework(mousePos.x,mousePos.y,300));
        };
        document.querySelector("#randomButton").onclick = function(e){
            randomFireworks = !randomFireworks;
            if(!randomFireworks)
                e.target.innerHTML = "Start!";
                else
                e.target.innerHTML = "Stop!";
        };
        document.querySelector("#clearButton").onclick = function(e){
            ctx.fillRect(0,0,canvasWidth,canvasHeight);
        };
        document.querySelector("#randomInterval").style.display = "none";
        document.querySelector("#randomButton").style.display = "none";
        document.querySelector("#fireworkMode").onchange = function(e){
            if(e.target.value=="random"){
                document.querySelector("#randomInterval").style.display = "";
                document.querySelector("#randomButton").style.display = "";
            }
        };
        document.querySelector("#randomInterval").onchange = function(e){
            interval = e.target.value;
            console.log(interval);
        };
        
        loop();
	}

	function loop(){


	// const increase = Math.PI * 2/100;
        setTimeout(loop,1000/fps);
        
        // each frame draw a new dot
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        ctx.restore();
        /*
        if(demoFirework.trail)
        drawCircle(ctx,demoFirework.trailX,demoFirework.trailY,trailRadius,"white");
        
        demoFirework.step();

        if(!demoFirework.trail){
            createPhyllo(demoFirework.targetX,demoFirework.targetY,demoFirework.size, demoFirework.n);
            
        }*/
        if(randomFireworks){
            timer += interval/(1000/fps);
            if(interval<timer){
            timer = 0;
            fireworks.push(new Firework(tcLIB.getRandomInt(0,canvasWidth),tcLIB.getRandomInt(0,canvasHeight),300));
            }
        }



        fireworks.forEach(element => {
            
            element.step();
                createPhyllo(element.targetX,element.targetY,element.size,element.n,element.fwSize);
            });

// `a` is the angle
// `r` is the radius from the center (e.g. "Pole") of the flower
// `c` is the "padding/spacing" between the dots

//createPhyllo();


/*


//animated
if(n<(canvasHeight*.75)){
drawCircle(ctx,canvasWidth/2,canvasHeight-n,3,"white");
n++;
}
else {
    alpha =0;
    n++;
    if(p<300)
createPhyllo(canvasWidth/2,canvasHeight*.25);
if(n>1200)
alpha = .2;
}

    drawRect(ctx,0,0,canvasWidth,canvasHeight);
    
    */


	// ctx.save();
		// ctx.fillStyle("black");
		// ctx.globalAlpha = .5;
		// ctx.fillRect(0,0,canvasWidth,canvasHeight);
		// ctx.restore();

		// x += 10;
		// counter += .3;
		// y = canvasHeight/2 + Math.sin(counter) * 100;
		// drawCircle(ctx,x,y,2,"white");

		// y = canvasHeight/2 + Math.cos(counter) * 100;
		// drawCircle(ctx,x,y,2,"red");

		// y = canvasHeight/2 + Math.sqrt(counter) * 100;
		// drawCircle(ctx,x,y,2,"blue");


		// if(x>=canvasWidth) x = 0;
		
		//not animated
		// for (let i = 0; i <1; i+=.01){
		// 	x = i * canvasWidth;
		// 	y = ((Math.sin(counter)/2 + .5) * 100) + canvasHeight/2 - 50;
		// 	console.log(x,y);
		// 	drawCircle(ctx,x,y,2,"white");
		// 	counter += increase; // increase angle
		// }
	}

    function createPhyllo(localX,localY,max, n,c){
    let p = n;
    if(p<max){
        let a = p * dtr(divergence);
let r = c * Math.sqrt(p);
//console.log(a,r);
let divis;
let passed = false;
    if(n%2==0)
divis = 4;
else
divis = 1.5;

let x = r * Math.cos(a) + localX;
let y = r * Math.sin(a) + localY;

// let aDegrees = (n * divergence) % 361;
// let color = `hsl(${aDegrees},100%,50%)`;
let color = `hsl(${p/5 % 361},100%,50%)`;
drawCircle(ctx,x,y,size,color);

//size +=.005;
c += .005;
p++;
    }
}

	// helpers
	function dtr(degrees){
		return degrees * (Math.PI/180);
	}

	function drawCircle(ctx,x,y,radius,color){
		ctx.save();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x,y,radius,0,Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
    }
    
    function getMousePos(parentElement,event) {
        var rect = parentElement.getBoundingClientRect();
        console.log(`(${event.clientX - rect.left},${event.clientY - rect.top})`);

        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }

    function drawRect(ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") {
        ctx.save();
		ctx.globalAlpha = alpha;
        ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
    if (lineWidth > 0) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeStyle;
      ctx.stroke();
    }
    ctx.restore();
  }
})();