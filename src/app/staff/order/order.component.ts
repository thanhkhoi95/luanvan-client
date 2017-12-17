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
  private tableId: string;
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
        console.log(foods);
        return {
          foods: f as IFood[],
          category: f[0].categories[0].name as string
        };
      }).value();
    });

    this.route.params.subscribe(params => {
      const orderId = params.orderId;
      this.tableId = params.tableId;
      if (orderId === 'new') {
        this.isNew = true;
        this.orderId = '';
      } else {
        this.isNew = false;
        this.orderId = orderId;
      }
    });

    this.foodState.loadFoods();
  }

  onSelect(food: IFood, option: MatListOptionChange) {
    if (!food.quantity && option.selected) {
      food.quantity = 1;
    } else if (!option.selected) {
      food.quantity = null;
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
    const foods = this.foods.map(f => {
      return {
        food: f.id,
        quantity: f.quantity
      };
    });
    const orderPost: IOrderPost = {
      foods: foods,
      table: this.tableId
    };
    this.orderState.createOrder(orderPost).subscribe(data => {
      data['newOrder'] = 'New order';
      this.socketService.updateOrder(data as IOrder);
      this.router.navigate(['staff', 'table', this.tableId]);
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
      data['newOrder'] = 'New order';
      this.socketService.updateOrder(data as IOrder);
      this.router.navigate(['staff', 'table', this.tableId]);
    });
  }

  back() {
    this.router.navigate(['staff', 'table', this.tableId]);
  }
}
