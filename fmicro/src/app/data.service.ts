import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http:HttpClient,
    private login:LoginService,
    private router:Router,
    private jwtHelper:JwtHelperService,

  ) { }

  getRealestate():Observable<string[]>{
    return this.http.get<string[]>('/api/realestate/')
  }

  getlist(category):Observable<string[]>{
    return this.http.get<string[]>('/api/realestate/'+category)
  }

  getdetail(id):Observable<string[]>{
    return this.http.get<string[]>('/api/realestate/'+id)
  }

  recommand(id):Observable<string>{
    const body = {
      username:this.jwtHelper.decodeToken(this.login.getToken())['username']
    }
    return this.http.post<string>('/api/realestate/' + id + '/like/', body,
    {headers: {Authorization: "JWT "+ this.login.getToken()}})
  }

  getMessage():Observable<string[]>{
    const username = this.jwtHelper.decodeToken(this.login.getToken())['username']

    return this.http.get<string[]>('/api/message/get/',
    {headers: {
      Authorization: "JWT" + this.login.getToken(),
      Username: username
      }
    })
  }

  getRecentMessage():Observable<string[]>{
    const username = this.jwtHelper.decodeToken(this.login.getToken())['username']

    return this.http.get<string[]>('/api/message/recent/',
    {headers: {
      Authorization: "JWT" + this.login.getToken(),
      Username: username
      }
    })
  }
}