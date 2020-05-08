import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addUser(f:NgForm){
    console.log(f);
    let user = new User(f.value.name, f.value.lastname, f.value.email, f.value.password);
    this.userService.createUserService(user).subscribe(
      (data)=>{
        console.log('data:'+ data);
        console.log('test');
      }
    )

  } 

} 
