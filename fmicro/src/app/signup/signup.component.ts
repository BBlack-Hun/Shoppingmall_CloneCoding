import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private Login:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  signup(username, nickname, password, passwordcheck){
    if(password.value == passwordcheck.value){
      const signupinfo = {username: username.value, password: password.value, nickname: nickname.value}
      this.Login.signup(signupinfo).subscribe(
        response =>{
          if (response=="email Error"){
            alert("이미 가입된 이메일입니다.")
          }
          else {
            alert("가입완료 되었습니다")
            this.router.navigate(['login'])
          }
        }
      )
    }
    else{
      alert("입력된 두 비밀번호가 일치하지 않습니다.")
    }
  }

}
