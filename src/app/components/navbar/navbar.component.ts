import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data-service';
import { Observable } from 'rxjs';
import { Data } from '../../models/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  form!: FormGroup;
  data$!: Observable<Data>;

  constructor(
    private readonly fb: FormBuilder,
    private dataSvc: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      key: ['', Validators.required],
    });
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    debugger;
    if (this.form.valid) {
      this.dataSvc.pruebaApi('coffee');
      // this.dataSvc.search(this.form.value).subscribe({
      //   next: (res) => {
      //     debugger;
      //     this.router.navigate([`/search/${this.form.get('key')}`]);
      //   },
      //   error: (error) => {
      //     //notificar al usuario con el mensaje recibido del back
      //   },
      // });
    }
  }
}
