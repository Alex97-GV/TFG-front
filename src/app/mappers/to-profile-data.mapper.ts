import { Injectable } from '@angular/core';
import { ProfileDataDto } from '../models/profile-data-dto.interface';
import { ProfileData } from '../models/profile-data.model';
import { MapperService } from './mapper.service';

@Injectable()
export class ToProfileDataMapperService extends MapperService<
  ProfileDataDto,
  ProfileData
> {
  protected map(entity: ProfileDataDto): ProfileData {
    return new ProfileData({
      name: entity.name,
      picture: entity.picture,
      interests: entity.interests.map((int) => ({
        keyword: int.keyword,
        title: int.title,
      })),
      email: entity.email,
      phone: entity.phone,
      affiliation: entity.affiliation,
      ssnn: entity.ssnn.map((social) => ({
        name: social.name,
        url: social.url,
      })),
      openToCollaborate: entity.open_to_collaborate,
      id: entity.id,
    });
  }
}
