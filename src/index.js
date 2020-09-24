(function () {
    "use strict";

    const canvasWidth = 800, canvasHeight = 600;
    let ctx, fwCanvas;
    let x = 0, y = 0;
    let counter = 0;//angle
    //let c = 2;
    let size = 2, sizeMulti = 1.314, expSize = 200;
    let randomFireworks = false;
    let interval = 1, timer = 0;
    let alpha = .75;
    let fps = 120;
    let trailRadius = 3, sizeIncrement = .005, lifespan = 3;
    let demoFirework;
    let worldTrail = false,rainbowTrail = false;
    window.onload = init;
    let n = 0, p = 0;
    const divergence = 137.5;
    let fireworks = [];

    function init() {
        ctx = canvas.getContext("2d");
        fwCanvas = topCanvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        topCanvas.width = canvasWidth;
        topCanvas.height = canvasHeight;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                                //  targetX,        targetY,         ,size,speed,duration,color,trail?, trail originX, train originY
        // demoFirework = new Firework(canvasWidth / 2, canvasHeight / 2, 200,    3,       5,"red",  true, 2 * canvasWidth / 3, canvasHeight);
        document.onmousedown = function (e) {
            //   if(selectedElement)
            var mousePos = getMousePos(canvas, e);
            if (mousePos.x < canvasWidth && mousePos.y < canvasHeight)
                fireworks.push(new Firework(mousePos.x, mousePos.y, expSize,2,lifespan,"white",worldTrail,tcLIB.getRandomInt(0, canvasWidth),canvasHeight));
        };
        document.querySelector("#randomButton").onclick = function (e) {
            randomFireworks = !randomFireworks;
            if (!randomFireworks)
                e.target.innerHTML = "Start!";
            else
                e.target.innerHTML = "Stop!";
        };
        document.querySelector("#clearButton").onclick = function (e) {
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            fwCanvas.clearRect(0, 0, canvasWidth, canvasHeight);
        };
        document.querySelector("#randomInterval").style.display = "none";
        document.querySelector("#randomButton").style.display = "none";
        document.querySelector("#fireworkMode").onchange = function (e) {
            if (e.target.value == "random") {
                document.querySelector("#randomInterval").style.display = "";
                document.querySelector("#randomButton").style.display = "";
            }
            else{
                document.querySelector("#randomInterval").style.display = "none";
                document.querySelector("#randomButton").style.display = "none";
            }
        };
        document.querySelector("#randomInterval").onchange = function (e) {
            interval = e.target.value;
        };
        document.querySelector("#fwExpSize").onchange = function (e) {
            expSize = e.target.value;
        };
        document.querySelector("#fwLifespan").onchange = function (e) {
            lifespan = e.target.value;
        };
        document.querySelector("#trailBox").onchange = function (e) {
            worldTrail = e.target.checked;
        };
        document.querySelector("#rainbowBox").onchange = function (e) {
            rainbowTrail = e.target.checked;
        };

        loop();
    }

    function loop() {


        setTimeout(loop, 1000 / fps);

        // each frame draw a new dot
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();

        fireworks.forEach(element => {
            console.log(element);
            if(element.isDead()&&!element.erased){        
                element.particles.forEach(innerElement => {
                    if(innerElement!=null)
                    fwCanvas.clearRect(innerElement.x - innerElement.size*sizeMulti,innerElement.y - innerElement.size*sizeMulti,innerElement.size*2*sizeMulti,innerElement.size*2*sizeMulti);
                });
                element.erased = true;
                element.particles = [];
                
                let i = fireworks.indexOf(element);
                if(i > -1){
                    fireworks.splice(i, 1);
                }
            }
        });

            fireworks.forEach(element => {
                console.log("second:");
                console.log(element.n);
            if(element.trail){
                if(!rainbowTrail)
                drawCircle(ctx,element.trailX,element.trailY,trailRadius,element.color);
                else
                drawCircle(ctx,element.trailX,element.trailY,trailRadius,element.trailRainbow);
            }

            element.step();

            if(!element.trail){
                element.setToTarget();

                element.addParticle(createPhyllo(element.targetX,element.targetY,element.size, element.n, element.fwSize,element.colorRandom));            
                
                element.increaseTimer(1/fps);
            }
        });

        if (randomFireworks) {
            timer += 1/fps;
            if (interval < timer) {
                timer = 0;
                let ranColor = tcLIB.getRandomColor();
                if(!rainbowTrail)
                fireworks.push(new Firework(tcLIB.getRandomInt(0, canvasWidth),tcLIB.getRandomInt(0, canvasHeight), expSize,2,lifespan,"white",worldTrail,tcLIB.getRandomInt(0, canvasWidth),canvasHeight));
                else
                fireworks.push(new Firework(tcLIB.getRandomInt(0, canvasWidth),tcLIB.getRandomInt(0, canvasHeight), expSize,2,lifespan,ranColor,worldTrail,tcLIB.getRandomInt(0, canvasWidth),canvasHeight));
            }
        }



    }

    function createPhyllo(localX, localY, max, n, c, base) {

        let p = n;
        if (p < max) {
            let a = p * dtr(divergence);
            let r = c * Math.sqrt(p);
            let x = r * Math.cos(a) + localX;
            let y = r * Math.sin(a) + localY;

            // let aDegrees = (n * divergence) % 361;
            // let color = `hsl(${aDegrees},100%,50%)`;
            let color = `hsl(${p / base % 361},100%,50%)`;
            drawCircle(fwCanvas, x, y, size, color);

            //size +=.005;
            c += sizeIncrement;
            p++;
            return {"x": x,"y":y,"size":size};
        }
    }

    // helpers
    function dtr(degrees) {
        return degrees * (Math.PI / 180);
    }

    function drawCircle(fwCanvas, x, y, radius, color) {
        fwCanvas.save();
        fwCanvas.fillStyle = color;
        fwCanvas.beginPath();
        fwCanvas.arc(x, y, radius, 0, Math.PI * 2);
        fwCanvas.closePath();
        fwCanvas.fill();
        fwCanvas.restore();
    }

    function getMousePos(parentElement, event) {
        var rect = parentElement.getBoundingClientRect();
        console.log(`(${event.clientX - rect.left},${event.clientY - rect.top})`);

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

})();