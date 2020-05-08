import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  title = 'trainingCenterFinal';
  sessionRole: string;
  sessionStudent: string;
  sessionTeacher:string;
  sessionIdS:string;
  sessionTrId:string;
  //message:string;
  //messagess:Array<any> = [];
  constructor(private userService: UserService){}

 ngOnInit(){
   this.sessionRole = sessionStorage.getItem('userRole');
   this.sessionStudent = sessionStorage.getItem('roleStudent');
   this.sessionTeacher = sessionStorage.getItem('teacherRole')
   this.sessionIdS = sessionStorage.getItem('studentid')
   this.sessionTrId = sessionStorage.getItem('idTeacher')

   
  
  
 }

 
}
