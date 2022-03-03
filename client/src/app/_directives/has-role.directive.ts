import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private acccountService: AccountService) {
    this.acccountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
    })
  }

  ngOnInit(): void {
    if (!this.user?.roles || this.user.roles == null) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.user.roles.some(x => this.appHasRole.includes(x))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainerRef.clear();
    }
  }
}
