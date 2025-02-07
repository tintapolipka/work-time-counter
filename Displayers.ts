import { StopWatch } from "./Stopwatch";
import { DailyDataCollector } from "./DailyDataCollector";
import { DailyEvents } from "./DailyDataCollector";

class Displayers {
  btnNode = document.getElementById("root");
  nodeHHMM = document.getElementById("hh-mm");
  pauseNode = document.getElementById("pause-bar");
  breakNode = document.getElementById("break-time");

  dataCollector = new DailyDataCollector();

  stopwatch = new StopWatch(
    this.displayIt.bind(this),
    this.dataCollector.passedWorkTime
  );
  pausewatch = new StopWatch(
    this.pauseDisplay.bind(this),
    this.dataCollector.passedPauseTime
  );

  eventButtons(){
  this.dataCollector.events.forEach(element => {
    const btn = document.createElement("button");
    btn.innerText = element;
    btn.addEventListener("click",this.removeEvent)
    document.getElementById("pause-events")?.append(
      btn
    )
  });
  }
  removeEvent = (eventToRemove:DailyEvents) =>{
    const indexToRemove = this.dataCollector.events.findIndex(item => item === eventToRemove);
    this.dataCollector.events.splice(indexToRemove,1);
  }

  formatTime(seconds: number): string {
    if (seconds < 0) console.error("A bemenet nem lehet negatív szám");

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  }

  pauseDisplay(num: number) {
    if (this.pauseNode === null) {
      console.log("PauseNode desn't exist!");
      return;
    }
    this.pauseNode.style.width = `${100 - Math.floor((num / 3600) * 100)}%`;
    if(this.breakNode === null){return;}
    this.breakNode.innerHTML = this.formatTime(3600-num);
  
    this.dataCollector.passedPauseTime = num;

    if (this.dataCollector.passedPauseTime % 60 === 0) {
      this.dataCollector.save();
    }
  
  }

  displayIt(num: number) {
    if (this.btnNode === null) {
      return;
    }
    this.btnNode.innerHTML = `<p>${"⏸⏵"}</p>`;
    if (this.btnNode.parentElement === null) {
      return;
    }
    this.btnNode.parentElement.style.backgroundColor = `hsl(${
      (num % 60) * 6
    }deg,60%,60%)`;

    if (this.nodeHHMM === null) {
      return;
    }
    this.nodeHHMM.innerHTML = this.formatTime(num);

    this.dataCollector.passedWorkTime = num;

    if (this.dataCollector.passedWorkTime % 60 === 0) {
      this.dataCollector.save();
    }
  }

  workOrPause = ()=>{
    this.stopwatch.startOrStop();
    this.pausewatch.startOrStop();  
  }



}
