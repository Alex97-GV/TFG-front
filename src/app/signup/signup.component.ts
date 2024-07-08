import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  Titulo: string = 'Sign up';
  samePass!: boolean;
  validPass!: boolean;
  form!: FormGroup;

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
    this.setSubscriptions();
  }

  initForm(): FormGroup {
    return this.fb.group({
      user: ['', Validators.required],
      mail: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      repPass: ['', [Validators.required]],
      agree: [false, Validators.required],
    });
  }

  setSubscriptions(): void {
    this.form.valueChanges.subscribe((val) => {
      debugger;
    });

    this.form
      .get('pass')
      ?.valueChanges.pipe(
        filter((value) => !!value),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((value) => {
        setTimeout(() => {
          this.checkLength(value), this.checkRepPass();
        }, 1000);
      });

    this.form
      .get('repPass')
      ?.valueChanges.pipe(
        filter((value) => !!value),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((value) => {
        setTimeout(() => this.checkRepPass(), 1000);
      });
  }

  checkLength(pass: string): void {
    if (pass.length < 8) this.validPass = false;
    else this.validPass = true;
  }

  checkRepPass(): void {
    if (
      this.form.get('repPass')?.dirty &&
      this.form.get('pass')?.value === this.form.get('repPass')?.value
    )
      this.samePass = true;
    else {
      if (this.form.get('repPass')?.dirty) this.samePass = false;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.signUp(this.form.value).subscribe({
        next: () => {
          //guardar usuario en memoria para la navegación
          debugger;
          this.router.navigate(['/home']);
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
