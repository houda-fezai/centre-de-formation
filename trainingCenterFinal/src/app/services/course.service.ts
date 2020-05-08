import { Injectable } from '@angular/core';
import { Course } from 'src/app/Model/course';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  isAuth = false;
  urlApi = "http://localhost:3000/courses";
  
  constructor( private http: HttpClient, router: Router ) { }

 addCourse(c:Course):Observable<any>{
   const headers = new HttpHeaders ({'content-type': 'application/json'});
   const options = { headers : headers};
   console.log(JSON.stringify(c))

  return this.http.post(this.urlApi, JSON.stringify(c), options);

 }

 getCourseService():Observable<any>{

  const headers = new HttpHeaders({'content-type' : 'application/json'});
  let options = { headers:  headers};
   return this.http.get<Course>(this.urlApi, options);

 }

 getCourseById(id:string):Observable<any>{
   console.log('get corsees', id);
   return this.http.get<Course>(this.urlApi + '/' + id);

 }

 editCourseService(id, c:Course):Observable<any>{
   const headers = new HttpHeaders({'content-type': 'application/json'});
   let options = { headers: headers };
   return this.http.put(this.urlApi + '/updateById/' + id , JSON.stringify(c), options );

 }


 deleteById(id:number){
   
   const headers = new HttpHeaders({'content-type': 'application/json' });
   let options = { headers: headers};
   return this.http.delete(this.urlApi+'/'+id, options).subscribe(
     result => location.reload(),
     err => console.log(err),
   );
 }

}
