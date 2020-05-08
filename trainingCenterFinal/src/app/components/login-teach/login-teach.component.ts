import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/Model/teacher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-teach',
  templateUrl: './login-teach.component.html',
  styleUrls: ['./login-teach.component.css']
})
export class LoginTeachComponent implements OnInit {

  constructor(private teacherService:TeacherService, private router: Router ) { }

  ngOnInit() {
  }

  loginTr(f:NgForm){
    let t = { email: f.value.email, password: f.value.password };
    console.log('teacher', t)
    return this.teacherService.loginTrService(t).subscribe(obj=> {
          window.localStorage.setItem('token',obj.tok);
         
          this.teacherService.setTimer(obj.expiresIn);
          console.log('login teacher',obj.TrId);
          sessionStorage.setItem('teacherRole', obj.role)
          sessionStorage.setItem('idTeacher', obj.TrId)
          this.router.navigate(['/teacher/'+obj.TrId]);

    }
      )


  }


  onClick(): void{ 
    this.router.navigate(['/registerTr'])
  }

}
