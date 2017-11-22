import { ITable } from './../models/ITable';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class TableHttpService {
    constructor(private httpClient: HttpClient) { }

    getTables() {
        return this.httpClient.get('api/table/getallactive').map(data => {
            const tables = data['data'].tables as ITable[];
            tables.map(table => {
                table.status = table.status || 'available';
            });
            return tables;
        });
    }

    loginTable(tableName: string): Observable<string> {
        return this.httpClient.post('/api/auth/tablelogin', { name: tableName }).map(data => {
            return data['data']['token'] as string;
        });
    }

    updateStatus(id: string, status: string): Observable<ITable> {
        return this.httpClient.put(`/api/table/updatestatus?id=${id}`, { status: status }).map(data => {
            return data['data'].table as ITable;
        });
    }
}
