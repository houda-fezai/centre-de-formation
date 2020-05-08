import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { Course } from 'src/app/Model/course';
import { Student } from 'src/app/Model/student';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  id: string;
  
  course: Array<Course> = [];
  courSession :String;
  
  studenSession: string;
   url:any;
  image='http://localhost:3000/';
  imgCourse:any
  constructor( private courseService:CourseService,private studentService: StudentService, private activedRoute: ActivatedRoute, private router: Router ) {
    
   }

  ngOnInit() {

    this.id = this.activedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourseById(this.id).subscribe(
      (data)=> {
        this.course = data;
         this.url=data.courseImage;
        console.log('img',this.url)
       this.imgCourse = this.image+this.url;

         sessionStorage.setItem('courseTitle',data.title);
         sessionStorage.setItem('coursedescription',data.description);
         this.courSession = sessionStorage.getItem('courseTitle');
         
        console.log('coursedetail',this.course)
      }
    )

    this.studenSession = sessionStorage.getItem('studentid');
    console.log('idstudent',this.studenSession);

  
  }
  myFunc() {
    var num1 = ((document.getElementById("exchageRateDate") as HTMLInputElement).value);
    console.log(num1);
    sessionStorage.setItem('courseregister', num1);
    
}
   
editSt(f:NgForm){
  let c = new Course (f.value.title, f.value.description) 
  let s = new Student (f.value.name,f.value.lastname, f.value.email ,f.value.password,f.value.studentImage, c );
  this.studentService.editStService(this.studenSession,s).subscribe(
    (data)=>{

      console.log(data);
     //this.router.navigate(['/courses/'])

  })
}

}
