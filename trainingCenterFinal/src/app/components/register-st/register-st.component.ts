import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/Model/student';
import {StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-st',
  templateUrl: './register-st.component.html',
  styleUrls: ['./register-st.component.css']
})
export class RegisterStComponent implements OnInit {

  constructor(private studentService: StudentService, private router:Router ) { }

  ngOnInit() {
  }

 createS(f:NgForm){

  let s = { name: f.value.name, lastname: f.value.lastname, email: f.value.email, password: f.value.password,studentImage:f.value.studentImage ,courses:f.value.courses };
  console.log(s);
  this.studentService.createStService(s).subscribe(
    (data)=> {
    console.log('student register correct');

  }
  )

 }


 onClick(): void{ 
  this.router.navigate(['/loginS'])
}


}
