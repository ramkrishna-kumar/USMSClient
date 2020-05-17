import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

export class MomentDateFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
    if (value) {

      var locale = window.navigator.language;
      moment.locale(locale);      
      var localeData = moment.localeData();
      var format = localeData.longDateFormat('L')            

      value = value.trim();
      let mdt = moment(value, format);      
      let dt: NgbDateStruct = { year: mdt.year(), month: mdt.month()+1, day: mdt.date()};
      return dt;
    }
    return null;
  }
  format(date: NgbDateStruct): string {

    var locale = window.navigator.language;
    moment.locale(locale);
    var localeData = moment.localeData();
    var format = localeData.longDateFormat('L')      

    if (!date) return '';
    let mdt = moment([date.year, date.month - 1, date.day]);
    if (!mdt.isValid()) return '';
    return mdt.format(format);
  }
}
