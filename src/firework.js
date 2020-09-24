class Firework{
    "use strict";
    constructor(targetX = 100,targetY = 100,size = 200,speed=3
        ,duration = 2,color = "white",trail = false, originX = 0,originY = targetY){
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = speed;
        this.color = color;
        this.trail = trail;
        this.duration = duration;
        this.trailX = originX;
        this.trailY = originY;
        this.size = size;
        this.getAngle();
    }
    fwSize = 2;
    n = 0;
    xFactor = 0;
    yFactor = 0;
    timer = 0;
    particles=[];
    erased= false;
    colorRandom = tcLIB.getRandomInt(1, 5);
    trailRainbow = tcLIB.getRandomColor();
    

    getAngle(){
        let dy = (this.targetY - this.trailY);
        let dx = (this.trailX - this.targetX);
        this.xFactor = Math.cos(Math.atan2(dy,dx));
        this.yFactor = Math.sin(Math.atan2(dy,dx));
        //console.log(`${Math.cos(dx)} , ${Math.sin(dx)}`);
    }
    step(){
        //console.log(`${this.trailX} , ${this.trailY}`);
        if(this.trailY>this.targetY){         
           this.trailX -= this.xFactor*this.speed;
           this.trailY += this.yFactor*this.speed;
        }
        else if(this.trailY<=this.targetY||!this.trail){
            this.trail = false;
            this.trailX = this.targetX;
            this.trailY = this.targetY;
            this.fwSize +=.005;
            this.n++;

        }
    }
    increaseTimer(deltaTime){
        this.timer += deltaTime;
    }
    isDead(){
        return this.timer>this.duration;
    }
    addParticle(element){
        this.particles.push(element);
    }
    setToTarget(){
        this.trailX = this.targetX;
        this.trailY = this.targetY;
    }
}