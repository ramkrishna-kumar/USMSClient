import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiffWords'
})
export class TimeDiffWordsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value)
      return "";

    var lastUpdate = new Date(value);
    var now : Date;
    if (args) {
      now = new Date(args);
    }
    else {
      now = new Date();
    }        
    var diff = now.getTime() - lastUpdate.getTime();
    if (diff <= 0) {
      return 'Now';
    }    
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    var mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    var seconds = Math.floor(diff / (1000));
    diff -= seconds * (1000);

    if (days > 30)
      return lastUpdate.toLocaleString();

    if (days > 1)
      return `${days} days ago`;
    if (days == 1)
      return 'Yesterday';
    if (hours > 1)
      return `${hours} hours ago`;
    if (mins > 1)
      return `${mins} min ago`;
    if (seconds > 1)
      return `${seconds} sec ago`;

    return 'Now';   
  }

}
