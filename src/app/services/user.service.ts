import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ToUserMapperService } from '../mappers/to-user.mapper';
import { UserDto } from '../models/user-dto.interface';
import { User } from '../models/user.model';
import { BaseApiService } from './base-api.service';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private baseApiService: BaseApiService,
    private toUserMapperService: ToUserMapperService,
    private router: Router
  ) {}

  private readonly urlBase = 'http://127.0.0.1:5000/api/';

  logIn(data: any): Observable<User> {
    let params = {
      email: data.email,
      // password: this.hashPass(data.password),
      password: data.password
    };

    return this.baseApiService
      .get<UserDto>(`${this.urlBase}login`, params)
      .pipe(
        map((user) => {
          debugger;
          return this.toUserMapperService.transform(user);
        })
      );
  }

  signUp(data: any): Observable<User> {
    const params = {
      name: data.user,
      email: data.mail,
      password: this.hashPass(data.pass),
      open_to_collaborate: data.openToCollaborate,
      user_terms_acceptance: data.agree,
    };
    debugger;
    return this.baseApiService
      .post<UserDto>(`${this.urlBase}sign_up`, params)
      .pipe(
        map((user) => {
          debugger;
          return this.toUserMapperService.transform(user);
        })
      );
  }
  
  hashPass(pass: string): string {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync());
  }
}
