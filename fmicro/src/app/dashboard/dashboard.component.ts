import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MENU } from '../app.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedMenu:MENU;

  menu:MENU[] = [
    {name : "logout" , icon : "fas fa-sign-out-alt"},
    {name : "like" , icon : "fas fa-heart"},
    {name : "userinfo" , icon : "fas fa-user"},
    {name : "message" , icon : "fas fa-comments"},
  ]
  constructor(
    private router:Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  selectMenu(menu){
    this.selectedMenu = menu
  }

}
