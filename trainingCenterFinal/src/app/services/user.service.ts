import { Injectable } from '@angular/core';
import { User } from 'src/app/Model/User';
import { Observable } from 'rxjs';
import { HttpHeaders , HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuth = false;
  urlApi = "http://localhost:3000/users";
  loginUrl ="http://localhost:3000/login";
  tokenTimer;
 

  constructor(private http:HttpClient, private router: Router) { }

    loginService(u):Observable<{tok: string, expiresIn:number, useN:string, roles:string}> {
      this.isAuth = true;
     
      console.log('usern', u )
      const headers = new HttpHeaders({'content-type': 'application/json'});
      let options = {headers: headers};
      return this.http.post<{tok: string, expiresIn: number, useN:string, roles:string}>(this.loginUrl, u, options);
    }

    setTimer(expiresIn){
      this.tokenTimer = setTimeout(()=>{
        this.logout();
      }, expiresIn * 1000);
    }

    logout(){
      localStorage.removeItem('token');
      sessionStorage.clear()
      clearTimeout(this.tokenTimer);
      console.log('router:' + this.router);
      this.isAuth = false;
      this.router.navigate(['/loginUser']) ;

    }
   
    loggedIn(){
      return !!localStorage.getItem('token')
    }
 

  createUserService(u:User):Observable<any>{
    const headers = new HttpHeaders ({'content-type': 'application/json'});
    let options = {
      headers : headers
    };
    console.log(JSON.stringify(u));
    return this.http.post(this.urlApi, JSON.stringify(u),options);
    
  }

getUsersService():Observable<any>{
 
  const headers = new HttpHeaders({'content-type' : 'application/json'});
  let options = { headers:  headers};
   return this.http.get<User>(this.urlApi, options);

 }


  getUserById(id:string):Observable<any>{
   console.log('get user', id);
   return this.http.get<User>(this.urlApi + '/' + id);

 }

  
}
