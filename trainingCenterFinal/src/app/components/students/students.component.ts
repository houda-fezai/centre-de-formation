import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/Model/student';
import { Course } from 'src/app/Model/course';
import {  FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute }  from '@angular/router';
import { NgForm } from '@angular/forms';
import {  HttpHeaders, HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  id: string;
  student: Array<Student> = [];
  coursee : any;
  arrObj: any;
  url:any;
  image='http://localhost:3000/';
  img:any;
  show= false; 
  selectedFile= null;
  imgNode:any;

  constructor(private http: HttpClient, private studentService: StudentService,  private activedRoute: ActivatedRoute, private router: Router) { }

 

toggleShow(){
  this.show= !this.show;
}
  ngOnInit() {

    this.id = this.activedRoute.snapshot.paramMap.get('id');
    this.studentService.getStById(this.id).subscribe(
      (data)=> {
        this.student = data;
        this.coursee = data.courses
       this.url=data.studentImage;
       this.img = this.image+this.url;

      }
    )

  }


  onFileSelected(event){
    this.selectedFile =event.target.files[0];
    console.log(this.selectedFile.name);
  }


  onSubmit(){
  let fd = new FormData();
  fd.append('studentImage',this.selectedFile);

  this.http.put<any>('http://localhost:3000/student/updateByIdimg/'+this.activedRoute.snapshot.paramMap.get('id'),fd).subscribe(
    (res)=>console.log(res),
    (err)=> console.log(err)
  )
  }


 
  editStudent(f:NgForm){

    let c = new Course (f.value.title, f.value.description) 
    let s = new Student (f.value.name,f.value.lastname, f.value.email ,f.value.password,f.value.studentImage, c );
    this.studentService.editStService(this.id,s).subscribe(
      (data)=>{
  
        console.log(data);
       //this.router.navigate(['/courses/'])
  
    })
  }

  

}
