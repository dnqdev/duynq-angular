import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-icon',
  templateUrl: './choose-icon.component.html',
  styleUrls: ['./choose-icon.component.scss']
})
export class ChooseIconComponent implements OnInit {
  @Input() srcImage:any;
  @Output() checkChooseIcon=  new EventEmitter<any>();
  dataImage = [
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg',
    'assets/images/svg/home.svg',
    'assets/images/svg/clock.svg',
    'assets/images/svg/calendar.svg'
  ]
  constructor() { }

  ngOnInit() {
    console.log("srcImage",this.srcImage);
  }

  chooseIcon(item){
    let dataEmit = {item};
    this.checkChooseIcon.emit(dataEmit);
  }

}
