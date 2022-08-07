import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moments from "moment";
@Component({
  selector: 'app-single-date-picker',
  templateUrl: './single-date-picker.component.html',
  styleUrls: ['./single-date-picker.component.scss']
})
export class SingleDatePickerComponent implements OnInit {
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    showCancel: false,
    showClearButton: false,
    linkedCalendars: true,
    singleDatePicker: true,
    showWeekNumbers: true,
    showISOWeekNumbers: false,
    customRangeDirection: true,
    lockStartDate: false,
    closeOnAutoApply: true,
    timePicker: false,
    locale:{ applyLabel: 'Xong', format: 'DD/MM/YYYY' }
  };

  @Input() currentDate:string;
  @Input() timePicker:boolean;
  @Output() dataTimeOutput = new EventEmitter<any>();
  selected: any = { startDate: null, endDate: null };
  constructor() {}

  ngOnInit() {
    // this.selected.startDate = moments(Number(this.currentDate)*1000);
    // this.selected.endDate = moments(Number(this.currentDate)*1000);
    this.selected.startDate = this.currentDate;
    // this.selected.endDate = moments(Number(this.currentDate)*1000);
    this.options.timePicker = this.timePicker;
    if(this.timePicker){
      this.options.locale.format = 'hh:mm A DD/MM/YYYY'
    }
  }

  ngModelChange(event:any){
    let dataOutput = null;
    dataOutput = moments(event.startDate.$d).format('DD/MM/yyyy');
    this.dataTimeOutput.emit(dataOutput);
  }

}
