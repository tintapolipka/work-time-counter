
class Displayers {
    constructor() {
        this.btnNode = document.getElementById("root");
        this.nodeHHMM = document.getElementById("hh-mm");
        this.pauseNode = document.getElementById("pause-bar");
        this.breakNode = document.getElementById("break-time");
        this.dataCollector = new DailyDataCollector();
        this.stopwatch = new StopWatch(this.displayIt.bind(this), this.dataCollector.passedWorkTime);
        this.pausewatch = new StopWatch(this.pauseDisplay.bind(this), this.dataCollector.passedPauseTime);
    }
    
    eventButtons(){
        this.dataCollector.events.forEach(element => {
          const btn = document.createElement("button");
          btn.innerText = element;
          document.getElementById("pause-events")?.append(
            btn
          )
        });
        }
    
    formatTime(seconds) {
        if (seconds < 0)
            throw new Error("A bemenet nem lehet negatív szám");
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ].join(":");
    }
    pauseDisplay(num) {
        if (this.pauseNode === null) {
            console.log("PauseNode desn't exist!");
            return;
        }
        this.pauseNode.style.width = `${100 - Math.floor((num / 3600) * 100)}%`;
        if (this.breakNode === null) {
            return;
        }
        this.breakNode.innerHTML = this.formatTime(3600 - num);
        this.dataCollector.passedPauseTime = num;
        if (this.dataCollector.passedPauseTime % 60 === 0) {
            this.dataCollector.save();
        }
    }
    displayIt(num) {
        if (this.btnNode === null) {
            return;
        }
        this.btnNode.innerHTML = `<p>${"⏸⏵"}</p>`;
        if (this.btnNode.parentElement === null) {
            return;
        }
        this.btnNode.parentElement.style.backgroundColor = `hsl(${(num % 60) * 6}deg,60%,60%)`;
        if (this.nodeHHMM === null) {
            return;
        }
        this.nodeHHMM.innerHTML = this.formatTime(num);
        this.dataCollector.passedWorkTime = num;
        if (this.dataCollector.passedWorkTime % 60 === 0) {
            this.dataCollector.save();
        }
    }
}
