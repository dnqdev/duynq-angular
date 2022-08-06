import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-week-select2',
  templateUrl: './week-select2.component.html',
  styleUrls: ['./week-select2.component.scss']
})
export class WeekSelect2Component implements OnInit {
  @Input() weekCurrentId: any;
  @Input() weekList: any;
  @Input() textLabel: string = '';

  constructor() { }

  ngOnInit() {
    
  }

}
