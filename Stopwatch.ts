class StopWatch {
    protected startTime : Date|null = null;
    protected timePassed : number = 0;
    protected isActive : boolean = false;
    private intervalId : number|null = null;
    protected incrementSideEffectHandler : ()=>void = ()=>{console.log(this.timePassed)};

    constructor(incrementSideEffetcHandler : ()=>void){
        this.incrementSideEffectHandler = incrementSideEffetcHandler;
    }

    incrementHandler(){
        this.timePassed++;
        this.incrementSideEffectHandler();
    }

    stop(){ 
            if (typeof this.intervalId === 'number')
            {clearInterval(this.intervalId)} 
            else {console.error("Error! No intervalId!")}
            this.intervalId = null;
            this.isActive = false;
    }

    start(){
        this.intervalId = setInterval(this.incrementHandler,1000);
        this.startTime = new Date();
        this.isActive = true;
    }

    reset(){
        this.stop();
        if(this.isActive){
            this.startTime = null;
            this.isActive = false;
            this.timePassed = 0;           
        } else {return};
    }

    startOrStop(){
        if(this.isActive){
            this.stop()
        } else {
            this.start()};
    }

}
