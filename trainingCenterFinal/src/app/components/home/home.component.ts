import { Component, OnInit } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message:string;
  messagess:Array<any> = [];

  constructor(private socketService: SocketioService) { }

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  sendMessage() {
  this.socketService.sendMessage(this.message);
  this.message = '';
  
}


}
