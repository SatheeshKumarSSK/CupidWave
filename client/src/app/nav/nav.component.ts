import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  /*collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = this.collapsed;
  }*/

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.login();
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
  logout() {
    this.accountService.logout();
  }

}
