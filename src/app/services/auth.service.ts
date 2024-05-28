import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated :boolean=false;
  roles:any;
  username:any;
  accessToken!:any;
   constructor(private http:HttpClient,private router:Router) { }
  public login(username:string,password:string){
    let options={ headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")}
    let params=new HttpParams()
    .set("username",username).set("password",password);
    return this.http.post("http://localhost:8021/auth/login",params,options);
}
public loadProfile(data: any) {
  this.accessToken=data["access-token"];
   let decodeJwt:any=jwtDecode(this.accessToken);
   this.username=decodeJwt.sub;
   this.roles=decodeJwt.scope;
   this.isAuthenticated=true;
   window.localStorage.setItem("jwt-token",this.accessToken);
}
logout() {
  this.isAuthenticated=false;
  this.accessToken=undefined;
  this.username=undefined;
  this.roles=undefined;
  window.localStorage.removeItem("access-token");
  this.router.navigateByUrl("/login")
}
loadJwtTokenFromLocalStorage() {
  let token= window.localStorage.getItem("jwt-token");
  if(token){
    this.loadProfile({"access-token":token});
    this.router.navigateByUrl("/admin/customers");
  }
}
}