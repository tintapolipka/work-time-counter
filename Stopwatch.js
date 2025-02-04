"use strict";
class StopWatch {
    constructor(incrementSideEffectHandler) {
        this.startTime = null;
        this.timePassed = 0;
        this.isActive = false;
        this.intervalId = null;
        this.incrementHandler = () => {
            this.incrementSideEffectHandler(this.timePassed);
            this.timePassed++;
        };
        this.incrementSideEffectHandler = incrementSideEffectHandler;
    }
    stop() {
        if (typeof this.intervalId === 'number') {
            clearInterval(this.intervalId);
        }
        else {
            console.error("Error! No intervalId!");
        }
        this.intervalId = null;
        this.isActive = false;
    }
    start() {
        this.intervalId = window.setInterval(this.incrementHandler.bind(this), 1000);
        this.startTime = new Date();
        this.isActive = true;
    }
    reset() {
        this.stop();
        if (this.isActive) {
            this.startTime = null;
            this.isActive = false;
            this.timePassed = 0;
        }
    }
    startOrStop() {
        this.isActive ? this.stop() : this.start();
    }
}

function displayIt(num){
    document.getElementById('root').innerHTML = `<p>${num}</p>`
}