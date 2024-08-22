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
    private router: Router
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
            //guardar usuario en memoria para la navegación
            sessionStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/interests']);
          },
          error: (error) => {
            //notificar al usuario con el mensaje recibido por el back
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
