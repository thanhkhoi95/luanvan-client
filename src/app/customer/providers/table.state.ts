import { Observable } from 'rxjs/Observable';
import { ITable } from './../../models/ITable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { JwtHelper } from 'angular2-jwt';
import { TableHttpService } from '../../providers/table-http.service';
@Injectable()
export class TableState {
    private _table: BehaviorSubject<ITable> = new BehaviorSubject({});
    get table() {
        return this._table.asObservable();
    }
    private jwtHelper: JwtHelper = new JwtHelper();
    constructor(private tableHttpService: TableHttpService,
        private localStorage: LocalStorageService) {
    }

    login(name: string): Observable<any> {
        return this.tableHttpService.loginTable(name).map(res => {
            this.localStorage.set('token', res.token.toString());
            const table = this.jwtHelper.decodeToken(res.token.toString());
            this.localStorage.set('table', table);
            console.log('table:', table);
            this._table.next(table);
            console.log(res);
            return res;
        });
    }

    updateStatusTable(id: string, status: string): Observable<ITable> {
        return this.tableHttpService.updateStatus(id, status).map(table => {
            this._table.next(table);
            return table;
        });
    }
}
