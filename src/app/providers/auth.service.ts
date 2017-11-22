import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    login(username: string, password: string): Observable<string> {
        return  this.httpClient.post('api/auth/login', { username: username, password: password }).map(data => {
            return data['data'].token;
        });
    }
}
