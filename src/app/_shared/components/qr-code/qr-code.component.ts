import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  @Input() stringQrCode:string;
  @Input() width:number;
  constructor() { }

  ngOnInit() {
  }

}
