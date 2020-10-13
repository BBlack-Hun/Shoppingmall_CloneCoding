import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt'
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token_name :string = "jwt_token"

  constructor(
    private http:HttpClient,
    private jwthelper:JwtHelperService,
  ) { }

  // 로그인 시 아이디와 비밀번호를 백앤드로 전송해서, 토큰을 받아옴.
  obtain_token(credential){
    return this.http.post<string>('api-token-auth/', credential)
      .pipe(tap(res => {
        this.setToken(res['token'])
      }
    ))
  }
  // obtain_token을 통해 받은 토큰을 로컬 저장소에 저장함.
  setToken(token){
    localStorage.setItem(this.token_name, token)
  }
  // setToken을 통해 저장된 토큰을 가져와서 사용
  getToken():string{
    return localStorage.getItem(this.token_name)
  }
  // 로컬 저장소에 저장된 토큰을 지움(로그아웃시 사용)
  removeToken():void{
    localStorage.removeItem(this.token_name)
  }
  // 로그아웃 버튼을 누르게 되면 removeToken함수 사용
  logout():void{
    this.removeToken()
  }
  // 토큰을 가져와서 isTokenExpired 실행(토큰이 만료 / 유효한지 검사)
  isAuthenicated():boolean{
    const token = this.getToken()
    return token ?! this.isTokenExpired(token):false
  }
  // 토큰이 만료 / 유효한지
  isTokenExpired(token:string):boolean{
    return this.jwthelper.isTokenExpired(token)
  }

  signup(signupinfo){
    return this.http.post<string>('api/signup/', signupinfo)
  }
}
