import { OrderState as OrderStateKitchen } from './../kitchen/providers/order.state';
import { OrderState as OrderStateStaff } from './../staff/providers/order.state';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { OrderState as OrderStateCustomer } from '../customer/providers/order.state';
import { IOrder } from '../models/IOrder';
import { ITable } from '../models/ITable';
import { TableState as TableStateKitchen } from '../kitchen/providers/table.state';
import { TableState as TableStateStaff } from '../staff/providers/table.state';

@Injectable()
export class SocketService {
    private url = environment.apiUrl;
    private socket;
    constructor(private orderStateCustomer: OrderStateCustomer,
        private tableStateKitchen: TableStateKitchen,
        private orderStateKitchen: OrderStateKitchen,
        private orderStateStaff: OrderStateStaff,
        private tableStateStaff: TableStateStaff) { }

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
            this.onTableSupport();
        });
    }
    onUpdateOrder() {
        this.socket.on('order:update', (order: IOrder) => {
            console.log('order:update', order);
            this.orderStateCustomer.onUpdateOrder(order);
            this.orderStateKitchen.updateOrder(order);
            this.orderStateStaff.updateOrder(order);
            this.tableStateKitchen.onUpdateNewOrderTable(order.table, order.id, order['newOrder']);
            this.tableStateStaff.onUpdateNewOrderTable(order.table, order.id, order['newOrder']);
        });
    }
    updateOrder(order: IOrder) {
        console.log(order);
        this.socket.emit('order:update', order);
    }

    onUpdateTable() {
        this.socket.on('table:update', (table: ITable) => {
            console.log('table:update', table);
            this.tableStateKitchen.onUpdateTable(table);
            this.tableStateStaff.onUpdateTable(table);
        });
    }

    updateTable(table: ITable) {
        this.socket.emit('table:update', table);
    }

    onOrderCheckOut() {
        this.socket.on('order:checkout', (order: IOrder) => {
            console.log('order:checkout', order);
            this.orderStateKitchen.updateOrder(null);
            this.orderStateStaff.updateOrder(null);
            this.tableStateKitchen.onUpdateTable(order.table);
            this.tableStateStaff.onUpdateTable(order.table);
        });
    }

    orderCheckout(order: IOrder) {
        this.socket.emit('order:checkout', order);
    }

    onTableSupport() {
        this.socket.on('table:support', (table: ITable) => {
            console.log('table:support', table);
            this.tableStateStaff.onTableSupport(table);
        });
    }

    tableSupport(table: ITable) {
        this.socket.emit('table:support', table);
    }
}
