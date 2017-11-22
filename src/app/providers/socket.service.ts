import { OrderState as OrderState2 } from './../kitchen/providers/order.state';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { OrderState } from '../customer/providers/order.state';
import { IOrder } from '../models/IOrder';
import { ITable } from '../models/ITable';
import { TableState } from '../kitchen/providers/table.state';

@Injectable()
export class SocketService {
    private url = environment.apiUrl;
    private socket;
    constructor(private orderState: OrderState, private tableStateKitchen: TableState, private orderStateKitchen: OrderState2) {
    }
    init(token, callback) {
        this.socket = io(this.url, { query: `token=${token}` });
        this.socket.open();
        this.socket.on('connect', () => {
            console.log(this.socket.id + ' connected');
            callback();
            this.socket.on('disconnect', (reason) => {
                console.log('disconnect', reason);
            });
            this.socket.on('reconnect', (attemptNumber) => {
                console.log('reconnect', attemptNumber);
            });
            this.onUpdateTable();
            this.onUpdateOrder();
            this.onOrderCheckOut();
        });
    }
    onUpdateOrder() {
        this.socket.on('order:update', (order: IOrder) => {
            console.log('order:update', order);
            this.orderState.onUpdateOrder(order);
            this.orderStateKitchen.updateOrder(order);
            this.tableStateKitchen.onUpdateNewOrderTable(order.table, order.id);
        });
    }
    updateOrder(order: IOrder) {
        this.socket.emit('order:update', order);
    }

    onUpdateTable() {
        this.socket.on('table:update', (table: ITable) => {
            console.log('table:update', table);
            this.tableStateKitchen.onUpdateTable(table);
        });
    }
    updateTable(table: ITable) {
        this.socket.emit('table:update', table);
    }

    onOrderCheckOut() {
        this.socket.on('order:checkout', (order: IOrder) => {
            console.log('order:checkout', order);
            this.orderStateKitchen.updateOrder(order);
            this.tableStateKitchen.onUpdateTable(order.table);
        });
    }

    orderCheckout(order: IOrder) {
        this.socket.emit('order:checkout', order);
    }
}
