import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';

@Pipe({
  name: 'secondsToTimespan'
})
export class SecondsToTimespanPipe implements PipeTransform {

  transform(value: any, args1?: any, args2?: any, hide?: boolean): any {
    if ((!value && (!args1 || !args2)) || hide)
      return '';

    if (!value) {
      value = ((new Date(args1)).getTime() - (new Date(args2)).getTime()) / 1000;
    }
    
    var duration: any = moment.duration(value, 'seconds');
    var fmt = duration.format("d.h:mm:ss", {stopTrim: "h"});
    return fmt;
  }

}
