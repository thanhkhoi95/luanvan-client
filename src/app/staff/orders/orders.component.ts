import { IFood } from './../../models/IFood';
import { OrderState } from './../providers/order.state';
import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../models/IOrder';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SocketService } from '../../providers/socket.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  order: IOrder;
  constructor(private orderState: OrderState,
    private route: ActivatedRoute,
    private socketService: SocketService) { }

  ngOnInit() {
    this.orderState.order.subscribe(order => {
      this.order = order;
      console.log(this.order);
    });
    this.route.params.subscribe(params => {
      const id = params.id;
      this.orderState.getOrderByTableId(id);
    });
  }

  onCheck(food: IFood, uid: string, event: MatCheckboxChange) {
    this.order.foods.map(f => {
      if (f.uid === uid) {
        if (event.checked) {
          (f as any)['status'] = 'ready to delivery';
          this.orderState.updateStatusFood(this.order.id, uid, 'ready to delivery');
        } else {
          (f as any)['status'] = 'ordered';
          this.orderState.updateStatusFood(this.order.id, uid, 'ordered');
        }
      }
      return f;
    });
    this.socketService.updateOrder(this.order);
  }

}
