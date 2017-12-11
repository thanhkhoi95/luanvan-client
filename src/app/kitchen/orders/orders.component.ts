import { IFood } from './../../models/IFood';
import { OrderState } from './../providers/order.state';
import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../models/IOrder';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SocketService } from '../../providers/socket.service';
import { AuthState } from '../../providers/auth.state';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  order: IOrder;
  authInfo: any;

  constructor(private orderState: OrderState,
    private route: ActivatedRoute,
    private socketService: SocketService,
    private authState: AuthState) { }

  ngOnInit() {
    console.log('this');
    this.orderState.order.subscribe(order => {
      this.order = order;
      console.log(this.order);
    });
    this.route.params.subscribe(params => {
      const id = params.id;
      this.orderState.getOrderByTableId(id);
    });
    this.authState.auth.subscribe(info => {
      this.authInfo = info['user'];
    });
    this.authState.getAuthInfo();
  }

  onDoneCheck(food: IFood, uid: string, event: MatCheckboxChange) {
    this.order.foods.map(f => {
      if (f.uid === uid) {
        if (event.checked) {
          (f as any)['status'] = 'done';
          f['kitchen'] = this.authInfo.kitchen;
          this.orderState.updateStatusFood(this.order.id, uid, 'done');
        } else {
          (f as any)['status'] = 'ordered';
          this.orderState.updateStatusFood(this.order.id, uid, 'ordered');
        }
      }
      return f;
    });
    this.order['newOrder'] = '';
    this.socketService.updateOrder(this.order);
  }

  onCockingCheck(food: IFood, uid: string, event: MatCheckboxChange) {
    this.order.foods.map(f => {
      if (f.uid === uid) {
        if (event.checked) {
          (f as any)['status'] = 'cocking';
          f['kitchen'] = this.authInfo.kitchen;
          this.orderState.updateStatusFood(this.order.id, uid, 'cocking');
        } else {
          (f as any)['status'] = 'ordered';
          this.orderState.updateStatusFood(this.order.id, uid, 'ordered');
        }
      }
      return f;
    });
    this.order['newOrder'] = '';
    this.socketService.updateOrder(this.order);
  }

  isDisable(item) {
    console.log(item);
    if (item.status === 'ordered') {
      console.log(1);
      return false;
    } else
    if (item.status !== 'delivered' && item.kitchen._id.toString() === this.authInfo.kitchen.id) {
      console.log(2);
      return false;
    }
    return true;
  }

}
