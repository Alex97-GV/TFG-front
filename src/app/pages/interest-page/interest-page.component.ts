import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interest-page',
  templateUrl: './interest-page.component.html',
  styleUrls: ['./interest-page.component.css'],
})
export class InterestPageComponent implements OnInit {
  @ViewChildren('switch') switches!: QueryList<ElementRef<HTMLInputElement>>;
  titulo: string = 'Selecciona tus Intereses';
  MAXINTERESTS = 5;
  form!: FormGroup;
  interestsList: string[] = [];
  remainingInt!: number;

  options = [
    {
      mainCategory: 'Business, Economics and Management',
      subcategories: [
        {
          title: 'General',
          keyword: 'business_economics_&_finance',
        },
        {
          title: 'Finance',
          keyword: 'finance',
        },
        {
          title: 'Entrepreneurship & Innovation',
          keyword: 'entrepreneurship_&_innovation',
        },
      ],
    },
    {
      mainCategory: 'Chemical & Material Sciences',
      subcategories: [
        {
          title: 'General',
          keyword: 'chemical_&_material_sciences',
        },
        {
          title: 'Polymers & Plastics',
          keyword: 'polymers_&_plastics',
        },
        {
          title: 'Medicinal Chemistry',
          keyword: 'medicinal_chemistry',
        },
      ],
    },
    {
      mainCategory: 'Engineering & Computer Science',
      subcategories: [
        {
          title: 'General',
          keyword: 'engineering_&_computer_science',
        },
        {
          title: 'Aritificial Intelligence',
          keyword: 'artificial_intelligence',
        },
        {
          title: 'Bioinformatics & Computational Biology',
          keyword: 'bioinformatics_&_computational_biology',
        },
      ],
    },
    {
      mainCategory: 'Health & Medical Sciences',
      subcategories: [
        {
          title: 'General',
          keyword: 'health_&_medical_sciences',
        },
        {
          title: 'Genetics & Genomics',
          keyword: 'genetics_&_genomics',
        },
        {
          title: 'Psychology',
          keyword: 'psychology',
        },
      ],
    },
    {
      mainCategory: 'Humanities, Literature & Arts',
      subcategories: [
        {
          title: 'General',
          keyword: 'humanities_literature_&_arts',
        },
        {
          title: 'History',
          keyword: 'history',
        },
        {
          title: 'Philosophy',
          keyword: 'philosophy',
        },
        {
          title: 'Feminism & Women`s Studies',
          keyword: 'feminism_&_womens_studies',
        },
      ],
    },
    {
      mainCategory: 'Life Sciences & Earth Sciences',
      subcategories: [
        {
          title: 'General',
          keyword: 'life_sciences_&_earth_sciences',
        },
        {
          title: 'Food Science & Technology',
          keyword: 'food_science_&_technology',
        },
        {
          title: 'Sustainable Development',
          keyword: 'sustainable_development',
        },
      ],
    },
    {
      mainCategory: 'Physics & Mathematics',
      subcategories: [
        {
          title: 'Mathematics Optimization',
          keyword: 'mathematics_optimization',
        },
        {
          title: 'Astronomy & Astrophysics',
          keyword: 'astronomy_&_astrophysics',
        },
        {
          title: 'Optic & Photonics',
          keyword: 'optic_&_photonics',
        },
      ],
    },
    {
      mainCategory: 'Social Sciences',
      subcategories: [
        {
          title: 'Political Science',
          keyword: 'political_science',
        },
        {
          title: 'Education',
          keyword: 'education',
        },
        {
          title: 'Ethics',
          keyword: 'ethics',
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  getSubcategoriesTitles(index: number) {
    return (
      this.options
        .at(index)
        ?.subcategories.map((sub) => sub.title)
        .filter((titles) => titles !== undefined) ?? ['']
    );
  }

  ngOnInit(): void {
    this.remainingInt = this.MAXINTERESTS - this.interestsList.length;
  }

  onChange(event: any) {
    const checkedItems = this.switches.filter((sw) => sw.nativeElement.checked);
    this.interestsList = checkedItems.map((x) => x.nativeElement.defaultValue);

    const uncheckedItems = this.switches.filter(
      (sw) => !sw.nativeElement.checked
    );
    uncheckedItems.map(
      (sw) =>
        (sw.nativeElement.disabled =
          this.getDisabled())
    );

    this.remainingInt = this.MAXINTERESTS - this.interestsList.length;
  }

  getDisabled(): boolean {
    return this.interestsList.length >= this.MAXINTERESTS; 
  }
}
