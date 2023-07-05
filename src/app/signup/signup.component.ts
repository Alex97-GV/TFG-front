import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  Titulo: string = "Sign up";
  signupForm!: FormGroup;

  constructor(private readonly fb: FormBuilder){}

  ngOnInit(): void {
    this.signupForm = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      repPass: ['', [Validators.required]],
      agree: [false, Validators.required]
    })
  }

  onSubmit(): void{
    //trbajar aquí con los datos introducidos
  }

  checkRepPass(): void{
    //comparar contraseñas
  }


}
