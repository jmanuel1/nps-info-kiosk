import {
  Component,
  OnInit,
  Input,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-nps-symbol',
  templateUrl: './nps-symbol.component.html',
  styleUrls: ['./nps-symbol.component.css']
})
export class NpsSymbolComponent implements OnInit, AfterViewInit {
  @Input() symbolName: string;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  setColor(svg: SVGElement): SVGElement {
    const paths = svg.querySelectorAll('path');
    paths.forEach((path) => {
      // set fill directly on path to make sure it's the right color
      path.style.fill = 'currentColor';
    });
    return svg;
  }

}
