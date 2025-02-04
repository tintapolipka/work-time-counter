const notedEvents = ["WC","Drink","Exercize","Lunch"] as const;

type DailyEvents = typeof notedEvents[number];

function isDailyDataCollector(obj: any): obj is DailyDataCollector {
    return obj !== null &&
        typeof obj === "object" &&
        typeof obj.date === "string" &&
        typeof obj.fullWorkTime === "number" &&
        typeof obj.passedWeekWorkTime === "number" &&
        Array.isArray(obj.events) &&
        obj.events.every((event:DailyEvents) => notedEvents.includes(event));
}


class DailyDataCollector {
    date : string = new Date().toLocaleDateString();
    fullWorkTime : number = 60*60*8;    
    passedWeekWorkTime : number = 0;
    events : DailyEvents[] = ["WC","WC","Drink","Drink","Drink","Exercize","Exercize","Lunch"];

    load(){
        const storedData = localStorage.getItem(new Date().toLocaleDateString());

    }
    save(){
        localStorage.setItem(this.date,JSON.stringify(this))
    }

}

