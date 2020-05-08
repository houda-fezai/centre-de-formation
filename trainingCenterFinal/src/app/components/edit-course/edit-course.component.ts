import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
   id: string;
   course: Array<Course> =[];
   
  constructor(private courseService: CourseService , private activatedRoute:ActivatedRoute, private router: Router ) { }

  ngOnInit() {
   this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('thisid', this.id)
    this.courseService.getCourseById(this.id).subscribe(
      (data)=>{
        this.course  = data;
        console.log('course', this.course)
      }
      )
  
  }



  editCourse(f: NgForm){
    let c = new Course (f.value.title, f.value.description);
    this.courseService.editCourseService(this.id,c).subscribe(
      (data)=>{

        console.log(data);
        this.router.navigate(['/courses/'])

    })
  }

}
