import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'formatTime'
})
export class FormatTimePipe extends DatePipe implements PipeTransform {
    transform(value: any, format?: any): any {
        return super.transform(value*1000, format ? format : "dd/MM/yyyy");
    }
}