import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  datalist: string[];
  category: string;

  constructor(
    private route:ActivatedRoute,
    private data:DataService
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.category = this.route.snapshot.paramMap.get('category')
    this.data.getlist(this.category).subscribe(
      response => this.datalist = response
    )
  }

}
