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
  navbarOpen = false;

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    if (!this.model.username || !this.model.password) {
      this.toastr.error('Please enter the Username and Password');
      return;
    }
    this.accountService.login(this.model).subscribe(response => {
      this.toggleNavbar();
      this.router.navigateByUrl('/members');
    })
  }

  logout() {
    this.toggleNavbar();
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
