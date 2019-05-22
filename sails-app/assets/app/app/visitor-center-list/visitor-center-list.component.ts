import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visitor-center-list',
  templateUrl: './visitor-center-list.component.html',
  styleUrls: ['./visitor-center-list.component.css']
})
export class VisitorCenterListComponent implements OnInit {
  @Input() centers: object[];

  constructor() { }

  ngOnInit() {
  }

}
