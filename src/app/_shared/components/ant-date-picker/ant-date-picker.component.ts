import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ant-date-picker',
  templateUrl: './ant-date-picker.component.html',
  styleUrls: ['./ant-date-picker.component.scss']
})
export class AntDatePickerComponent implements OnInit {
  @Input() dateFormat: string;

  constructor() { }

  ngOnInit(): void {
  }

}
