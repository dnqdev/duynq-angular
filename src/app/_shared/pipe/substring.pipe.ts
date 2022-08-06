import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'substring'
})
export class SubstringPipe implements PipeTransform {

    transform(value: any, numberWord: number=5): any {
        if(value && value.length > numberWord) return value.substring(0, numberWord)+'...';
        return value;
    }

}
