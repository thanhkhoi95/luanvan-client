import { OrderState } from './providers/order.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OrderComponent } from './order/order.component';
import { BillComponent } from './bill/bill.component';
import { CustomerRoutingModule } from './customer.routing';
import { MatListModule } from '@angular/material/list';
import { FoodState } from './providers/food.state';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TableState } from './providers/table.state';
import { OrderGuardService } from './providers/guard-service/order.guard';
import { BillGuardService } from './providers/guard-service/bill.guard';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomerRoutingModule,
        HttpClientModule,
        MatListModule,
        MatIconModule,
        PerfectScrollbarModule
    ],
    exports: [],
    declarations: [
        CustomerComponent,
        WelcomeComponent,
        OrderComponent,
        BillComponent],
    providers: [
        FoodState,
        TableState,
        OrderState,
        OrderGuardService,
        BillGuardService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }],
})
export class CustomerModule { }
