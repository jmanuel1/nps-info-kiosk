import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-list-card',
  templateUrl: './title-list-card.component.html',
  styleUrls: ['./title-list-card.component.css']
})
export class TitleListCardComponent implements OnInit {
  @Input() list: { title: string }[];

  constructor() { }

  ngOnInit() {
  }

}
