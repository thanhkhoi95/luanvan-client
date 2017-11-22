import { MatListModule } from '@angular/material/list';
import { OrderState } from './providers/order.state';
import { KitchenGuardService } from './providers/kitchen.guard';
import { CommonModule } from '@angular/common';
import { KitchenComponent } from './kitchen.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { KitchenRoutingModule } from './kitchen.routing';
import { TablesComponent } from './tables/tables.component';
import { TableState } from './providers/table.state';
import { AuthState } from './providers/auth.state';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };
@NgModule({
    imports: [KitchenRoutingModule,
        CommonModule,
        FormsModule,
        MatListModule,
        MatCheckboxModule,
        PerfectScrollbarModule
    ],
    exports: [],
    declarations: [KitchenComponent, OrdersComponent, LoginComponent, TablesComponent],
    providers: [
        TableState,
        AuthState,
        OrderState,
        KitchenGuardService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})
export class KitchenModule { }
