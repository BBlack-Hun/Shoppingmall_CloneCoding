import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private Login:LoginService
  ) { }

  ngOnInit(): void {
  }

  login(username, password) {
    const credential = {email:username.value, password: password.value}
    this.Login.obtain_token(credential)
    .subscribe(
      response=> alert("로그인완료!"),
      response=> alert("다시 시도해주세요.")
    )
  }

}
