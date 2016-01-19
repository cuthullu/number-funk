import {Component, Inject} from 'angular2/core'
import {OnInit} from 'angular2/core'
import {Input, Output, EventEmitter} from 'angular2/core'
import {RouteParams} from "angular2/router"

import {Toast} from '../../model/toast'
import {ToastService} from '../../service/toast.service'
@Component({
    selector: 'toast-container',
    templateUrl: 'views/toast.html',
})

export class ToastComponent {
    public toasts: Toast[];
    // You failed. I'm taking one of your points. Don't fail again, failure.
    constructor(private _toastService: ToastService) {
    }
    
    ngOnInit() {
        this.toasts = this._toastService.getToasts();
    }
}
