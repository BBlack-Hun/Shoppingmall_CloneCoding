import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import {ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: string;
  detail: string[];

  constructor(
    private data:DataService,
    private route:ActivatedRoute,
    private router:Router,
  ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
   }

  ngOnInit() {
    this.getDetail()
  }

  getDetail() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.data.getdetail(this.id).subscribe(
      response => this.detail = response
    )
  }
}
