import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResizeImageService {
    constructor() { }
    readFile(file: File, subscriber: Subscriber<any>, type = null) {
        const filereader = new FileReader();
        filereader.readAsDataURL(file);

        if (type !== null) {
            filereader.onload = function () {
                subscriber.next(filereader.result);
                subscriber.complete();
            };
        } else {
            filereader.onload = () => {
                // resize
                var img: any = new Image();
                img.src = filereader.result;
                img.onload = function () {
                    const width = img.width;
                    const height = img.height;
                    const elem = document.createElement('canvas');
                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    let webp = elem.toDataURL(file.type,0.5);
                    subscriber.next(webp);
                    subscriber.complete();
                }
            };
        }

        filereader.onerror = (error) => {
            subscriber.error(error);
            subscriber.complete();
        };
    }

    base64File(file, subscriber: Subscriber<any>) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            subscriber.next(reader.result);
            subscriber.complete();
        };
    }
}
