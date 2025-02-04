
class DailyDataCollector {
    constructor() {
        this.date = new Date().toLocaleDateString();
        this.fullWorkTime = 60 * 60 * 8;
        this.passedWeekWorkTime = 0;
        this.events = ["WC", "WC", "Drink", "Drink", "Drink", "Exercize", "Exercize", "Lunch"];
    }
    load() {
        const storedData = localStorage.getItem(new Date().toLocaleDateString());
    }
    save() {
        localStorage.setItem(this.date, JSON.stringify(this));
    }
}
