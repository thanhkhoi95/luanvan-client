import { SocketService } from './../../providers/socket.service';
import { Router } from '@angular/router';
import { IFood } from './../../models/IFood';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../models/IOrder';
import { OrderState } from '../providers/order.state';
import { TableState } from '../providers/table.state';
import { ITable } from '../../models/ITable';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  order: IOrder = {};
  total: Number = 0;
  constructor(private orderState: OrderState,
    private localStorage: LocalStorageService,
    private tableStatue: TableState,
    private router: Router,
    private socketService: SocketService) { }

  ngOnInit() {
    // this.order = this.localStorage.get('order') as any;
    // console.log(this.order);
    this.orderState.order.subscribe(o => {
      this.order = o;
      this.calcTotal();
    });
    this.orderState.init();
  }

  calcTotal() {
    if (this.order === null || !this.order.foods) {
      return;
    }
    this.total = 0;
    this.order.foods.forEach((item: any) => {
      const food = item.food as IFood;
      (this.total as number) += (food.price * (item.quantity as number));
    });
  }

  checkOut() {
    const table = this.localStorage.get('table') as ITable;
    table.checkout = true;
    this.socketService.tableCheckout(table);
  }

  orderMore() {
    this.router.navigate(['order', this.order.id]);
  }
}
