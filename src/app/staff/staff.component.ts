import { LocalStorageService } from 'angular-2-local-storage';
import { SocketService } from './../providers/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(private socketService: SocketService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    const token = this.localStorage.get('token');
    this.socketService.init(token, () => {
    });
  }

}
