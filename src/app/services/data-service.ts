import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { map, Observable, of, takeUntil } from 'rxjs';
import { Data } from '../models/data.model';
import { ToDataMapperService } from '../mappers/to-data.mapper';
import { AuthorDataDto } from '../models/author-data-dto.interface';
import { AuthorData } from '../models/author-data.model';
import { ToAuthorDataMapperService } from '../mappers/to-author-data.mapper';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private baseApiSvc: BaseApiService,
    private toDataMapperService: ToDataMapperService,
    private toAuthorDataMapperService: ToAuthorDataMapperService
  ) {}

  search(data: any): Observable<Data[]> {
    let params = {};
    if (data.key) params = { ...params, key: data.key };

    return of([
      {
        affiliation: 'Postdoctoral research assistant, University of Bremen',
        citedby: 56666,
        email_domain: '@collision-detection.com',
        filled: false,
        interests: [
          'Computer Graphics',
          'Collision Detection',
          'Haptics',
          'Geometric Data Structures',
        ],
        name: 'Rene Weller',
        scholar_id: 'lHrs3Y4AAAAJ',
        source: 'SEARCH_AUTHOR_SNIPPETS',
        url_picture:
          'https://scholar.google.com/citations?view_op=medium_photo&user=lHrs3Y4AAAAJ',
      },
      {
        affiliation: 'Postdoctoral research assistant, University of Bremen',
        citedby: 56666,
        email_domain: '@collision-detection.com',
        filled: false,
        interests: [
          'Computer Graphics',
          'Collision Detection',
          'Haptics',
          'Geometric Data Structures',
        ],
        name: 'Rene Weller',
        scholar_id: 'lHrs3Y4AAAAJ',
        source: 'SEARCH_AUTHOR_SNIPPETS',
        url_picture:
          'https://scholar.google.com/citations?view_op=medium_photo&user=lHrs3Y4AAAAJ',
      },
    ]).pipe(map((data) => this.toDataMapperService.transform(data)));
    // return this.baseApiSvc
    //   .get<DataDto>(`${this.url}`, params)
    //   .pipe(map((data) => this.toDataMapperService.transform(data)));
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

    return of(
      new AuthorData({
        name: 'Antonio Barba-Juan',
        picture:
          'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=JtmmReIAAAAJ&citpid=12',
        affiliations:
          'Full Professor, Chemical Engineering Department, Universitat Jaume I',
        interests: [
          {
            title: 'chemical engineering',
            keyword: 'chemical_engineering',
          },
          {
            title: 'materials science',
            keyword: 'materials_science',
          },
          {
            title: 'ceramics',
            keyword: 'ceramics',
          },
        ],
        articles: {
          totalNumberArticles: 21,
          notAvailable: 3,
          available: 18,
          data: [
            {
              title:
                'Materias primas para la fabricación de soportes de baldosas cerámicas',
              link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=JtmmReIAAAAJ&citation_for_view=JtmmReIAAAAJ:hC7cP41nSMkC',
              citation_id: 'JtmmReIAAAAJ:hC7cP41nSMkC',
              authors: 'A Barba',
              publication: 'Instituto de Tecnología Cerámica, 2002',
              cited_by: {
                value: 401,
                link: 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=10092473749671158500,669156891253060146,15715042954216778403',
                serpapi_link:
                  'https://serpapi.com/search.json?cites=10092473749671158500%2C669156891253060146%2C15715042954216778403&engine=google_scholar&hl=en',
                cites_id:
                  '10092473749671158500,669156891253060146,15715042954216778403',
              },
              year: '2002',
            },
            {
              title:
                'Ceramic wastes as alternative raw materials for Portland cement clinker production',
              link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=JtmmReIAAAAJ&citation_for_view=JtmmReIAAAAJ:L8Ckcad2t8MC',
              citation_id: 'JtmmReIAAAAJ:L8Ckcad2t8MC',
              authors:
                'F Puertas, I García-Díaz, A Barba, MF Gazulla, M Palacios, MP Gómez, ...',
              publication:
                'Cement and Concrete Composites 30 (9), 798-805, 2008',
              cited_by: {
                value: 306,
                link: 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=11423445960636737524',
                serpapi_link:
                  'https://serpapi.com/search.json?cites=11423445960636737524&engine=google_scholar&hl=en',
                cites_id: '11423445960636737524',
              },
              year: '2008',
            },
            {
              title:
                'Alkaline activation of metakaolin–fly ash mixtures: Obtain of Zeoceramics and Zeocements',
              link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=JtmmReIAAAAJ&citation_for_view=JtmmReIAAAAJ:7PzlFSSx8tAC',
              citation_id: 'JtmmReIAAAAJ:7PzlFSSx8tAC',
              authors:
                'A Fernández-Jiménez, M Monzó, M Vicent, A Barba, A Palomo',
              publication:
                'Microporous and mesoporous materials 108 (1-3), 41-49, 2008',
              cited_by: {
                value: 260,
                link: 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=15601441664307935857',
                serpapi_link:
                  'https://serpapi.com/search.json?cites=15601441664307935857&engine=google_scholar&hl=en',
                cites_id: '15601441664307935857',
              },
              year: '2008',
            },
            {
              title:
                'Characterization of silica–water nanofluids dispersed with an ultrasound probe: A study of their physical properties and stability',
              link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=JtmmReIAAAAJ&citation_for_view=JtmmReIAAAAJ:p2g8aNsByqUC',
              citation_id: 'JtmmReIAAAAJ:p2g8aNsByqUC',
              authors: 'R Mondragon, JE Julia, A Barba, JC Jarque',
              publication: 'Powder Technology 224, 138-146, 2012',
              cited_by: {
                value: 171,
                link: 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=17873944402356382978',
                serpapi_link:
                  'https://serpapi.com/search.json?cites=17873944402356382978&engine=google_scholar&hl=en',
                cites_id: '17873944402356382978',
              },
              year: '2012',
            },
            {
              title:
                'Ceramic wastes as raw materials in Portland cement clinker fabrication: characterization and alkaline activation',
              link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=JtmmReIAAAAJ&citation_for_view=JtmmReIAAAAJ:maZDTaKrznsC',
              citation_id: 'JtmmReIAAAAJ:maZDTaKrznsC',
              authors:
                'F Puertas, A Barba, MF Gazulla, MP Gómez, M Palacios, ...',
              publication: 'Materiales de Construcción 56 (281), 73-84, 2006',
              cited_by: {
                value: 114,
                link: 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=7267215932378267653,13536948704417576356',
                serpapi_link:
                  'https://serpapi.com/search.json?cites=7267215932378267653%2C13536948704417576356&engine=google_scholar&hl=en',
                cites_id: '7267215932378267653,13536948704417576356',
              },
              year: '2006',
            },
            {
              title:
                'Geopolymeric binders with different fine fillers—Phase transformations at high temperatures',
              link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=JtmmReIAAAAJ&citation_for_view=JtmmReIAAAAJ:mB3voiENLucC',
              citation_id: 'JtmmReIAAAAJ:mB3voiENLucC',
              authors:
                'A Buchwald, M Vicent, R Kriegel, C Kaps, M Monzó, A Barba',
              publication: 'Applied Clay Science 46 (2), 190-195, 2009',
              cited_by: {
                value: 94,
                link: 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=9996519423019182673',
                serpapi_link:
                  'https://serpapi.com/search.json?cites=9996519423019182673&engine=google_scholar&hl=en',
                cites_id: '9996519423019182673',
              },
              year: '2009',
            },
            {
              title:
                'Effect of sodium addition on the preparation of hydroxyapatites and biphasic ceramics',
              link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=JtmmReIAAAAJ&citation_for_view=JtmmReIAAAAJ:IWHjjKOFINEC',
              citation_id: 'JtmmReIAAAAJ:IWHjjKOFINEC',
              authors: 'S Kannan, JMG Ventura, AF Lemos, A Barba, JMF Ferreira',
              publication: 'Ceramics International 34 (1), 7-13, 2008',
              cited_by: {
                value: 90,
                link: 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=3079475571947290500',
                serpapi_link:
                  'https://serpapi.com/search.json?cites=3079475571947290500&engine=google_scholar&hl=en',
                cites_id: '3079475571947290500',
              },
              year: '2008',
            },
          ],
        },
        citedBy: {
          table: {
            citations: 2786,
            hIndex: 24,
            i10Index: 53,
          },
          graph: [
            {
              year: 1998,
              citations: 13,
            },
            {
              year: 1999,
              citations: 9,
            },
            {
              year: 2000,
              citations: 19,
            },
            {
              year: 2001,
              citations: 16,
            },
            {
              year: 2002,
              citations: 20,
            },
            {
              year: 2003,
              citations: 21,
            },
            {
              year: 2004,
              citations: 25,
            },
            {
              year: 2005,
              citations: 67,
            },
            {
              year: 2006,
              citations: 57,
            },
            {
              year: 2007,
              citations: 60,
            },
            {
              year: 2008,
              citations: 78,
            },
            {
              year: 2009,
              citations: 94,
            },
            {
              year: 2010,
              citations: 99,
            },
            {
              year: 2011,
              citations: 129,
            },
            {
              year: 2012,
              citations: 116,
            },
            {
              year: 2013,
              citations: 131,
            },
            {
              year: 2014,
              citations: 148,
            },
            {
              year: 2015,
              citations: 137,
            },
            {
              year: 2016,
              citations: 165,
            },
            {
              year: 2017,
              citations: 146,
            },
            {
              year: 2018,
              citations: 155,
            },
            {
              year: 2019,
              citations: 172,
            },
            {
              year: 2020,
              citations: 172,
            },
            {
              year: 2021,
              citations: 214,
            },
            {
              year: 2022,
              citations: 187,
            },
            {
              year: 2023,
              citations: 167,
            },
            {
              year: 2024,
              citations: 136,
            },
          ],
          average: 200,
          openToCollaborate: true,
        },
      })
    );

    // return this.baseApiSvc
    //   .get<AuthorDataDto>(`http://127.0.0.1:5000/api/search_author_id`, params)
    //   .pipe(
    //     map((res) => {
    //       debugger;
    //       return this.toAuthorDataMapperService.transform(res);
    //     })
    //   );
  }
}
