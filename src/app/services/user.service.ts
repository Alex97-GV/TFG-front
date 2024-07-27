import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ToUserMapperService } from '../mappers/to-user.mapper';
import { UserDto } from '../models/user-dto.interface';
import { User } from '../models/user.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private baseApiService: BaseApiService,
    private toUserMapperService: ToUserMapperService,
    private router: Router
  ) {}

  private readonly url = '127.0.0.1:5000';

  logIn(data: any): Observable<User> {
    let params = { email: '', password: '' };
    if (data.email) params.email = data.email;
    if (data.password) params.password = data.password;

    // return of(new User({ id: 1, name: 'Alex', mail: 'a@a.com' }));
    return this.baseApiService
      .get<UserDto>(`${this.url}/api/login`, params)
      .pipe(
        map((user) => {
          // debugger;
          return this.toUserMapperService.transform(user);
        })
      );
  }

  logout(): void {
    //resetear datos usuario guardado en app (sessionStorage o lo que usemos)
    this.router.navigate(['/login']);
  }

  signUp(data: any): Observable<User> {
    const params = {};
    return of(new User({ id: 1, name: 'Alex', mail: 'a@a.com' }));
    // const params = toUserDtoMapperService.transform(data);
    // return this.baseApiService.post<User>(`${this.url}`, params);
  }
}
