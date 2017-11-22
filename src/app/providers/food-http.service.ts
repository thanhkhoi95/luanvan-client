import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IFood } from '../models/IFood';


@Injectable()
export class FoodHttpService {
    constructor(private httpClient: HttpClient) { }

    getFoods(): Observable<IFood[]> {
        return this.httpClient
            .get('/api/food/getallactive')
            .map(data => {
                const rs = data['data']['foods'] as IFood[];
                return rs;
            });
    }
}
