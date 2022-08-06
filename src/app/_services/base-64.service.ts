import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { JicCompress } from '../_shared/core/general-function';
declare const jic: any;
@Injectable({
    providedIn: 'root'
})
export class Base64Service {
    constructor() { }

    readFile(file: File, subscriber: Subscriber<any>) {
        const filereader = new FileReader();
        filereader.readAsDataURL(file);
        filereader.onload = () => {
            subscriber.next(filereader.result);
            subscriber.complete();
        };

        filereader.onerror = (error) => {
            subscriber.error(error);
            subscriber.complete();
        };
    }

    // @ts-ignore
    readImage_resize_and_compress_photo(file: any, subscriber: Subscriber<any>) { // image javascript element
        const filereader = new FileReader();
        filereader.readAsDataURL(file);
        const photo: any = new Image();

        if (file.size <= 1500000) {
            return filereader.onload = () => {
                subscriber.next(filereader.result);
                subscriber.complete();
            };
        }
        filereader.onload = () => {
            const checkCompress = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.size <= 6443384 ? 20 : 70;
            photo.src = filereader.result;
            photo.onload = () => {
                const data  = JicCompress(photo, checkCompress).src;
                subscriber.next(data);
                subscriber.complete();
            };
        };

        filereader.onerror = (error) => {
            subscriber.error(error);
            subscriber.complete();
        };
    }
}
