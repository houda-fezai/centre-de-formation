import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TeacherService } from 'src/app/services/teacher.service';


@Injectable({
  providedIn: 'root'
})
export class AuthTrGuard implements CanActivate {
  constructor(private teacherService: TeacherService, private router: Router){}
  canActivate(): boolean{
    if(this.teacherService.loggedIn()){
      return true
    }else {
      this.router.navigate(['loginTr'])
      return false
    }

  } 
}
  

