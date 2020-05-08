import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Teacher } from 'src/app/Model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-register-teach',
  templateUrl: './register-teach.component.html',
  styleUrls: ['./register-teach.component.css']
})
export class RegisterTeachComponent implements OnInit {

  constructor( private teacherService: TeacherService, private router: Router ) { }

  ngOnInit() {
  }

  addTeacher(f:NgForm){
    console.log(f);
    let teacher = new Teacher (f.value.name, f.value.lastname, f.value.speciality, f.value.email, f.value.password);
    this.teacherService.createTeacherService(teacher).subscribe(
      (data)=>{
        console.log(data);
        console.log('test correct');
      }
    )
  }

  onClick(): void{ 
  this.router.navigate(['/loginTr'])
}

}
