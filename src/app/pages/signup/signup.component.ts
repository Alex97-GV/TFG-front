import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  Titulo: string = 'Sign up';
  form!: FormGroup;

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationSvc: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group(
      {
        user: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        pass: ['', [Validators.required, Validators.minLength(8)]],
        repPass: ['', Validators.required],
        openToCollab: [true, Validators.required],
        agree: [false, [Validators.required, Validators.requiredTrue]],
      },
      {
        validator: this.checkRepPassValidator,
      }
    );
  }

  checkRepPassValidator(control: AbstractControl) {
    return control.get('pass')?.value == control.get('repPass')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService
        .signUp(this.form.value)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe({
          next: (res) => {
            sessionStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/interests']);
            this.notificationSvc.success(
              'You have been successfully registered',
              'SUCCESS'
            );
          },
          error: (error) => {
            this.notificationSvc.error(
              'There has been a problem with the server',
              'ERROR'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
