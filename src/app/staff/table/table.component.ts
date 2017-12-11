import { IFood } from './../../models/IFood';
import { OrderState } from './../providers/order.state';
import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../models/IOrder';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SocketService } from '../../providers/socket.service';
import { AuthState } from '../../providers/auth.state';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  order: IOrder;
  authInfo: any;
  tableId: string;
  constructor(private orderState: OrderState,
    private route: ActivatedRoute,
    private socketService: SocketService,
    private router: Router,
    private authState: AuthState) { }

  ngOnInit() {
    this.orderState.order.subscribe(order => {
      this.order = order;
    });
    this.route.params.subscribe(params => {
      const id = params.id;
      this.tableId = id;
      this.orderState.getOrderByTableId(id);
    });
    this.authState.auth.subscribe(info => {
      this.authInfo = info['user'];
    });
    this.authState.getAuthInfo();
  }

  onCheck(food: IFood, uid: string, event: MatCheckboxChange) {
    this.order.foods.map(f => {
      if (f.uid === uid) {
        if (event.checked) {
          (f as any)['status'] = 'delivered';
          f['staff'] = this.authInfo.staff;
          this.orderState.updateStatusFood(this.order.id, uid, 'delivered');
        } else {
          (f as any)['status'] = 'done';
          this.orderState.updateStatusFood(this.order.id, uid, 'done');
        }
      }
      return f;
    });
    this.order['newOrder'] = '';
    this.socketService.updateOrder(this.order);
  }

  isDisable(item) {
    if (item.status === 'done') {
      return false;
    } else
      if (item.status === 'delivered' && item.staff._id.toString() === this.authInfo.staff.id) {
        return false;
      }
    return true;
  }

  isDisplayKitchenName(item) {
    console.log(1234234);
    console.log(item);
    return (item.status !== 'delivered' && item.status !== 'odered');
  }

  viewFoodMenu() {
    if (this.order) {
      this.router.navigate(['staff', 'table', this.tableId, this.order.id]);
    } else {
      this.router.navigate(['staff', 'table', this.tableId, 'new']);
    }
  }

  viewBill() {
    this.router.navigate(['staff', 'bill', this.order.id]);
  }
}
