import { Component, OnInit } from '@angular/core';
import { TableState } from '../providers/table.state';
import { ITable } from '../../models/ITable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tables: ITable[] = [];
  constructor(private tableState: TableState, private router: Router) { }

  ngOnInit() {
    this.tableState.tables.subscribe(tables => {
      this.tables = tables;
      // console.log(this.tables);
    });
    this.tableState.getTables();
  }
  viewOrder(table: ITable) {
    if (table.id && table.status === 'serving') {
      table.newOrder = '';
      this.router.navigate(['kitchen', 'order', table.id]);
    }
  }

  logout() {
    this.router.navigate(['login']);
  }
}
