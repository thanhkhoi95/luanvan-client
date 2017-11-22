import { Observable } from 'rxjs/Observable';
import { ITable } from './../../models/ITable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { TableHttpService } from '../../providers/table-http.service';
@Injectable()
export class TableState {
    private _tables: BehaviorSubject<ITable[]> = new BehaviorSubject([]);
    get tables() {
        return this._tables.asObservable();
    }
    constructor(private tableHttpService: TableHttpService,
        private localStorage: LocalStorageService) {
    }

    getTables() {
        this.tableHttpService.getTables().subscribe(tables => {
            this._tables.next(tables);
        });
    }

    onUpdateTable(table: ITable) {
        table.id = table._id;
        let tables = this._tables.getValue();
        tables = tables.map(t => {
            if (t.id === table.id) {
                t = table;
            }
            return t;
        });
        this._tables.next(tables);
    }

    onUpdateNewOrderTable(table: ITable, orderId: string) {
        table.id = table._id;
        let tables = this._tables.getValue();
        tables = tables.map(t => {
            if (t.id === table.id) {
                t.newOrder = 'New Order';
                t.orderId = orderId;
            }
            return t;
        });
        this._tables.next(tables);
    }
}
