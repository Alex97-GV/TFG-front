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
export class ProfileGeneralInfoCardComponent implements OnInit, OnChanges {
  @Input() picture = '';
  @Input() fullName = '';
  @Input() affiliation = '';
  @Input() interests: any[] = [];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
  }

  searchInterests(keyword: string) {
    this.router.navigate([`search/interest/${keyword}`]);
  }

  ngOnInit(): void {}
}
