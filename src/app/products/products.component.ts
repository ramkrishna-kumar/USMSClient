import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }
  name: string;
  ngOnInit() {
    this.name = this.authenticationService.currentUser.name;
  }

}
