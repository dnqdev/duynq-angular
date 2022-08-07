import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(private notification: NzNotificationService) { }

  success(title: string = '', content: string = '') {
    this.notification.success(
      title,
      content,
      {
        nzDuration: 3000,
        nzClass: 'so-notification so-notification-success'
      });
  }

  error(title: string = '', content: string = '') {
    this.notification.create(
      'error',
      title,
      content,
      {
        nzDuration: 5000,
        nzClass: 'so-notification so-notification-err',
    });
  }

  warning(title: string = '', content: string = '') {
    this.notification.create('warning', title, content, { nzDuration: 5000, nzClass: 'so-notification so-notification-warming' });
  }
}


