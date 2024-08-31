import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { Observable, map, of } from 'rxjs';
import { ToUserMapperService } from '../mappers/to-user.mapper';
import { UserDto } from '../models/user-dto.interface';
import { User } from '../models/user.model';
import { BaseApiService } from './base-api.service';
import { ProfileData } from '../models/profile-data.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private baseApiService: BaseApiService,
    private toUserMapperService: ToUserMapperService
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
      open_to_collaborate: true, //modificar en un futuro
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

  getProfileData(email: string) {
    const params = {
      email: email,
    };

    return of(
      new ProfileData({
        openToCollab: true,
        generalInfo: {
          fullName: 'Lorena',
          picture:
            'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp',
          interests: [
            {
              keyword: 'particle_physics',
              title: 'Particle Physics',
            },
            {
              keyword: 'high_energy_physics',
              title: 'High Energy Physics',
            },
            {
              keyword: 'grid_computing',
              title: 'Grid Computing',
            },
            {
              keyword: 'computing_for_high_energy_physics',
              title: 'Computing for High Energy Physics',
            },
          ],
          affiliation:
            'Full Professor, Universidad Complutense de Madrid (UCM)',
          email: 'lor@ucm.es',
          phone: '999999999',
        },
        socials: [
          {
            name: 'Twitter',
            url: 'https://www.google.es/',
          },
          {
            name: 'Instagram',
            url: 'https://www.google.es/',
          },
          {
            name: 'Facebook',
            url: 'https://www.google.es/',
          },
          {
            name: 'Youtube',
            url: 'https://www.google.es/',
          },
        ],
        id: 'UF2TnzsAAAAJ',
      })
    );

    // return this.baseApiService.get<ProfileData>(`${this.urlBase}get_user_info`, params);
  }

  saveProfileData(data: any) {}

  hashPass(pass: string): string {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync());
  }

  comparePassword(passFromLogin: string, hashPass: string): boolean {
    return bcrypt.compareSync(passFromLogin, hashPass);
  }
}
