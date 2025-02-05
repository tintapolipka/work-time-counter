export class StopWatch {
    protected startTime: Date | null = null;
    protected timePassed: number = 0;
    isActive: boolean = false;
    private intervalId: number | null = null;
    protected incrementSideEffectHandler: (num:number) => void;

    constructor(
        incrementSideEffectHandler: (num:number) => void,
        timePassed : number
        ) {
        this.incrementSideEffectHandler = incrementSideEffectHandler;
        this.timePassed = timePassed? timePassed : this.timePassed;
    }

    private incrementHandler = (): void => {
        this.incrementSideEffectHandler(this.timePassed);
        this.timePassed++;
    };

    stop(): void {
        if (typeof this.intervalId === 'number') {
            clearInterval(this.intervalId);
        } else {
            console.error("Error! No intervalId!");
        }
        this.intervalId = null;
        this.isActive = false;
    }

    start(): void {
        this.intervalId = window.setInterval(this.incrementHandler.bind(this), 1000);
        this.startTime = new Date();
        this.isActive = true;
    }

    reset(): void {
        this.stop();
        if (this.isActive) {
            this.startTime = null;
            this.isActive = false;
            this.timePassed = 0;
        }
    }

    startOrStop(): void {
        this.isActive ? this.stop() : this.start();
    }
}

