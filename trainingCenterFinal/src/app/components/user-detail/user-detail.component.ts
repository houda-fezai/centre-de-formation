import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/Model/student';

import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/Model/teacher';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  users: Array<User> =[];
  sessionValue: string;
  students: Array<Student> =[];
  teachers: Array<Teacher> =[];
   show= false; 
    showTr= true; 

  constructor(private userService: UserService, private studentService: StudentService, private teacherService: TeacherService, private router: Router  ) {
    
   }

  ngOnInit() {
     this.sessionValue = sessionStorage.getItem("userDe");


    this.studentService.getStudentService().subscribe(
      (data)=>{
        this.students =  data;
        console.log("student",this.students);
      }
    )

    this.teacherService. getTrService().subscribe(
      (data)=>{
        this.teachers =  data;
        console.log("tr",this.teachers);
      }
    )
  }

  formtion(){
     this.router.navigate(['courses'])
  }

 ajoutFormtion(){
   this.router.navigate(['addCourse'])

 }

 toggleShow(){
  this.show= !this.show;
}

showTeacher(){
  this.showTr = true;
  this.show = false;
}

}
