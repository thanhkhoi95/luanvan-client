import { FoodHttpService } from './../../providers/food-http.service';
import { IFood } from './../../models/IFood';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FoodState {
    private _foods: BehaviorSubject<Array<IFood>> = new BehaviorSubject(new Array());
    get foods() {
        return this._foods.asObservable();
    }
    constructor(private foodHttpService: FoodHttpService) { }

    loadFoods() {
        this.foodHttpService.getFoods().subscribe(foods => {
            this._foods.next(foods);
        });
    }
}
