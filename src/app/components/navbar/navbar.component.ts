import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  form!: FormGroup;
  user: string = 'Unknown';
  searchTypes = ['all', 'authors', 'interests'];

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

  goToAuthor() {
    const authorId = 'EicYvbwAAAAJ';
    this.router.navigate([`/author/${authorId}`]);
  }

  changeSearchType(type: string) {
    this.form.get('type')?.setValue(type);
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
