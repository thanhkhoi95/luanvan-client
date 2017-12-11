import { MatListModule } from '@angular/material/list';
import { OrderState } from './providers/order.state';
import { StaffGuardService } from './providers/staff.guard';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { StaffRoutingModule } from './staff.routing';
import { TablesComponent } from './tables/tables.component';
import { TableState } from './providers/table.state';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderComponent } from './order/order.component';
import { FoodState } from './providers/food.state';
import { FormsModule } from '@angular/forms';
import { BillComponent } from './bill/bill.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
@NgModule({
    imports: [StaffRoutingModule,
        CommonModule,
        MatListModule,
        MatCheckboxModule,
        FormsModule,
        PerfectScrollbarModule
    ],
    exports: [],
    declarations: [
        StaffComponent,
        TableComponent,
        TablesComponent,
        OrderComponent,
        BillComponent
    ],
    providers: [
        TableState,
        OrderState,
        StaffGuardService,
        FoodState,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class StaffModule { }
