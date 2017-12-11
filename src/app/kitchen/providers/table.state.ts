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
            const oldTables = this._tables.getValue();
            if (oldTables && oldTables.length > 0) {
                tables = tables.map(t => {
                    for (let i = 0; i < oldTables.length; i++) {
                        if (oldTables[i].id === t.id) {
                            t.newOrder = oldTables[i].newOrder;
                            return t;
                        }
                    }
                });
            }
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

    onUpdateNewOrderTable(table: ITable, orderId: string, newOrder: string) {
        table.id = table._id;
        let tables = this._tables.getValue();
        tables = tables.map(t => {
            if (t.id === table.id) {
                t.newOrder = newOrder;
                t.orderId = orderId;
            }
            return t;
        });
        this._tables.next(tables);
    }
}
