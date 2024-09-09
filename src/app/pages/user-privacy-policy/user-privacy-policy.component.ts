import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-privacy-policy',
  templateUrl: './user-privacy-policy.component.html',
  styleUrls: ['./user-privacy-policy.component.css'],
})
export class UserPrivacyPolicyComponent implements OnInit, OnDestroy {
  privacyPolicyHTML!: Observable<string>;

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.privacyPolicyHTML = this.userService
      .getPrivacyPolicy()
      .pipe(takeUntil(this.componentDestroyed$));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
