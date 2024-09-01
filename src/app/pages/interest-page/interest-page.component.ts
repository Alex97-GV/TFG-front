import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Interest } from 'src/app/models/interests-response.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-interest-page',
  templateUrl: './interest-page.component.html',
  styleUrls: ['./interest-page.component.css'],
})
export class InterestPageComponent implements OnInit, OnDestroy {
  @ViewChildren('switch') switches!: QueryList<ElementRef<HTMLInputElement>>;
  titulo: string = 'Selecciona tus Intereses';
  MAXINTERESTS = 5;
  form!: FormGroup;
  interestsList: string[] = [];
  remainingInt!: number;
  options: Interest[] = [];

  componentDestroyed$ = new Subject<void>();

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') ?? '');
    if (user != null)
      this.userService
        .getUserInterests(user.mail)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe((res) => {
          this.options = res.interests;
        });
    this.remainingInt = this.MAXINTERESTS - this.interestsList.length;
  }

  onChange(event: any) {
    const checkedItems = this.switches.filter((sw) => sw.nativeElement.checked);
    this.interestsList = checkedItems.map((x) => x.nativeElement.defaultValue);

    const uncheckedItems = this.switches.filter(
      (sw) => !sw.nativeElement.checked
    );
    uncheckedItems.map(
      (sw) => (sw.nativeElement.disabled = this.getDisabledSwitches())
    );

    this.remainingInt = this.MAXINTERESTS - this.interestsList.length;
  }

  getSubcategoriesTitles(index: number) {
    return (
      this.options
        .at(index)
        ?.subcategories.map((sub) => sub.title)
        .filter((titles) => titles !== undefined) ?? ['']
    );
  }

  saveInterests() {
    this.userService
      .saveInterests(this.interestsList)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (res) => {
          //save Interests in sessionStorage
          this.router.navigate(['/home']);
        },
        error: (err) => {},
      });
  }

  getDisabledSwitches(): boolean {
    return this.interestsList.length >= this.MAXINTERESTS;
  }

  getDisabledSave(): boolean {
    return this.interestsList.length >= 1;
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
