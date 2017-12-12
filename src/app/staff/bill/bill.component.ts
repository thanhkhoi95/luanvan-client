import { SocketService } from './../../providers/socket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IFood } from './../../models/IFood';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IOrder } from '../../models/IOrder';
import { OrderState } from '../providers/order.state';
import { TableState } from '../providers/table.state';
import { AuthService } from '../../providers/auth.service';
import { AuthState } from '../../providers/auth.state';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  order: IOrder = {};
  total: Number = 0;
  orderId: string;
  isShow = false;
  authInfo: any;
  private password: string;
  constructor(private orderState: OrderState,
    private localStorage: LocalStorageService,
    private tableStatue: TableState,
    private router: Router,
    private route: ActivatedRoute,
    private socketService: SocketService,
    private authService: AuthService,
    private authState: AuthState) { }

  ngOnInit() {
    // this.order = this.localStorage.get('order') as any;
    // console.log(this.order);
    this.authState.auth.subscribe(info => {
      this.authInfo = info['user'];
    });
    this.authState.getAuthInfo();
    this.route.params.subscribe(params => {
      this.orderId = params.id;
    });
    this.orderState.order.subscribe(o => {
      this.order = o;
      this.calcTotal();
    });
    this.orderState.getOrder(this.orderId);
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

  toggleModal(flag: boolean) {
    this.password = '';
    this.isShow = flag;
  }

  back() {
    if (this.order !== null) {
      this.router.navigate(['staff', 'table', this.order.table.id]);
    } else {
      this.router.navigate(['staff', 'tables']);
    }
  }

  confirmCheckout() {
    const username = this.authInfo.staff.username;
    this.authService.login(username, this.password).subscribe((token) => {
      this.orderState.checkOutOrder(this.order.id).subscribe(order => {
        this.socketService.orderCheckout(order);
        this.isShow = false;
        this.router.navigate(['staff', 'tables']);
      });
    });
  }

  onlineCheckout() {
    this.orderState.onlineCheckout(this.order.table.id);
  }

}
