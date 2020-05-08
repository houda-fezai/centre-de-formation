import { Injectable } from '@angular/core';
import { Teacher } from 'src/app/Model/teacher';
import { Observable, from } from 'rxjs';
import {  HttpHeaders , HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  isAuth = false;
  urlApi = "http://localhost:3000/teachers"; 
  loginUrl = "http://localhost:3000/loginTr";
  tokenTimer;

  constructor(private http:HttpClient, private router: Router) { }

  createTeacherService(t:Teacher):Observable<any>{
    const headers = new HttpHeaders({'content-type': 'application/json'});
    let options = { headers: headers};
    console.log(JSON.stringify(t));
    return this.http.post(this.urlApi, JSON.stringify(t),options);
  }

  loginTrService(t):Observable<{tok: string, expiresIn: number, TrId:string, role:string}>{
    this.isAuth = true;
    const headers = new HttpHeaders({'content-type': 'application/json'});
    let options = {headers : headers};

    return this.http.post<{tok:string, expiresIn:number,TrId:string,role:string}>(this.loginUrl, t ,options);

  }

     setTimer(expiresIn){
       this.tokenTimer = setTimeout(() => {

        this.logout();
         
       }, expiresIn * 1000);

     }
     


  logout(){
    localStorage.removeItem('token');
    sessionStorage.clear()
    clearTimeout(this.tokenTimer);
    this.isAuth = false;

    this.router.navigate(['/loginTr']);

  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getTrService():Observable<any>{
 
    const headers = new HttpHeaders({'content-type' : 'application/json'});
    let options = { headers:  headers};
     return this.http.get<Teacher>(this.urlApi, options);
  
   }

 getTrById(id:string):Observable<any>{
  console.log('get teacher', id);
  return this.http.get<Teacher>(this.urlApi + '/' + id);

}

}

