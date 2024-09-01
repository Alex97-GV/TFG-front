import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ToAuthorDataMapperService } from '../mappers/to-author-data.mapper';
import { ToAuthorSearchDataMapperService } from '../mappers/to-author-search-data.mapper';
import { ToDataMapperService } from '../mappers/to-data.mapper';
import { ToMixSearchResponseMapperService } from '../mappers/to-mix-search-response.mapper';
import { AuthorDataDto } from '../models/author-data-dto.interface';
import { AuthorData } from '../models/author-data.model';
import { AuthorSearchDataResponseDto } from '../models/author-search-data-dto.interface';
import { AuthorSearchDataResponse } from '../models/author-search-data.model';
import { MixSearchResponseDto } from '../models/mix-search-response-dto.interface';
import { MixSearchResponse } from '../models/mix-search-response.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private baseApiSvc: BaseApiService,
    private toDataMapperService: ToDataMapperService,
    private toAuthorDataMapperService: ToAuthorDataMapperService,
    private toAuthorSearchDataMapperService: ToAuthorSearchDataMapperService,
    private toMixSearchResponseMapperService: ToMixSearchResponseMapperService
  ) {}

  private readonly urlBase = 'http://127.0.0.1:5000/api/';

  searchAll(keyword: string): Observable<MixSearchResponse> {
    const params = {
      keyword: keyword,
    };
    return of({
      authors: [
        {
          affiliations: 'Universidade Federal do Parana',
          author_id: 'x-oRfTkAAAAJ',
          cited_by: 45667,
          interests: [
            {
              keyword: 'biotechnology',
              title: 'Biotechnology',
            },
            {
              keyword: 'solid_state_fermentation',
              title: 'Solid-State Fermentation',
            },
            {
              keyword: 'microalgae',
              title: 'Microalgae',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
            {
              keyword: 'cocoa',
              title: 'Cocoa',
            },
          ],
          name: 'Carlos Ricardo Soccol',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=x-oRfTkAAAAJ&citpid=15',
        },
        {
          affiliations:
            'Food Chemist and Toxicologist, CVUA Karlsruhe, Germany, http://orcid.org/0000-0002-3115 …',
          author_id: 'B1bx9OEAAAAJ',
          cited_by: 23066,
          interests: [
            {
              keyword: 'food_chemistry',
              title: 'Food Chemistry',
            },
            {
              keyword: 'toxicology',
              title: 'Toxicology',
            },
            {
              keyword: 'cancer',
              title: 'Cancer',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
            {
              keyword: 'cannabis',
              title: 'Cannabis',
            },
          ],
          name: 'Dirk W. Lachenmeier',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=B1bx9OEAAAAJ&citpid=2',
        },
      ],
      articles: [
        {
          authors:
            'JM Dodero, FJ García-Peñalvo, C González, P Moreno-Ger, MA Redondo, ...',
          cited_by: 62,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:b0M2c_1WBrUC',
          title:
            'Development of E-Learning Solutions: Different Approaches, a Common Mission',
          year: '2014',
        },
        {
          authors:
            'D Rodríguez-Cerezo, A Sarasa-Cabezuelo, M Gómez-Albarrán, ...',
          cited_by: 55,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:yD5IFk8b50cC',
          title:
            'Serious games in tertiary education: A case study concerning the comprehension of basic concepts in computer language implementation courses',
          year: '2014',
        },
      ],
    } as unknown as MixSearchResponseDto).pipe(
      map((data) => this.toMixSearchResponseMapperService.transform(data))
    );
    // return this.baseApiSvc
    //   .get<MixSearchResponseDto>(`${this.url}`, params)
    //   .pipe(map((data) => this.toDataMapperService.transform(data)));
  }

  searchAuthorsByInterests(
    keyword: string
  ): Observable<AuthorSearchDataResponse> {
    const params = {
      label: keyword,
    };

    return of({
      authors: [
        {
          affiliations: 'Universidade Federal do Parana',
          author_id: 'x-oRfTkAAAAJ',
          cited_by: 45667,
          interests: [
            {
              keyword: 'biotechnology',
              title: 'Biotechnology',
            },
            {
              keyword: 'solid_state_fermentation',
              title: 'Solid-State Fermentation',
            },
            {
              keyword: 'microalgae',
              title: 'Microalgae',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
            {
              keyword: 'cocoa',
              title: 'Cocoa',
            },
          ],
          name: 'Carlos Ricardo Soccol',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=x-oRfTkAAAAJ&citpid=15',
        },
        {
          affiliations:
            'Food Chemist and Toxicologist, CVUA Karlsruhe, Germany, http://orcid.org/0000-0002-3115 …',
          author_id: 'B1bx9OEAAAAJ',
          cited_by: 23066,
          interests: [
            {
              keyword: 'food_chemistry',
              title: 'Food Chemistry',
            },
            {
              keyword: 'toxicology',
              title: 'Toxicology',
            },
            {
              keyword: 'cancer',
              title: 'Cancer',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
            {
              keyword: 'cannabis',
              title: 'Cannabis',
            },
          ],
          name: 'Dirk W. Lachenmeier',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=B1bx9OEAAAAJ&citpid=2',
        },
        {
          affiliations:
            'Associate Professor of Chemistry, University of Oregon',
          author_id: 'k1erO3EAAAAJ',
          cited_by: 20507,
          interests: [
            {
              keyword: 'materials_modeling',
              title: 'Materials Modeling',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
          ],
          name: 'Christopher H. Hendon',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=k1erO3EAAAAJ&citpid=2',
        },
        {
          affiliations:
            'CentraleSupélec (former Ecole Centrale Paris)/ CNRS-UMR8580 / Université Paris-Saclay',
          author_id: 'zWzbK_8AAAAJ',
          cited_by: 19046,
          interests: [
            {
              keyword: 'condensed_matter',
              title: 'Condensed matter',
            },
            {
              keyword: 'materials_science',
              title: 'Materials science',
            },
            {
              keyword: 'phase_transitions',
              title: 'Phase transitions',
            },
            {
              keyword: 'ferroelectric',
              title: 'Ferroelectric',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
          ],
          name: 'Brahim Dkhil',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=zWzbK_8AAAAJ&citpid=1',
        },
        {
          affiliations: 'University of California, Santa Cruz',
          author_id: 'ohyI73YAAAAJ',
          cited_by: 14229,
          interests: [
            {
              keyword: 'agroecology',
              title: 'agroecology',
            },
            {
              keyword: 'biodiversity',
              title: 'biodiversity',
            },
            {
              keyword: 'insect_ecology',
              title: 'insect ecology',
            },
            {
              keyword: 'coffee',
              title: 'coffee',
            },
            {
              keyword: 'urban_gardens',
              title: 'urban gardens',
            },
          ],
          name: 'Stacy M. Philpott',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=ohyI73YAAAAJ&citpid=2',
        },
        {
          affiliations:
            'Retired - US Department of Agriculture, Agricultural Research Service',
          author_id: 'MnDBa8wAAAAJ',
          cited_by: 12585,
          interests: [
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
            {
              keyword: 'coffee_berry_borer',
              title: 'Coffee Berry Borer',
            },
            {
              keyword: 'history_of_coffee',
              title: 'History of Coffee',
            },
            {
              keyword: 'fungal_endophytes',
              title: 'Fungal Endophytes',
            },
            {
              keyword: 'fungal_entomopathogens',
              title: 'Fungal Entomopathogens',
            },
          ],
          name: 'Fernando E. Vega',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=MnDBa8wAAAAJ&citpid=9',
        },
        {
          affiliations: 'Universidade Federal de Minas Gerais',
          author_id: 'iy3eOtsAAAAJ',
          cited_by: 9540,
          interests: [
            {
              keyword: 'mechanical_engineering',
              title: 'Mechanical engineering',
            },
            {
              keyword: 'food_engineering',
              title: 'Food Engineering',
            },
            {
              keyword: 'coffee',
              title: 'coffee',
            },
          ],
          name: 'Adriana S Franca',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=iy3eOtsAAAAJ&citpid=1',
        },
        {
          affiliations: 'Professor Tropical Agroforestry CATIE',
          author_id: 'vcgrjM4AAAAJ',
          cited_by: 9490,
          interests: [
            {
              keyword: 'agroforestry',
              title: 'agroforestry',
            },
            {
              keyword: 'cocoa',
              title: 'cocoa',
            },
            {
              keyword: 'coffee',
              title: 'coffee',
            },
            {
              keyword: 'trees_on_farms',
              title: 'trees on farms',
            },
          ],
          name: 'Eduardo Somarriba',
          open_to_collaborate: false,
          picture:
            'https://scholar.google.com/citations/images/avatar_scholar_56.png',
        },
        {
          affiliations: 'Montpellier Supagro',
          author_id: 'tVDt_i0AAAAJ',
          cited_by: 8569,
          interests: [
            {
              keyword: 'agrobiodiversity',
              title: 'Agrobiodiversity',
            },
            {
              keyword: 'genetics',
              title: 'genetics',
            },
            {
              keyword: 'plant_breeding',
              title: 'plant breeding',
            },
            {
              keyword: 'coffee',
              title: 'coffee',
            },
          ],
          name: 'ANDRE CHARRIER',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=tVDt_i0AAAAJ&citpid=1',
        },
        {
          affiliations: 'Olam International Ltd',
          author_id: 'tM6ZAjUAAAAJ',
          cited_by: 8376,
          interests: [
            {
              keyword: 'coffee',
              title: 'coffee',
            },
            {
              keyword: 'farming_systems',
              title: 'farming systems',
            },
            {
              keyword: 'climate_change',
              title: 'climate change',
            },
            {
              keyword: 'sustainable_agriculture',
              title: 'sustainable agriculture',
            },
          ],
          name: 'Piet van Asten',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=tM6ZAjUAAAAJ&citpid=1',
        },
      ],
      next_page: 'xM2QAEXf__8J',
    } as unknown as AuthorSearchDataResponseDto).pipe(
      map((res) => this.toAuthorSearchDataMapperService.transform(res))
    );

    // return this.baseApiSvc
    //   .get<AuthorSearchDataResponseDto>(
    //     `${this.urlBase}search_authors_by_interests`,
    //     params
    //   )
    //   .pipe(
    //     map((res) => {
    //       debugger;
    //       return this.toAuthorSearchDataMapperService.transform(res);
    //     })
    //   );
  }

  searchAuthors(keyword: string): Observable<AuthorSearchDataResponse> {
    const params = { keyword: keyword };

    return of({
      authors: [
        {
          affiliations: 'Universidade Federal do Parana',
          author_id: 'x-oRfTkAAAAJ',
          cited_by: 45667,
          interests: [
            {
              keyword: 'biotechnology',
              title: 'Biotechnology',
            },
            {
              keyword: 'solid_state_fermentation',
              title: 'Solid-State Fermentation',
            },
            {
              keyword: 'microalgae',
              title: 'Microalgae',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
            {
              keyword: 'cocoa',
              title: 'Cocoa',
            },
          ],
          name: 'Carlos Ricardo Soccol',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=x-oRfTkAAAAJ&citpid=15',
        },
        {
          affiliations:
            'Food Chemist and Toxicologist, CVUA Karlsruhe, Germany, http://orcid.org/0000-0002-3115 …',
          author_id: 'B1bx9OEAAAAJ',
          cited_by: 23066,
          interests: [
            {
              keyword: 'food_chemistry',
              title: 'Food Chemistry',
            },
            {
              keyword: 'toxicology',
              title: 'Toxicology',
            },
            {
              keyword: 'cancer',
              title: 'Cancer',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
            {
              keyword: 'cannabis',
              title: 'Cannabis',
            },
          ],
          name: 'Dirk W. Lachenmeier',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=B1bx9OEAAAAJ&citpid=2',
        },
        {
          affiliations:
            'Associate Professor of Chemistry, University of Oregon',
          author_id: 'k1erO3EAAAAJ',
          cited_by: 20507,
          interests: [
            {
              keyword: 'materials_modeling',
              title: 'Materials Modeling',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
          ],
          name: 'Christopher H. Hendon',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=k1erO3EAAAAJ&citpid=2',
        },
        {
          affiliations:
            'CentraleSupélec (former Ecole Centrale Paris)/ CNRS-UMR8580 / Université Paris-Saclay',
          author_id: 'zWzbK_8AAAAJ',
          cited_by: 19046,
          interests: [
            {
              keyword: 'condensed_matter',
              title: 'Condensed matter',
            },
            {
              keyword: 'materials_science',
              title: 'Materials science',
            },
            {
              keyword: 'phase_transitions',
              title: 'Phase transitions',
            },
            {
              keyword: 'ferroelectric',
              title: 'Ferroelectric',
            },
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
          ],
          name: 'Brahim Dkhil',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=zWzbK_8AAAAJ&citpid=1',
        },
        {
          affiliations: 'University of California, Santa Cruz',
          author_id: 'ohyI73YAAAAJ',
          cited_by: 14229,
          interests: [
            {
              keyword: 'agroecology',
              title: 'agroecology',
            },
            {
              keyword: 'biodiversity',
              title: 'biodiversity',
            },
            {
              keyword: 'insect_ecology',
              title: 'insect ecology',
            },
            {
              keyword: 'coffee',
              title: 'coffee',
            },
            {
              keyword: 'urban_gardens',
              title: 'urban gardens',
            },
          ],
          name: 'Stacy M. Philpott',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=ohyI73YAAAAJ&citpid=2',
        },
        {
          affiliations:
            'Retired - US Department of Agriculture, Agricultural Research Service',
          author_id: 'MnDBa8wAAAAJ',
          cited_by: 12585,
          interests: [
            {
              keyword: 'coffee',
              title: 'Coffee',
            },
            {
              keyword: 'coffee_berry_borer',
              title: 'Coffee Berry Borer',
            },
            {
              keyword: 'history_of_coffee',
              title: 'History of Coffee',
            },
            {
              keyword: 'fungal_endophytes',
              title: 'Fungal Endophytes',
            },
            {
              keyword: 'fungal_entomopathogens',
              title: 'Fungal Entomopathogens',
            },
          ],
          name: 'Fernando E. Vega',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=MnDBa8wAAAAJ&citpid=9',
        },
        {
          affiliations: 'Universidade Federal de Minas Gerais',
          author_id: 'iy3eOtsAAAAJ',
          cited_by: 9540,
          interests: [
            {
              keyword: 'mechanical_engineering',
              title: 'Mechanical engineering',
            },
            {
              keyword: 'food_engineering',
              title: 'Food Engineering',
            },
            {
              keyword: 'coffee',
              title: 'coffee',
            },
          ],
          name: 'Adriana S Franca',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=iy3eOtsAAAAJ&citpid=1',
        },
        {
          affiliations: 'Professor Tropical Agroforestry CATIE',
          author_id: 'vcgrjM4AAAAJ',
          cited_by: 9490,
          interests: [
            {
              keyword: 'agroforestry',
              title: 'agroforestry',
            },
            {
              keyword: 'cocoa',
              title: 'cocoa',
            },
            {
              keyword: 'coffee',
              title: 'coffee',
            },
            {
              keyword: 'trees_on_farms',
              title: 'trees on farms',
            },
          ],
          name: 'Eduardo Somarriba',
          open_to_collaborate: false,
          picture:
            'https://scholar.google.com/citations/images/avatar_scholar_56.png',
        },
        {
          affiliations: 'Montpellier Supagro',
          author_id: 'tVDt_i0AAAAJ',
          cited_by: 8569,
          interests: [
            {
              keyword: 'agrobiodiversity',
              title: 'Agrobiodiversity',
            },
            {
              keyword: 'genetics',
              title: 'genetics',
            },
            {
              keyword: 'plant_breeding',
              title: 'plant breeding',
            },
            {
              keyword: 'coffee',
              title: 'coffee',
            },
          ],
          name: 'ANDRE CHARRIER',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=tVDt_i0AAAAJ&citpid=1',
        },
        {
          affiliations: 'Olam International Ltd',
          author_id: 'tM6ZAjUAAAAJ',
          cited_by: 8376,
          interests: [
            {
              keyword: 'coffee',
              title: 'coffee',
            },
            {
              keyword: 'farming_systems',
              title: 'farming systems',
            },
            {
              keyword: 'climate_change',
              title: 'climate change',
            },
            {
              keyword: 'sustainable_agriculture',
              title: 'sustainable agriculture',
            },
          ],
          name: 'Piet van Asten',
          open_to_collaborate: false,
          picture:
            'https://scholar.googleusercontent.com/citations?view_op=small_photo&user=tM6ZAjUAAAAJ&citpid=1',
        },
      ],
      next_page: 'xM2QAEXf__8J',
    } as unknown as AuthorSearchDataResponseDto).pipe(
      map((res) => this.toAuthorSearchDataMapperService.transform(res))
    );
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

  getAuthor(id: string): Observable<AuthorData> {
    const params = {
      author_id: id,
    };

    return of({
      affiliations:
        'Profesor Titular de Universidad. Universidad Complutense de Madrid',
      article_info: {
        available: 8,
        not_available: 5,
        total_number_articles: 13,
      },
      articles: [
        {
          authors:
            'JM Dodero, FJ García-Peñalvo, C González, P Moreno-Ger, MA Redondo, ...',
          cited_by: 62,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:b0M2c_1WBrUC',
          title:
            'Development of E-Learning Solutions: Different Approaches, a Common Mission',
          year: '2014',
        },
        {
          authors:
            'D Rodríguez-Cerezo, A Sarasa-Cabezuelo, M Gómez-Albarrán, ...',
          cited_by: 55,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:yD5IFk8b50cC',
          title:
            'Serious games in tertiary education: A case study concerning the comprehension of basic concepts in computer language implementation courses',
          year: '2014',
        },
        {
          authors: 'C Diaz-Sanmartín, A Sarasa-Cabezuelo',
          cited_by: 46,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:5F1dSjz1ScoC',
          title:
            'Application of Artificial Intelligence Techniques to Predict Survival in Kidney Transplantation: A Review',
          year: '2020',
        },
        {
          authors: 'A Sarasa-Cabezuelo, JM Dodero-Beardo',
          cited_by: 29,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:3fE2CSJIrl8C',
          title: 'Towards a model of quality for learning objects',
          year: '2004',
        },
        {
          authors: 'A Sarasa-Cabezuelo',
          cited_by: 26,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:EsrhoZGmrkoC',
          title: 'Prediction of Rainfall in Australia Using Machine Learning',
          year: '2022',
        },
        {
          authors: 'FJ García-Peñalvo, A Sarasa-Cabezuelo, JL Sierra-Rodríguez',
          cited_by: 24,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:1sJd4Hv_s6UC',
          title:
            'Innovating in the Engineering Processes. Engineering as a Means of Innovation',
          year: '2014',
        },
        {
          authors: 'FJ García Peñalvo, A Sarasa-Cabezuelo, JL Rodríguez-Sierra',
          cited_by: 23,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:NhqRSupF_l8C',
          title:
            'Innovando en los Procesos de Ingeniería. Ingeniería como Medio de Innovación',
          year: '2014',
        },
        {
          authors:
            'J Cigarrán-Recuero, J Gayoso-Cabada, M Rodríguez-Artacho, ...',
          cited_by: 20,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:_xSYboBqXhAC',
          title:
            'Assessing semantic annotation activities with formal concept analysis',
          year: '2014',
        },
        {
          authors:
            'JM Dodero, FJ García-Peñalvo, C González, P Moreno-Ger, MÁ Redondo, ...',
          cited_by: 20,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:dfsIfKJdRG4C',
          title:
            'Desarrollo de Soluciones para E-Learning: Diferentes Enfoques, un Objetivo Común',
          year: '2013',
        },
        {
          authors: 'A Sarasa-Cabezuelo',
          cited_by: 19,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:8AbLer7MMksC',
          title: 'Introduccion a las Bases de Datos NoSQL usando MongoDB',
          year: '2016',
        },
        {
          authors:
            'A Sarasa-Cabezuelo, B Temprado-Battad, JL Sierra-Rodriguez, ...',
          cited_by: 19,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:r0BpntZqJG4C',
          title: 'XML Language-Oriented Processing with XLOP',
          year: '2009',
        },
        {
          authors: 'A Sarasa-Cabezuelo',
          cited_by: 19,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:u5HHmVD_uO8C',
          title:
            'Usando la Wikipedia como motivación en el proceso de aprendizaje.',
          year: '2006',
        },
        {
          authors: 'A Sarasa-Cabezuelo',
          cited_by: 18,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:J-pR_7NvFogC',
          title: 'Gestión de la información web usando Python',
          year: '2016',
        },
        {
          authors: 'JM Dodero, P Díaz, I Aedo, A Sarasa-Cabezuelo',
          cited_by: 18,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:mVmsd5A6BfQC',
          title:
            'Integrating ontologies into the collaborative authoring of learning objects',
          year: '2005',
        },
        {
          authors: 'A Sarasa-Cabezuelo, JL Sierra-Rodriguez',
          cited_by: 17,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:TFP_iSt0sucC',
          title:
            'The grammatical approach: A syntax-directed declarative specification method for XML processing tasks',
          year: '2013',
        },
        {
          authors: 'M Canabal, A Sarasa-Cabezuelo, JC Sacristán',
          cited_by: 17,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:L8Ckcad2t8MC',
          title: 'LOM-ES: Un perfil de aplicación de LOM',
          year: '2008',
        },
        {
          authors:
            'A Sarasa-Cabezuelo, A Navarro-Iborra, JL Sierra-Rodríguez, ...',
          cited_by: 16,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:2osOgNQ5qMEC',
          title:
            'Building a syntax directed processing environment for XML documents by combining SAX and JavaCC',
          year: '2008',
        },
        {
          authors:
            'A Sarasa-Cabezuelo, B Temprado-Battad, D Rodríguez-Cerezo, ...',
          cited_by: 15,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:j3f4tGmQtD8C',
          title:
            'Building XML-driven application generators with compiler construction tools',
          year: '2012',
        },
        {
          authors: 'JM Canabal-Barreiro, A Sarasa- Cabezuelo',
          cited_by: 15,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:4DMP91E08xMC',
          title: 'Agrega-Plataforma de Objetos Digitales Educativos',
          year: '2007',
        },
        {
          authors: 'T Zarraonandía, JM Dodero, P Díaz, A Sarasa-Cabezuelo',
          cited_by: 15,
          link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=UF2TnzsAAAAJ&citation_for_view=UF2TnzsAAAAJ:dhFuZR0502QC',
          title:
            'Domain ontologies integration into the learning objects annotation process',
          year: '2004',
        },
      ],
      cited_by: {
        average: 45,
        graph: [
          {
            citations: 4,
            year: 2004,
          },
          {
            citations: 10,
            year: 2005,
          },
          {
            citations: 11,
            year: 2006,
          },
          {
            citations: 9,
            year: 2007,
          },
          {
            citations: 8,
            year: 2008,
          },
          {
            citations: 25,
            year: 2009,
          },
          {
            citations: 23,
            year: 2010,
          },
          {
            citations: 15,
            year: 2011,
          },
          {
            citations: 66,
            year: 2012,
          },
          {
            citations: 59,
            year: 2013,
          },
          {
            citations: 47,
            year: 2014,
          },
          {
            citations: 58,
            year: 2015,
          },
          {
            citations: 45,
            year: 2016,
          },
          {
            citations: 76,
            year: 2017,
          },
          {
            citations: 48,
            year: 2018,
          },
          {
            citations: 76,
            year: 2019,
          },
          {
            citations: 53,
            year: 2020,
          },
          {
            citations: 73,
            year: 2021,
          },
          {
            citations: 90,
            year: 2022,
          },
          {
            citations: 88,
            year: 2023,
          },
          {
            citations: 56,
            year: 2024,
          },
        ],
        total_citations: 962,
      },
      interests: [
        {
          keyword: 'language_processing',
          title: 'Language Processing',
        },
        {
          keyword: 'xml',
          title: 'XML',
        },
        {
          keyword: 'e_learning',
          title: 'E-learning',
        },
        {
          keyword: 'big_data',
          title: 'Big Data',
        },
      ],
      name: 'Antonio Sarasa-Cabezuelo',
      open_to_collaborate: Math.random() < 0.5,
      picture:
        'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=UF2TnzsAAAAJ&citpid=2',
    } as unknown as AuthorDataDto).pipe(
      map((res) => this.toAuthorDataMapperService.transform(res))
    );
    // return this.baseApiSvc
    //   .get<AuthorDataDto>(`${this.urlBase}search_author_id`, params)
    //   .pipe(
    //     map((res) => {
    //       return this.toAuthorDataMapperService.transform(res);
    //     })
    //   );
  }
}
