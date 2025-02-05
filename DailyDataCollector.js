const notedEvents = ["WC", "Drink", "Exercize", "Lunch"];
function isDailyDataCollector(obj) {
    return obj !== null &&
        typeof obj === "object" &&
        typeof obj.date === "string" &&
        typeof obj.fullWorkTime === "number" &&
        typeof obj.passedWorkTime === "number" &&
        typeof obj.passedPauseTime === "number" &&
        Array.isArray(obj.events) &&
        obj.events.every((event) => notedEvents.includes(event));
}
class DailyDataCollector {
    constructor() {
        this.date = new Date().toLocaleDateString();
        this.fullWorkTime = 60 * 60 * 8;
        this.passedWorkTime = 0;
        this.passedPauseTime = 0;
        this.events = ["WC", "WC", "Drink", "Drink", "Drink", "Exercize", "Exercize", "Lunch"];
        this.load();
    }
    load() {
        const stored = localStorage.getItem(new Date().toLocaleDateString());
        if (stored === null) {
            console.log("No data saved today.");
            return;
        }
        const storedData = JSON.parse(stored);
        if (isDailyDataCollector(storedData)) {
            this.passedWorkTime = storedData.passedWorkTime;
            this.passedPauseTime = storedData.passedPauseTime;
            this.events = storedData.events;
        }
    }
    save() {
        localStorage.setItem(this.date, JSON.stringify(this));
    }
}
