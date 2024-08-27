import { group } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { ProfileData } from 'src/app/models/profile-data.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  data$!: Observable<ProfileData> | undefined;
  editingSocials = false;
  editingData = false;
  form!: FormGroup;

  private readonly componentDestroyed$ = new Subject<void>();

  get interests(): FormArray {
    return <FormArray>this.form.get('interests')?.value;
  }

  // get socials(): FormArray {
  //   return <FormArray>this.form.get('socials')?.value;
  // }

  constructor(private userSvc: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.initForm();
    this.data$ =
      this.userSvc.getProfileData(user.mail).pipe(
        takeUntil(this.componentDestroyed$),
        tap((res) => {
          this.fillForm(res);
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
        items: this.fb.array([{
          name: ['',Validators.required],
          url: ['',Validators.required]
        }])
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
