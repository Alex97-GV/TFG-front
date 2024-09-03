import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AuthorData } from 'src/app/models/author-data.model';
import { ProfileData } from 'src/app/models/profile-data.model';
import {
  Column,
  TableConfiguration,
} from 'src/app/models/table-configuration.model';
import { DataService } from 'src/app/services/data-service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  data$!: Observable<ProfileData> | undefined;
  dataTableConfiguration = new TableConfiguration<AuthorData>({
    data: undefined,
    columns: [
      new Column({
        name: 'title',
        title: 'Title',
      }),
      new Column({
        name: 'writtenBy',
        title: 'Written By',
        width: '20rem',
      }),
      new Column({
        name: 'citedBy',
        title: 'Cited By',
        width: '6rem',
        align: 'center',
      }),
      new Column({
        name: 'year',
        title: 'Year',
        width: '6rem',
        align: 'center',
      }),
    ],
  });
  editingSocials = false;
  editingData = false;
  form!: FormGroup;

  private readonly componentDestroyed$ = new Subject<void>();

  get interests(): FormArray {
    return <FormArray>this.form.get('interests')?.value;
  }

  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private dataSvc: DataService,
    private notificationSvc: NotificationService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.initForm();
    this.data$ =
      this.userSvc.getProfileData(user.mail).pipe(
        takeUntil(this.componentDestroyed$),
        tap((res) => {
          this.fillForm(res);
          this.getDataTable(res.id);
        })
      ) ?? undefined;
  }

  initForm() {
    this.form = this.fb.group({
      openToCollab: [false],
      generalInfo: this.fb.group({
        fullName: [{ value: '', disabled: true }],
        picture: [{ value: '', disabled: true }],
        interests: this.fb.array([this.createInterestGroup()]),
        affiliation: [{ value: '', disabled: true }],
        email: [{ value: '', disabled: true }],
        phone: [{ value: '', disabled: true }],
      }),
      socials: this.fb.group({
        items: this.fb.array([this.createItemsGroup()]),
      }),
      id: [''],
    });
  }

  createItemsGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  createInterestGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      keyword: ['', Validators.required],
      mainCategory: ['', Validators.required],
    });
  }

  fillForm(data: ProfileData) {
    const profileData = data as ProfileData;
    this.fillInterests(profileData);
    this.fillSocials(profileData);
    this.form.patchValue(profileData);
  }

  fillInterests(data: ProfileData) {
    const interestArray = this.form.get('generalInfo.interests') as FormArray;
    interestArray.clear();
    data.generalInfo.interests.forEach((int: any) => {
      interestArray.push(
        this.fb.group({
          title: int.title,
          keyword: int.keyword,
          mainCategory: int.mainCategory,
        })
      );
    });
  }

  fillSocials(data: ProfileData) {
    const socials = this.form.get('socials.items') as FormArray;
    if (socials) socials.clear();
    data.socials.items.forEach((sn) => {
      socials.push(
        this.fb.group({
          name: sn.name,
          url: sn.url,
        })
      );
    });
  }

  getDataTable(id: string) {
    this.dataSvc
      .getAuthor(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((res) => {
        this.dataTableConfiguration.data = res.articles;
      });
  }

  saveProfile() {
    this.userSvc
      .saveProfileData(this.form.getRawValue())
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (res) => {
          this.fillForm(res);
          this.notificationSvc.success(
            'Changes have been saved successfully',
            'SAVED SUCCESSFULLY!'
          );
        },
        error: (err) => {
          this.notificationSvc.error(
            'There was a problem saving changes',
            'ERROR!'
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
