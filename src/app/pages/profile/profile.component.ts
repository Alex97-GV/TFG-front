import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      socials: [[]],
    });
  }

  fillForm(data: ProfileData) {
    this.form.patchValue(
      {
        fullName: data.name,
        picture: data.picture,
        openToCollab: data.openToCollaborate,
        interests: data.interests,
        affiliation: data.affiliation,
        email: data.email,
        phone: data.phone,
        socials: data.ssnn,
      },
      { emitEvent: false }
    );
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  editSocials() {
    this.form.enable();
    this.editingSocials = true;
  }

  saveSocials() {
    this.form.disable();
    this.editingSocials = false;
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
