import { Observable } from 'rxjs/Observable';
import { ITable } from './../models/ITable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { JwtHelper } from 'angular2-jwt';
import { TableHttpService } from '../providers/table-http.service';
import { AuthService } from '../providers/auth.service';
@Injectable()
export class AuthState {
    private _auth: BehaviorSubject<Object> = new BehaviorSubject({});
    get auth() {
        return this._auth.asObservable();
    }

    private jwtHelper: JwtHelper = new JwtHelper();

    getAuthInfo() {
        const token = this.localStorage.get('token');
        const user = this.jwtHelper.decodeToken(token as string);
        this.localStorage.set('user', user);
        this._auth.next({ user: user });
    }

    constructor(private authService: AuthService,
        private localStorage: LocalStorageService) {
    }

    login(username: string, password: string): Observable<string> {
        return this.authService.login(username, password).map(token => {
            this.localStorage.set('token', token);
            const user = this.jwtHelper.decodeToken(token as string);
            this.localStorage.set('user', user);
            this._auth.next({ user: user });
            return token;
        });
    }
}
