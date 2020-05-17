import { Pipe, PipeTransform } from '@angular/core';
//import * as moment from 'moment';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(value: any, displayTimezone: any = false): any {
    if (!value)
      return '';

    var locale = window.navigator.language;
    moment.locale(locale);
    var localeData = moment.localeData();
    var format = localeData.longDateFormat('L') + ' ' + localeData.longDateFormat('LT');

    var date = new Date(value);
    let mdt = moment(date);
    if (!mdt.isValid()) return '';
    return mdt.format(format) + (displayTimezone ? ' (' + moment().tz(moment.tz.guess()).format('z') + ')' : '');
  }

}
