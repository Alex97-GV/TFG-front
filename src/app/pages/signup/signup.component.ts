import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

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
      agree: [null, Validators.required],
    });
  }

  setSubscriptions(): void {
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
      .subscribe(() => {
        setTimeout(() => this.checkRepPass(), 1000);
      });

    this.form
      .get('agree')
      ?.valueChanges.pipe(takeUntil(this.componentDestroyed$))
      .subscribe((val) => {
        if (!val) this.form.get('agree')?.setValue(null, { emitEvent: false });
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
        next: (res) => {
          //guardar usuario en memoria para la navegación
          sessionStorage.setItem('user', JSON.stringify(res));
          debugger;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          //notificar al usuario con el mensaje recibido por el back
        },
      });
    }
  }

  checkDisable(): boolean {
    return (
      this.form.invalid || this.samePass == false || this.validPass == false
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
