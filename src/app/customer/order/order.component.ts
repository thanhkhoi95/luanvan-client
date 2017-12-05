import { TableState } from './../providers/table.state';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodState } from './../providers/food.state';
import { IFood } from './../../models/IFood';
import { Component, OnInit } from '@angular/core';
import { groupBy, map, chain, remove } from 'lodash';
import { MatListOptionChange } from '@angular/material/list';
import { OrderState } from '../providers/order.state';
import { IOrderPost, IOrder } from '../../models/IOrder';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { SocketService } from '../../providers/socket.service';
import { ITable } from '../../models/ITable';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private isNew: boolean;
  private orderId: string;

  foods: IFood[] = [];
  foodByCategories: any[] = [];

  constructor(private foodState: FoodState,
    private route: ActivatedRoute,
    private orderState: OrderState,
    private localStorage: LocalStorageService,
    private router: Router,
    private socketService: SocketService,
    private tableState: TableState) { }

  ngOnInit() {
    this.foodState.foods.subscribe(foods => {
      this.foodByCategories = chain(foods).groupBy('categories[0].id').map((f: any) => {
        return {
          foods: f as IFood[],
          category: f[0].categories[0].name as string
        };
      }).value();
    });

    this.route.params.subscribe(params => {
      const id = params.id;
      if (id === 'new') {
        this.isNew = true;
        this.orderId = '';
      } else {
        this.isNew = false;
        this.orderId = id;
      }
    });

    this.foodState.loadFoods();
  }

  onSelect(food: IFood, option: MatListOptionChange) {
    if (!food.quantity && option.selected) {
      food.quantity = 1;
    }
    if (option.selected) {
      const exist = this.foods.find(f => {
        return f.id === food.id;
      });
      if (!exist) {
        console.log('select', this.foods);
        this.foods.push(food);
      }
    } else {
      this.foods = remove(this.foods, f => {
        return f.id !== food.id;
      });
      console.log('select', this.foods);
    }
  }

  onOrder() {
    if (this.foods.length === 0) {
      alert('Please select food !');
      return;
    }
    const tableId = this.localStorage.get('table')['_id'];
    const foods = this.foods.map(f => {
      return {
        food: f.id,
        quantity: f.quantity
      };
    });
    const orderPost: IOrderPost = {
      foods: foods,
      table: tableId
    };
    this.orderState.createOrder(orderPost).subscribe(data => {
      this.socketService.updateOrder(data as IOrder);
      this.router.navigate(['bill']);
    });
  }

  onAddFood() {
    if (this.foods.length === 0) {
      alert('Please select food !');
      return;
    }

    const foods = this.foods.map(f => {
      return {
        food: f.id,
        quantity: f.quantity
      };
    });

    this.orderState.addMoreFood(this.orderId, foods).subscribe(data => {
      this.socketService.updateOrder(data as IOrder);
      this.router.navigate(['bill']);
    });
  }

  leave() {
    const table = this.localStorage.get('table') as ITable;
    this.tableState.updateStatusTable(table._id, 'available').subscribe(t => {
      t._id = t.id;
      this.socketService.updateTable(t);
      this.router.navigate(['welcome']);
    });
  }

  back() {
    this.router.navigate(['bill']);
  }
}
