import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service'

@Injectable({
  providedIn: 'root'
})
export class AuthStGuard implements CanActivate {
  constructor(private studentService: StudentService, private router: Router){}
  canActivate(): boolean{
    if(this.studentService.loggedIn()){
      return true
    }else {
      this.router.navigate(['loginS'])
      return false
    }

  } 
  
}
