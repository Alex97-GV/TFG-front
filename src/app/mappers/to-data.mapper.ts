import { Injectable } from '@angular/core';
import { Data } from '../models/data.model';
import { MapperService } from './mapper.service';
import { DataDto } from '../models/data-dto.interface';

@Injectable()
export class ToDataMapperService extends MapperService<DataDto, Data> {
  protected map(entity: DataDto): Data {
    return new Data({
      affiliation: entity.affiliation,
      citedby: entity.citedby,
      emailDomain: entity.email_domain,
      filled: entity.filled,
      interests: entity.interests,
      name: entity.name,
      scholarId: entity.scholar_id,
      source: entity.source,
      urlPicture: entity.url_picture,
    });
  }
}
