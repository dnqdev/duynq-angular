import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscriber } from 'rxjs';
import { ShowMessageService } from './show-message.service';

@Injectable({
  providedIn: 'root',
})
export class ListenFirebaseService {
  constructor(
    private db: AngularFireDatabase,
    private message: ShowMessageService
  ) {}

  checkFireBase(param: string, typeModule: string, subscriber: Subscriber<any>) {
    let userId = localStorage.getItem('userIdMd5');
    this.db
      .list(`${typeModule}/${param}`)
      .snapshotChanges(['child_added'])
      .subscribe((res: any) => {
        if (res.length > 0) {
          res.forEach(action => {
            if(action.key == userId){
              for(let key in action.payload.val()){
                let parseRes = JSON.parse(action.payload.val()[key]);
                if (parseRes.status === true) {
                  this.message.success(parseRes.message);
                  this.db.list(`${typeModule}/${param}/${userId}`).remove();
                  subscriber.next({status: true, data: parseRes?.data});
                  subscriber.complete();
                } else {
                  this.message.error(parseRes.message);
                  this.db.list(`${typeModule}/${param}/${userId}`).remove();
                  subscriber.next({status: false, data: parseRes?.data});
                  subscriber.complete();
                }
              }
            }
          });
        }
      });
  }

  checkFireBaseAuth(param: string, typeModule: string, subscriber: Subscriber<any>) {
    let userId = JSON.parse(localStorage.getItem('userAuthId'));
    this.db
      .list(`${typeModule}/${param}`)
      .snapshotChanges(['child_added'])
      .subscribe((res: any) => {
        if (res.length > 0) {
          res.forEach(action => {
            if(action.key == userId){
              for(let key in action.payload.val()){
                let parseRes = JSON.parse(action.payload.val()[key]);
                if (parseRes.status === true) {
                  this.message.success(parseRes.message);
                  this.db.list(`${typeModule}/${param}/${userId}`).remove();
                  subscriber.next({status: true, data: parseRes?.data});
                  subscriber.complete();
                } else {
                  this.message.error(parseRes.message);
                  this.db.list(`${typeModule}/${param}/${userId}`).remove();
                  subscriber.next({status: false, data: parseRes?.data});
                  subscriber.complete();
                }
              }
            }
          });
        }
      });
  }

  testThu(param: string, typeModule: string, subscriber: Subscriber<any>) {
    let userId = JSON.parse(localStorage.getItem('userAuthId'));
    this.db
      .list(`${typeModule}/${param}/${userId}`)
      .valueChanges()
      .subscribe((res: any) => {
        if (res.length > 0) {
          let parseRes = JSON.parse(res[0]);
          if (parseRes.status === true) {
            this.db.list(`${typeModule}/${param}/${userId}`).remove();
            this.message.success(parseRes.message);
            subscriber.next({status: true, data: parseRes?.data});
          } else {
            this.db.list(`${typeModule}/${param}/${userId}`).remove();
            this.message.error(parseRes.message);
            subscriber.next({status: false, data: parseRes?.data});
          }
          subscriber.complete();
        }
      });
  }
}
