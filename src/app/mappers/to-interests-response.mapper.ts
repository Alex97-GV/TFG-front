import { Injectable } from '@angular/core';
import { MapperService } from './mapper.service';
import { InterestsResponseDto } from '../models/interests-response-dto.interface';
import {
  Interest,
  InterestsResponse,
} from '../models/interests-response.model';

@Injectable()
export class ToInterestsResponseMapperService extends MapperService<
  InterestsResponseDto,
  InterestsResponse
> {
  protected map(entity: InterestsResponseDto): InterestsResponse {
    return new InterestsResponse({
      interests: entity.interests.map(
        (int) =>
          new Interest({
            mainCategory: int.main_category,
            subcategories: int.subcategories.map((sub) => ({
              keyword: sub.keyword,
              title: sub.title,
            })),
          })
      ),
      userInterests: entity.user_interests.map(
        (int) =>
          new Interest({
            mainCategory: int.main_category,
            subcategories: int.subcategories.map((sub) => ({
              keyword: sub.keyword,
              title: sub.title,
            })),
          })
      ),
    });
  }
}
