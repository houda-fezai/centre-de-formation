import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  messages:Array<any> = [];
  constructor() { }

  setupSocketConnection(){
    this.socket = io(environment.SOCKET_ENDPOINT)

      this.socket.emit('my message', 'hello from angular');
    this.socket.on('my broadcast', (data)=>{
        console.log(data);
      this.messages.push(data);
      console.log(this.messages)

    })

  }


 sendMessage(message) {
    this.socket.emit('my message', message);
}
}
