import { ITable } from './../../models/ITable';
import { SocketService } from './../../providers/socket.service';
import { TableState } from './../providers/table.state';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  @ViewChild('input') private inputElementRef: ElementRef;
  constructor(private router: Router,
    private tableState: TableState,
    private localStorage: LocalStorageService,
    private socketService: SocketService) { }
  ngOnInit() {
    this.localStorage.clearAll();
  }

  ngAfterViewInit() {
    this.inputElementRef.nativeElement.focus();
  }

  onEnter(tableName: string) {
    this.tableState.login(tableName).subscribe((res: any) => {
      console.log(res);
      res.table._id = res.table.id;
      console.log(res.table);
      this.socketService.init(res.token, () => {
        this.socketService.updateTable(res.table);
      });
      this.router.navigate(['order']);
    });
  }
}
