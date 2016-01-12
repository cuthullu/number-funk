import {Injectable, TimerWrapper} from 'angular2/core';
import {Toast} from '../model/toast'

@Injectable()
export class ToastService {
    public toasts: Toast[] = [];
    constructor() { }
    
    addToast(message: string, level: string, lifetime: number) {
        var toast  = new Toast(message,level, lifetime);
        this.toasts.push(toast);
        setTimeout(() => 
            this.toasts.splice(this.toasts.indexOf(toast, 1)), toast.lifetime
        );
    }
    
    getToasts() {
        return this.toasts;
    }
}