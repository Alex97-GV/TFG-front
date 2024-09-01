import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-general-info-card',
  templateUrl: './profile-general-info-card.component.html',
  styleUrls: ['./profile-general-info-card.component.css'],
})
export class ProfileGeneralInfoCardComponent {
  @Input() picture = '';
  @Input() fullName = '';
  @Input() affiliation = '';
  @Input() interests: any[] = [];

  constructor(private router: Router) {}

  searchInterests(keyword: string) {
    this.router.navigate([`search/interests/${keyword}`]);
  }
}
