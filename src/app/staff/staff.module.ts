import { MatListModule } from '@angular/material/list';
import { OrderState } from './providers/order.state';
import { StaffGuardService } from './providers/staff.guard';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders/orders.component';
import { StaffRoutingModule } from './staff.routing';
import { TablesComponent } from './tables/tables.component';
import { TableState } from './providers/table.state';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
@NgModule({
    imports: [StaffRoutingModule,
        CommonModule,
        MatListModule,
        MatCheckboxModule,
        PerfectScrollbarModule
    ],
    exports: [],
    declarations: [StaffComponent, OrdersComponent, TablesComponent],
    providers: [
        TableState,
        OrderState,
        StaffGuardService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class StaffModule { }
