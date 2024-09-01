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
      openToCollab: entity.open_to_collaborate,
      generalInfo: {
        fullName: entity.name,
        picture: entity.picture,
        interests: entity.interests.map((int) => ({
          keyword: int.keyword,
          title: int.title,
        })),
        affiliation: entity.affiliation,
        email: entity.email,
        phone: entity.phone,
      },
      socials: {
        items: entity.ssnn.map((social) => ({
          name: social.name,
          url: social.url,
        })),
      },
      id: entity.schoolar_id,
    });
  }
}
