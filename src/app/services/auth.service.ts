import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAuthenticated :boolean=false;
  roles:any;
  username:any;
  accessToken!:string;
   constructor(private http:HttpClient) { }
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
}
}