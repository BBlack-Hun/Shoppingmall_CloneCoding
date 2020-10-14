import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import {ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { Hero } from '../hero';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: string;
  detail: string[];
  user_id:string;
  likeuser: string[];
  menustat: string="none";
  loginbtnActive: string = "flex";
  dashActive: string = "none";

  constructor(
    private data:DataService,
    private route:ActivatedRoute,
    private router:Router,
    private login:LoginService,
    private jwtHelper:JwtHelperService,
  ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
   }

  ngOnInit() {
    this.getDetail()
    this.loginChcker()
  }

  getDetail() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.data.getdetail(this.id).subscribe(
      response => {
        this.detail = response
        //console.log(response)
      }
    )
    this.user_id = this.jwtHelper.decodeToken(this.login.getToken())['user_id']
  }

  recommand(){
    if(!this.login.getToken()){
      this.router.navigate(['login'])
    }
    else{
      this.data.recommand(this.id).subscribe(
        response => {
          this.getDetail()
        },
        response => alert("다시 시도해주세요")
      )
    }
  }
  menuclick(){
    if(this.menustat=="none"){
      this.menustat = "block"
    }
    else {
      this.menustat = "none"
    }
  }
loginChcker() {
  if (this.login.getToken()){
    this.dashActive = "flex";
    this.loginbtnActive = "none";
  }
  else {
    this.dashActive = "none";
    this.loginbtnActive = "flex";
  }
}

}
