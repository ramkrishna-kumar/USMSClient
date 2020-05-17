import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { TempServiceProvider } from '../shared/services/temp-service-provider';
import { UserViewModel } from '../shared/view-models/user-view-model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { College } from '../shared/models/college';
import { UserType } from '../shared/enums/user-type';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private tempService: TempServiceProvider) { }

  rows: UserViewModel[] = [];
  columns: any[] = [];

  ngOnInit() {
    this.initColumns();
    this.initFilter();
    this.loadRows();



  }

  initColumns() {
    this.columns = [
      { prop: 'name', name: 'Server name' },
      { prop: 'city', name: 'City' },
      { prop: 'mobileNumber', name: 'Mobile Number' },
    ];

    if (this.authenticationService.isUniversityAdmin) {
      this.columns.push({ prop: 'colllegeName', name: 'Colllege Name' });
      this.columns.push({ prop: 'userTypeName', name: 'User Type' });
    }

    this.columns.push({ prop: 'dateCreated', name: 'Date Created' });
  }

  selectedCollege: College = new College();
  colleges: College[] = [];
  initFilter() {
    if (this.isUniversityAdmin) {
      this.selectedCollege.id = null;
      this.selectedCollege.name = "All Colleges"
    }
    else {
      this.selectedCollege.id = this.authenticationService.currentUser.colllegeId;
      this.selectedCollege.name = this.authenticationService.currentUser.colllegeName;
    }
  }

  loadRows() {
    for (let i = 0; i < 10; i++) {
      var user = this.tempService.getUserViewModel();
      this.rows.push(user);
    }
  }

  // Utility methods
  changeCollege(college: College) {
    if (college.id !== this.selectedCollege.id) {
        this.selectedCollege = college;

        //this.orgService.getUsersAndRoles(org.organizationId).subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
    }
  }

  get isUniversityAdmin() {
    return this.authenticationService.isUniversityAdmin;
  }


}
