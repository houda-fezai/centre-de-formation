import { Component, OnInit } from '@angular/core';
import {TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/Model/teacher';
import {Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {HttpHeaders, HttpClient } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  id: string;
  teacher: Array<Teacher> = [];
  show =  false;
  selectedFile= null;
  url:any;
  image='http://localhost:3000/';
  imgTr:any
  constructor( private httpClient: HttpClient, private teacherService: TeacherService, private activatedRoute:ActivatedRoute, private router: Router ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.teacherService.getTrById(this.id).subscribe(
      (data)=> {
        this.teacher = data;
         this.url=data.teacherImage;
         console.log(this.url)
       this.imgTr = this.image+this.url;

      }
    )


  }

  toggleShow(){
    this.show = !this.show;
  }

  onFileSelected(event){
    this.selectedFile =event.target.files[0];
    console.log(this.selectedFile.name);
  }

    onSubmit(){
  let fd = new FormData();
  fd.append('teacherImage',this.selectedFile);

  
  }


}
