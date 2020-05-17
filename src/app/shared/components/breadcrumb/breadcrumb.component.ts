
import {mergeMap, map, filter} from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';




@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
    
	//@Input() layout;

  get pageInfo() : any {
    return this.routerService.pageInfo;
  }

  constructor(private routerService: RouterService)
  {}

  ngOnInit() { }  
}
