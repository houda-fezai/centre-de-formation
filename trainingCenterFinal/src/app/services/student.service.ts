import { Injectable } from '@angular/core';
import { Student } from 'src/app/Model/student';
import { Observable } from 'rxjs';
import {  HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  isAuth = false;
  urlApi = "http://localhost:3000/student"; 
  loginUrl = "http://localhost:3000/loginS";
  tokenTimer;

  constructor(private http: HttpClient , private router: Router ) { }

 

 loginStService(s):Observable<{tok:string, expiresIn:number,Stid:string, role:string}>{
  this.isAuth = true;
   const headers = new HttpHeaders({'content-type': 'application/json'});
   const options = {headers: headers};
   return this.http.post<{tok:string, expiresIn:number,Stid:string, role:string}>(this.loginUrl, s, options);
 }

 setTimer(expiresIn){
  
   this.tokenTimer = setTimeout(()=>{
     this.logoutS();
   }, expiresIn * 1000
   )
 }

 logoutS(){

  localStorage.removeItem('token');
  sessionStorage.clear()
  clearTimeout(this.tokenTimer);
  this.isAuth = false;
  this.router.navigate(['/loginS']);

 }
 loggedIn(){
  return !!localStorage.getItem('token')
}

createStService(s:Student):Observable<any>{
   const headers = new HttpHeaders({'content-type': 'application/json'});
   const options = {headers:headers};

  return this.http.post(this.urlApi, JSON.stringify(s), options);

 }

 getStById(id:string):Observable<any>{
  console.log('get student', id);
  return this.http.get<Student>(this.urlApi + '/' + id);

}

 editStService(id, c:Student):Observable<any>{
   const headers = new HttpHeaders({'content-type': 'application/json'});
   let options = { headers: headers };
   return this.http.put(this.urlApi + '/updateById/' + id  ,JSON.stringify(c), options );

 }
 getStudentService():Observable<any>{
 
  const headers = new HttpHeaders({'content-type' : 'application/json'});
  let options = { headers:  headers};
   return this.http.get<Student>(this.urlApi, options);

 }

}
