import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Articles } from 'src/app/models/author-data.model';
import {
  Interest,
  InterestsResponse,
} from 'src/app/models/interests-response.model';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-interest-page',
  templateUrl: './interest-page.component.html',
  styleUrls: ['./interest-page.component.css'],
})
export class InterestPageComponent implements OnInit, OnDestroy {
  @ViewChildren('switch') switches!: QueryList<ElementRef<HTMLInputElement>>;
  titulo: string = 'CHOOSE YOUR INTERESTS:';
  MAXINTERESTS = 5;
  form!: FormGroup;
  interestsList: string[] = [];
  remainingInt!: number;
  options: Interest[] = [];
  userInterests: Interest[] = [];
  newUser = true;

  componentDestroyed$ = new Subject<void>();

  get interests(): FormArray {
    return this.form.get('interests') as FormArray;
  }

  getSubcategories(index: number): FormArray {
    return this.interests.at(index)?.get('subcategories') as FormArray;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private notificationSvc: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const user = JSON.parse(sessionStorage.getItem('user') ?? '');
    if (user != null)
      this.userService
        .getUserInterests(user.mail)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe((res) => {
          this.fillForm(res);
          this.newUser = res.userInterests.length == 0;
        });
    this.remainingInt = this.MAXINTERESTS - this.interestsList.length;
  }

  initForm() {
    this.form = this.fb.group({
      interests: this.fb.array(
        [this.createInterestGroup()],
        Validators.required
      ),
    });
  }

  createInterestGroup(): FormGroup {
    return this.fb.group({
      mainCategory: [''],
      subcategories: this.fb.array(
        [this.createSubcategory()],
        Validators.minLength(1)
      ),
    });
  }

  createSubcategory(): FormGroup {
    return this.fb.group({
      keyword: [''],
      title: [''],
      checked: [false],
    });
  }

  fillForm(data: InterestsResponse) {
    const interestsData = data as InterestsResponse;
    this.fillInterests(interestsData.interests);
    this.checkInterests(interestsData.userInterests);
    this.form.patchValue(interestsData.interests);
  }

  fillInterests(data: Interest[]) {
    const interestArray = this.form.get('interests') as FormArray;
    interestArray.clear();
    data.forEach((int: Interest, i: number) => {
      interestArray.push(
        this.fb.group({
          mainCategory: int.mainCategory,
          subcategories: this.fb.array(
            [this.createSubcategory()],
            Validators.minLength(1)
          ),
        })
      );
      this.fillSubcategories(int.subcategories, i);
    });
  }

  fillSubcategories(subCategory: any[], i: number) {
    const subcategoryArray = this.getSubcategories(i) as FormArray;
    subcategoryArray.clear();
    subCategory.forEach((sub) => {
      subcategoryArray.push(
        this.fb.group({
          keyword: sub.keyword,
          title: sub.title,
          checked: false,
        })
      );
    });
  }

  checkInterests(data: Interest[]) {
    data.forEach((userInt) => {
      this.interests.controls.forEach((formInt, i) => {
        if (formInt.get('mainCategory')?.value == userInt.mainCategory) {
          userInt.subcategories.forEach((userSub) => {
            this.getSubcategories(i).controls.forEach((formSub) => {
              if (formSub.get('keyword')?.value == userSub.keyword) {
                formSub.get('checked')?.setValue(true);
                this.interestsList.push(formSub.get('keyword')?.value);
              }
            });
          });
        }
      });
    });

    this.checkLimit();
  }

  onChange() {
    const checkedItems = this.switches.filter((sw) => sw.nativeElement.checked);
    this.interestsList = checkedItems.map((x) => x.nativeElement.defaultValue);

    this.checkLimit();
  }

  checkLimit() {
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
      this.interests
        .at(index)
        ?.get('subcategories')
        ?.value.map((sub: any) => sub.title)
        .filter((titles: any) => titles !== undefined) ?? ['']
    );
  }

  saveInterests() {
    const body = this.getBody();
    const interests = body.map((int) => ({
      keyword: int.keyword,
      title: int.title,
    }));
    debugger;
    sessionStorage.setItem('interests', JSON.stringify(interests));
    this.userService
      .saveInterests(body)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (res) => {
          if (this.newUser) this.router.navigate(['/home']);
          else this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.notificationSvc.error(err.message, 'ERROR!');
        },
      });
  }

  getBody() {
    let body: any[] = [];
    this.form.get('interests')?.value.map((int: any) => {
      const aux = int.subcategories.filter((sub: any) => sub.checked == true);
      if (aux.length > 0) {
        aux.forEach((res: any) => {
          body.push({
            keyword: res.keyword,
            main_category: int.mainCategory,
            title: res.title,
          });
        });
      }
    });
    return body.flat();
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
