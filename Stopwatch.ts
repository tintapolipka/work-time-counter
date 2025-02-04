class StopWatch {
    protected startTime: Date | null = null;
    protected timePassed: number = 0;
    protected isActive: boolean = false;
    private intervalId: number | null = null;
    protected incrementSideEffectHandler: (num:number) => void;

    constructor(incrementSideEffectHandler: (num:number) => void) {
        this.incrementSideEffectHandler = incrementSideEffectHandler;
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

// Formatting functions
function formatTime(seconds: number): string {
    if (seconds < 0) throw new Error("A bemenet nem lehet negatív szám");

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':');
}

function displayIt(num : number){
    const node = document.getElementById('root');
    if(node === null ){return};
    node.innerHTML = `<p>${num%60}</p>`;
    if(node.parentElement === null ){return};
    node.parentElement.style.backgroundColor = `hsl(${(num%60)*6}deg,60%,60%)`;

    const nodeHHMM = document.getElementById('hh-mm');
    if(nodeHHMM === null ){return};
    nodeHHMM.innerHTML = formatTime(num);
    
}