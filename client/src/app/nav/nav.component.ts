import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService: AccountService,private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.login();
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}