import { IOrderPost } from './../models/IOrder';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IOrder } from '../models/IOrder';
@Injectable()
export class OrderHttpService {

  constructor(private http: HttpClient) { }

  createOrder(order: IOrderPost): Observable<IOrder> {
    return this.http.post('api/order', order).map(data => {
      console.log(data);
      return data['data']['order'] as IOrder;
    });
  }
  getOrderById(id: string): Observable<IOrder> {
    return this.http.get(`/api/order?id=${id}`).map(data => {
      return data['data'].order as IOrder;
    });
  }

  getOrderByTableId(id: string): Observable<IOrder> {
    return this.http.get(`/api/order/newest?tableid=${id}`).map(data => {
      return data['data'].order as IOrder;
    });
  }

  updateStatusOrder(id: string, status: string): Observable<IOrder> {
    return this.http.put(`/api/order/orderstatus?id=${id}`, { status: status }).map(data => {
      return data['data'].order as IOrder;
    });
  }

  updateStatusFood(orderId: string, foodId: string, status: string) {
    console.log(foodId);
    return this.http.put(`/api/order/foodstatus?id=${orderId}`,
      {
        uid: foodId,
        status: status
      }).map(data => {
        return data['data'].order as IOrder;
      });
  }

  addMoreFood(orderId: string, foods) {
    return this.http.put(`/api/order/addfood?id=${orderId}`, { foods: foods }).map(data => {
      return data['data'].order as IOrder;
    });
  }

  onlineCheckout(id: string) {
    this.http.get(`/api/order/onlinecheckout?id=${id}`).subscribe(
      (response) => {
        console.log(response);
        document.location.replace(<string>response['url']);
      }
    );
  }
}
