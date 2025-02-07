const notedEvents = ["WC","Drink","Exercize","Lunch"] as const;

export type DailyEvents = typeof notedEvents[number];

function isDailyDataCollector(obj: any): obj is DailyDataCollector {
    return obj !== null &&
        typeof obj === "object" &&
        typeof obj.date === "string" &&
        typeof obj.fullWorkTime === "number" &&
        typeof obj.passedWorkTime === "number" &&
        typeof obj.passedPauseTime === "number" &&
        Array.isArray(obj.events) &&
        obj.events.every((event:DailyEvents) => notedEvents.includes(event));
}


export class DailyDataCollector {
    date : string = new Date().toLocaleDateString();
    fullWorkTime : number = 60*60*8;    
    passedWorkTime : number = 0;
    passedPauseTime : number = 0;
    events : DailyEvents[] = ["WC","WC","Drink","Drink","Drink","Exercize","Exercize","Lunch"];

    constructor(){
       this.load(); 
    }

    load(){
        const stored = localStorage.getItem(new Date().toLocaleDateString());
        if(stored === null){
            console.log("No data saved today.");
            return;
        }
        const storedData = JSON.parse(stored);
        if(isDailyDataCollector(storedData)){
            this.passedWorkTime = storedData.passedWorkTime;
            this.passedPauseTime = storedData.passedPauseTime;
            this.events = storedData.events;
        }
    }
    save(){
        localStorage.setItem(this.date,JSON.stringify(this))
    }

}

