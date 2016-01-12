export class Toast {
    public message: string;
    public level: string;
    public lifetime: number;
    
    constructor(message: string, level: string, lifetime: number) {
        this.message = message;
        this.level = level;
        this.lifetime = lifetime;
    }
    
}
