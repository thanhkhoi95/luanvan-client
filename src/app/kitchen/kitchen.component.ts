import { LocalStorageService } from 'angular-2-local-storage';
import { SocketService } from './../providers/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  constructor(private socketService: SocketService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    const token = this.localStorage.get('token');
    this.socketService.init(token, () => {
    });
  }

}
