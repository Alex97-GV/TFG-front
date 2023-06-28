import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  Titulo: string = "Inicio de Sesión";
  loginForm!: FormGroup;

  constructor(private readonly fb: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remindme: [false]
    })
  }

  onSubmit(): void{
    //trabajar aquí con los datos que se guarden en loginForm    
  }


}
