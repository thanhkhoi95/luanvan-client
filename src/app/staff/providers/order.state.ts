import { OrderHttpService } from './../../providers/order-http.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { IOrder, IOrderPost } from '../../models/IOrder';
@Injectable()
export class OrderState {
    private _order: BehaviorSubject<IOrder> = new BehaviorSubject(null);
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

    createOrder(order: IOrderPost) {
        return this.orderHttpService.createOrder(order).map(o => {
            this.localStorage.set('order', o);
            console.log(o);
            this._order.next(o);
            return o;
        });
    }

    addMoreFood(order: string, foods) {
        return this.orderHttpService.addMoreFood(order, foods).map(o => {
            this.localStorage.set('order', o);
            console.log(o);
            this._order.next(o);
            return o;
        });
    }

    checkOutOrder(id: string): Observable<IOrder> {
        return this.orderHttpService.updateStatusOrder(id, 'checked out');
    }
}
