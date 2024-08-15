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

  goToAuthor() {
    const authorId = 'SSDFRGHA';
    this.router.navigate([`/author/${authorId}`])
  }

  onSubmit(): void {
    if (this.form.valid) {
      //en caso de que haya filtros, incluir en la url los parámetros
      this.router.navigate([`/search/${this.form.get('key')?.value}`]);
    }
  }
}
