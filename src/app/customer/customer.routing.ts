import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { OrderComponent } from './order/order.component';
import { TableComponent } from './table/table.component';
import { BillComponent } from './bill/bill.component';
import { OrderGuardService } from './providers/guard-service/order.guard';
import { BillGuardService } from './providers/guard-service/bill.guard';


const routes: Routes = [
    {
        path: '', component: CustomerComponent, children: [
            {path: 'order/:id', component: OrderComponent, canActivate: [OrderGuardService]},
            {path: 'table', component: TableComponent, canActivate: [BillGuardService]},
            {path: 'bill', component: BillComponent, canActivate: [BillGuardService]},
            {path: 'welcome', component: WelcomeComponent},
            {path: '', redirectTo: 'welcome', pathMatch: 'full'}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }

export const routedComponents = [CustomerComponent];
