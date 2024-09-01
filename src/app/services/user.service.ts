import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { Observable, map, of } from 'rxjs';
import { ToUserMapperService } from '../mappers/to-user.mapper';
import { UserDto } from '../models/user-dto.interface';
import { User } from '../models/user.model';
import { BaseApiService } from './base-api.service';
import { ProfileData } from '../models/profile-data.model';
import { ToProfileDataMapperService } from '../mappers/to-profile-data.mapper';
import { ProfileDataDto } from '../models/profile-data-dto.interface';
import { FromProfileDataMapperService } from '../mappers/from-profile-data.mapper';
import { InterestsResponse } from '../models/interests-response.model';
import { ToInterestsResponseMapperService } from '../mappers/to-interests-response.mapper';
import { InterestsResponseDto } from '../models/interests-response-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private baseApiService: BaseApiService,
    private toUserMapperService: ToUserMapperService,
    private toProfileDataMapperService: ToProfileDataMapperService,
    private fromProfileDataMapperService: FromProfileDataMapperService,
    private toInterestsResponseMapperService: ToInterestsResponseMapperService
  ) {}

  private readonly urlBase = 'http://127.0.0.1:5000/api/';

  logIn(data: any): Observable<User> {
    let params = {
      email: data.email,
    };

    return this.baseApiService
      .get<UserDto>(`${this.urlBase}login`, params)
      .pipe(
        map((user) => {
          if (this.comparePassword(data.password, user.password))
            return this.toUserMapperService.transform(user);
          else throw new Error('Password does not match');
        })
      );
  }

  signUp(data: any): Observable<User> {
    const params = {
      name: data.user,
      email: data.mail,
      password: this.hashPass(data.pass),
      open_to_collaborate: true,
      user_terms_acceptance: data.agree,
    };
    return this.baseApiService
      .post<UserDto>(`${this.urlBase}sign_up`, params)
      .pipe(
        map((user) => {
          return this.toUserMapperService.transform(user);
        })
      );
  }

  getProfileData(email: string): Observable<ProfileData> {
    const params = {
      email: email,
    };

    return this.baseApiService
      .get<ProfileDataDto>(`${this.urlBase}user_info`, params)
      .pipe(map((res) => this.toProfileDataMapperService.transform(res)));
  }

  saveProfileData(data: any): Observable<ProfileData> {
    const body = this.fromProfileDataMapperService.transform(data);

    return this.baseApiService
      .put<ProfileDataDto>(`${this.urlBase}user_info`, body)
      .pipe(map((res) => this.toProfileDataMapperService.transform(res)));
  }

  getUserInterests(email: string): Observable<any> {
    const params = { email: email };

    return this.baseApiService
      .get<InterestsResponseDto>(`${this.urlBase}interests`, params)
      .pipe(map((res) => this.toInterestsResponseMapperService.transform(res)));
  }

  saveInterests(interestsList: string[]): Observable<any> {
    const body = {
      interests: interestsList,
    };

    return of({ save: true });

    // return this.baseApiSvc
    //   .post<any>(`${this.url}`, body)
    //   .pipe(map((res) => this.toResponseInterestsMapperService.transform(res)));
  }

  hashPass(pass: string): string {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync());
  }

  comparePassword(passFromLogin: string, hashPass: string): boolean {
    return bcrypt.compareSync(passFromLogin, hashPass);
  }
}
