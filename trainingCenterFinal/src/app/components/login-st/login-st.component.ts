import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/Model/student';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-st',
  templateUrl: './login-st.component.html',
  styleUrls: ['./login-st.component.css']
})
export class LoginStComponent implements OnInit {

  constructor( private studentservice: StudentService, private router: Router) { }

  ngOnInit() {
  }

 loginSt(f:NgForm){

  let student = {email: f.value.email, password: f.value.password }
  return this.studentservice.loginStService(student).subscribe(obj =>{
    window.localStorage.setItem('token',obj.tok);
    this.studentservice.setTimer(obj.expiresIn);
    //console.log('studentid',obj.Stid);
    sessionStorage.setItem('studentid',obj.Stid);
    sessionStorage.setItem('roleStudent',obj.role);
    this.router.navigate(['/student/'+obj.Stid ]);
  }
  )
 
}

onClick(): void{ 
  this.router.navigate(['/registerS'])
}

}
