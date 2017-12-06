import { OrderHttpService } from './../../providers/order-http.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { IOrder } from '../../models/IOrder';
@Injectable()
export class OrderState {
    private _order: BehaviorSubject<IOrder> = new BehaviorSubject({});
    get order() {
        return this._order.asObservable();
    }
    constructor(private orderHttpService: OrderHttpService,
        private localStorage: LocalStorageService) {
    }
    getOrder(id: string) {
        this.orderHttpService.getOrderById(id).subscribe(order => {
            this._order.next(order);
        });
    }

    getOrderByTableId(id: string) {
        this.orderHttpService.getOrderByTableId(id).subscribe(order => {
            this._order.next(order);
        });
    }

    updateStatusFood(id: string, foodId: string, status: string) {
        this.orderHttpService.updateStatusFood(id, foodId, status).subscribe(order => {
            console.log(order);
            this._order.next(order);
        });
    }

    updateOrder(order: IOrder) {
        this._order.next(order);
    }

}
