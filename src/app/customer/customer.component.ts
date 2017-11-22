import { LocalStorageService } from 'angular-2-local-storage';
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../providers/socket.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private localStorage: LocalStorageService,
    private socketService: SocketService) { }

  ngOnInit() {
    const token = this.localStorage.get('token');
    if (token) {
      this.socketService.init(token, () => {

      });
    }
  }

}
