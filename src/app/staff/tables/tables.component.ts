import { Component, OnInit } from '@angular/core';
import { TableState } from '../providers/table.state';
import { ITable } from '../../models/ITable';
import { Router } from '@angular/router';
import { SocketService } from '../../providers/socket.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tables: ITable[] = [];
  constructor(private tableState: TableState,
    private router: Router,
    private socketService: SocketService) { }

  ngOnInit() {
    this.tableState.tables.subscribe(tables => {
      this.tables = tables;
      // console.log(this.tables);
    });
    this.tableState.getTables();
  }
  viewTable(table: ITable) {
    if (table.id && table.status === 'serving') {
      console.log('dis me');
      this.router.navigate(['staff', 'table', table.id]);
      table.newOrder = '';
      if (table.support) {
        table.support = false;
        table.checkout = false;
        this.socketService.tableSupport(table);
        this.socketService.tableCheckout(table);
      }
    }
    console.log(this.tables);
  }

  logout() {
    this.router.navigate(['login']);
  }
}
