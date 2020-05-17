import { Component, OnInit, ViewChild, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { SortSequence } from './enum/sort-sequentce';
import { SortModel } from './model/sort-model';

@Component({
  selector: 'custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.css'],  
})
export class CustomDataTableComponent implements OnInit { 

  @Input("rows")
  set rows(data: any[]) {
    this.tableContainer.nativeElement.style.overflowX = 'hidden';
    this.isBreakWords = false;
    this.wordsBrokenAtWidth = 0;
    this.lastWidth = 0;
    this.data = data;
    setTimeout(() => {
      this.setWordBreak()
    }, 0);
  }
  data: any[];

  @Input("columns")
  columns: any[]

  @Input("style")
  style: string
 
  @Input("fullHeight")
  fullHeight: boolean = true;

  @Input("footerHeight")
  footerHeight: number = 10;


  @Input("isCheckedAll")
  set isCheckedAll(data: boolean) {
    this.isChecked = data;
    
  }
  isChecked: boolean;

  @Output() selectAll = new EventEmitter<any>();
  @Output() sortRowsOnServer = new EventEmitter<any>();

  isBreakWords: boolean = false;
  wordsBrokenAtWidth: number = 0;
  lastWidth: number = 0;

  @ViewChild('table', { static: true })
  table: any;

  @ViewChild('tableContainer', { static: true })
  tableContainer: any;  

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    //this.wHeight = event.target.innerHeight;
    setTimeout(() => {
      this.setWordBreak()
    }, 0);
  }

  checkAll(event: any) {
    this.selectAll.emit(event);
  }

  setWordBreak() {
    if (this.tableContainer) {
      var wasBreakWords = this.isBreakWords;
      if (this.tableContainer.nativeElement.scrollWidth > this.tableContainer.nativeElement.clientWidth + 5) {
        if (!this.isBreakWords) {
          for (var i = 1; i < this.table.nativeElement.rows.length; i++) {
            for (var j = 0; j < this.table.nativeElement.rows[i].cells.length; j++) {
              this.table.nativeElement.rows[i].cells[j].style.wordBreak = 'break-all';
              this.isBreakWords = true;
              this.wordsBrokenAtWidth = this.tableContainer.nativeElement.clientWidth
            }
          }
        } else {
          this.tableContainer.nativeElement.style.overflowX = 'auto';
        }
      } else if (this.isBreakWords && this.tableContainer.nativeElement.clientWidth > this.wordsBrokenAtWidth + 20) {
        for (var i = 1; i < this.table.nativeElement.rows.length; i++) {
          for (var j = 0; j < this.table.nativeElement.rows[i].cells.length; j++) {
            this.table.nativeElement.rows[i].cells[j].style.wordBreak = 'normal';
            this.isBreakWords = false;
            this.tableContainer.nativeElement.style.overflowX = 'hidden';
          }
        }
      }      
      if (this.fullHeight) {
        var vp = this.tableContainer.nativeElement.getBoundingClientRect().top;
        this.tableContainer.nativeElement.style.height = 'calc(100vh - ' + (vp + this.footerHeight).toString() + 'px)';
      }
      if (wasBreakWords !== this.isBreakWords) {
        setTimeout(() => {
          this.setWordBreak()
        }, 0);
      }
    }
  }

  refreshSize() {
    this.tableContainer.nativeElement.style.overflowX = 'hidden';
    this.isBreakWords = false;
    this.wordsBrokenAtWidth = 0;
    this.lastWidth = 0;
    setTimeout(() => this.setWordBreak(), 0);
  }

  calculateHeight() {
    setTimeout(() => this.setWordBreak(), 0);
  }

  collapse() {
    this.tableContainer.nativeElement.style.height = '0px';
  }
  
  replacePipe(theValue: string): string {
    return theValue.replace('|', '<img style="width:0px;height:0px"/>');
  }

  constructor() {    
  }  

  ngOnInit() {

  }

    getColumnHeader(col: any) {
        let columnDisplayName = '';
        if (col && col.breakAtPipe) {
            if (this.isBreakWords) {
                columnDisplayName = this.replacePipe(col.name);
            }
            else {
                columnDisplayName = col.name.replace('|', '');
            }
        }
        else {
            columnDisplayName = col.name;
        }

        if (col.sortable) {
            let sortIcon = "<i class='fa fa-sort' > </i>";
            columnDisplayName = columnDisplayName + '&nbsp;' + sortIcon;
            this.setSortableStyle(col);
        }
        
        return columnDisplayName;
    }

    setSortableStyle(column: any) {
        var headCol = document.getElementById(column.prop);
        if (headCol) {
            headCol.style.cursor = 'pointer';
        }
    }

    /*ngAfterViewInit() {
        for (let column of this.columns) {
            if (column.sortable) {
                var headCol = document.getElementById(column.prop);
              v   if (headCol) {
                    headCol.style.cursor = 'pointer';
                }
            }
        }
    }*/

    currentSort = '';
    sort(event: any, column: any) {
        if (!column.sortable || column.prop === '') {
            return;
        }

        if (this.currentSort !== '' && this.currentSort === column.prop) {
            this.currentSort = '';
            this.sortRowsRequest(event, column.prop, SortSequence.Descending);
        }
        else {
            this.currentSort = column.prop;
            this.sortRowsRequest(event, column.prop, SortSequence.Ascending);
        }
    }

    sortRowsRequest(event, sortColumnName: string, sortSequence: SortSequence) {
        sortColumnName = sortColumnName.charAt(0).toUpperCase() + sortColumnName.slice(1);
        let sortModel: SortModel = new SortModel(sortColumnName, sortSequence);
        this.sortRowsOnServer.emit({ event: event, sortModel: sortModel });
    }
}
