import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private Login:LoginService,
    private location:Location,
  ) { }

  ngOnInit(): void {
  }

  login(username, password) {
    const credential = {email: username.value, password: password.value}
    this.Login.obtain_token(credential)
    .subscribe(
      response => {
        console.log(username.value, password.value),
        this.location.back()
      },
      response => alert("다시 시도해주세요.")
    )
  }

}
