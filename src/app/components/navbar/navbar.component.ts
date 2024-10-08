import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  form!: FormGroup;
  user: string = 'Unknown';
  searchTypes = [
    { type: 'all', label: 'all' },
    { type: 'interests', label: 'authors by interests' },
    { type: 'authors', label: 'authors' },
  ];

  constructor(private readonly fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const userInfo = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.user = userInfo.name;
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      key: ['', Validators.required],
      type: ['all', Validators.required],
    });
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  changeSearchType(type: string) {
    this.form.get('type')?.setValue(type);
  }

  getSearchLabel() {
    return this.searchTypes.find((t) => t.type == this.form.get('type')?.value)
      ?.label;
  }

  onSubmit(): void {
    if (this.form.valid) {
      //en caso de que haya filtros, incluir en la url los parámetros
      this.router.navigate(
        [
          `/search/${this.form.get('type')?.value}/${
            this.form.get('key')?.value
          }`,
        ],
        { preserveFragment: false }
      );
    }
  }
}
