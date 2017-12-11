import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { Injectable } from '@angular/core';
import { IOrder, IOrderPost } from '../../models/IOrder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OrderHttpService } from '../../providers/order-http.service';
import { Router } from '@angular/router';

@Injectable()
export class OrderState {

  private _order: BehaviorSubject<IOrder> = new BehaviorSubject(null);
  get order() {
    return this._order.asObservable();
  }
  constructor(private orderHttpService: OrderHttpService,
    private router: Router,
    private localStorage: LocalStorageService) { }

  init() {
    const order = this.localStorage.get('order');
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

  onUpdateOrder(order: IOrder) {
    this._order.next(order);
    this.localStorage.set('order', order);
  }

  onOrderCheckout(cTable) {
    console.log('ctable', cTable);
    const table = this.localStorage.get('table');
    console.log(table);
    if (table) {
      if (table['_id'] === cTable._id) {
        this.router.navigate(['welcome']);
      }
    }
  }

  // checkOutOrder(id: string): Observable<IOrder> {
  //   return this.orderHttpService.updateStatusOrder(id, 'checked out');
  // }
}
