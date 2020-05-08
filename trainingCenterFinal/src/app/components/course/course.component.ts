import { Component, OnInit } from '@angular/core';
import { CourseService  } from 'src/app/services/course.service';
import { Course } from 'src/app/Model/course';
import {UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Array<Course> =[];
  sessionValuee: string;
  sessionRole: string;
  
  constructor( private courseService: CourseService, private userService: UserService, private router: Router  ) { }

  ngOnInit() {
    this.courseService.getCourseService().subscribe(
      (data)=>{
        this.courses =  data;
        console.log(this.courses);
       
         this.sessionValuee = sessionStorage.getItem("userDe");
         this.sessionRole = sessionStorage.getItem("userRole");
         // console.log(this.sessionValuee);
      }
    
    )
  }


  


}
