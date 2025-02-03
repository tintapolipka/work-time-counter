class StopWatch {
    protected startTime: Date | null = null;
    protected timePassed: number = 0;
    protected isActive: boolean = false;
    private intervalId: number | null = null;
    protected incrementSideEffectHandler: () => void;

    constructor(incrementSideEffectHandler: () => void) {
        this.incrementSideEffectHandler = incrementSideEffectHandler;
    }

    private incrementHandler = (): void => {
        this.timePassed++;
        this.incrementSideEffectHandler();
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
