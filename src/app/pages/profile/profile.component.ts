import { group } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { AuthorData } from 'src/app/models/author-data.model';
import { ProfileData } from 'src/app/models/profile-data.model';
import {
  Column,
  TableConfiguration,
} from 'src/app/models/table-configuration.model';
import { DataService } from 'src/app/services/data-service';
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
    private dataSvc: DataService
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

    this.setSubscriptions();
  }

  initForm() {
    this.form = this.fb.group({
      fullName: [{ value: '', disabled: true }],
      picture: [{ value: null, disabled: true }],
      openToCollab: [false],
      interests: [[]],
      affiliation: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      socials: this.fb.group({
        items: this.fb.array([]),
      }),
    });
  }

  fillForm(data: ProfileData) {
    this.form.patchValue(
      {
        fullName: data.name,
        picture: data.picture,
        openToCollab: data.openToCollaborate,
        interests: this.fb.array(
          data.interests.map((int) => {
            return this.fb.group({
              keyword: int.keyword,
              title: int.title,
            });
          })
        ),
        affiliation: data.affiliation,
        email: data.email,
        phone: data.phone,
        socials: this.fb.array(
          data.ssnn.map((social) => {
            return this.fb.group({
              name: social.name,
              url: social.url,
            });
          })
        ),
      },
      { emitEvent: false }
    );
    // debugger;
  }

  setSubscriptions() {
    this.form.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((res) => {
        // debugger;
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

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  editData() {
    this.form.enable();
    this.editingData = true;
  }

  saveData() {
    this.form.disable();
    this.editingData = false;
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
