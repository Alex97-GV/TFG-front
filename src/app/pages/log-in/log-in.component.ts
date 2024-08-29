import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit, OnDestroy {
  Titulo: string = 'Log in';
  form!: FormGroup;
  componentDestroyed$ = new Subject<void>();

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
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService
        .logIn(this.form.value)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe({
          next: (res) => {
            sessionStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/home']);
          },
          error: (error) => {
            debugger;
            this.notificationSvc.error(
              'Los datos introducidos no son correctos', 'ERROR'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
