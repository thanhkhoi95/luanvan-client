import { StaffGuardService } from './providers/staff.guard';
import { StaffComponent } from './staff.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { TablesComponent } from './tables/tables.component';
import { OrderComponent } from './order/order.component';
import { BillComponent } from './bill/bill.component';

const routes: Routes = [
    {
        path: 'staff', component: StaffComponent,
        canActivate: [StaffGuardService], children: [
            { path: 'tables', component: TablesComponent },
            { path: 'table/:id', component: TableComponent },
            { path: 'table/:tableId/:orderId', component: OrderComponent },
            { path: 'bill/:id', component: BillComponent },
            { path: '', redirectTo: 'tables', pathMatch: 'full' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule { }

export const routedComponents = [StaffComponent];
