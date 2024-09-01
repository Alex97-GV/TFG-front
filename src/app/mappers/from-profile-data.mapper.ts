import { Injectable } from '@angular/core';
import { MapperService } from './mapper.service';
import { ProfileData } from '../models/profile-data.model';
import { ProfileDataDto } from '../models/profile-data-dto.interface';

@Injectable()
export class FromProfileDataMapperService extends MapperService<
  ProfileData,
  ProfileDataDto
> {
  constructor() {
    super();
  }

  protected map(entity: ProfileData): ProfileDataDto {
    return {
      name: entity.generalInfo.fullName,
      email: entity.generalInfo.email,
      open_to_collaborate: entity.openToCollab,
      picture: entity.generalInfo.picture,
      affiliation: entity.generalInfo.affiliation,
      schoolar_id: entity.id,
      phone: entity.generalInfo.phone,
      interests: entity.generalInfo.interests.map((int) => ({
        title: int.title,
        keyword: int.keyword,
      })),
      ssnn: entity.socials.items.map((soc) => ({
        name: soc.name,
        url: soc.url,
      })),
    };
  }
}
