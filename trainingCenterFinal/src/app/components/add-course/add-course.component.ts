import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor( private courseService: CourseService ) { }

  ngOnInit() {
  }

addCourses(f:NgForm){
  let c = {title: f.value.title, description: f.value.description, courseImage: f.value.courseImage};
  console.log( c) ;
  this.courseService.addCourse(c).subscribe(
    (data)=>{
      console.log('course added');
    }
  )
}

}
