import { Component, OnInit } from '@angular/core';
import {DataService } from '../data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: string[];

  constructor(
    private data:DataService
  ) { }

  ngOnInit(): void {
    this.data.getRecentMessage().subscribe(
      response => {
        console.log(response)
        this.message = response;
      }
    )
  }

}
