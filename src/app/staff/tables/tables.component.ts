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
  viewOrder(table: ITable) {
    if (table.id && table.status === 'serving') {
      this.router.navigate(['staff', 'order', table.id]);
      if (table.support) {
        table.support = false;
        this.socketService.tableSupport(table);
      }
    }
  }

  logout() {
    this.router.navigate(['login']);
  }
}
