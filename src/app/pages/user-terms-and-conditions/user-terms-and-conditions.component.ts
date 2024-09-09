import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-terms-and-conditions',
  templateUrl: './user-terms-and-conditions.component.html',
  styleUrls: ['./user-terms-and-conditions.component.css'],
})
export class UserTermsAndConditionsComponent implements OnInit, OnDestroy {
  termsAndConditionsHTML!: any;

  private readonly componentDestroyed$ = new Subject<void>();
  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userService
      .getTermsAndConditions()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((res) => {
        debugger;
        const aux = res.replace('#', '/userPrivacyPolicy');

        debugger;
        this.termsAndConditionsHTML =
          this.sanitizer.bypassSecurityTrustHtml(aux);
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
