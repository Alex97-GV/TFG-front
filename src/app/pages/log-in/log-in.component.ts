import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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
    private router: Router
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
            //notificar sobre un problema y redireccionar
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
