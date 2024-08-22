import { Injectable } from '@angular/core';
import { UserDto } from '../models/user-dto.interface';
import { User } from '../models/user.model';
import { MapperService } from './mapper.service';

@Injectable()
export class ToUserMapperService extends MapperService<UserDto, User> {
  protected map(entity: UserDto): User {
    return new User({
      name: entity.name,
      mail: entity.email,
      openToCollaborate: entity.open_to_collaborate,
    });
  }
}
