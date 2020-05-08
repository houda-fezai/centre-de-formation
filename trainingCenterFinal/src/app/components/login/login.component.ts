import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Model/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 id: string;
 user: User;
 connect:string;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
   

  }

  login(f: NgForm) {
    let u = { email: f.value.email, password: f.value.password };
    return this.userService.loginService(u).subscribe(obj=>{
      console.log("--------------------------"+obj.tok);
  
      window.localStorage.setItem('token',obj.tok);
      console.log(obj.expiresIn)
       console.log('users', obj.useN)
       sessionStorage.setItem('userDe', obj.useN);
       sessionStorage.setItem('userRole', obj.roles)
      this.userService.setTimer(obj.expiresIn);
  
      this.router.navigate(['/userDetail'])
    }
    );
  }

}
