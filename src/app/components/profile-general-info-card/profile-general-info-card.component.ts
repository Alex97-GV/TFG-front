import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'profile-general-info-card',
  templateUrl: './profile-general-info-card.component.html',
  styleUrls: ['./profile-general-info-card.component.css'],
})
export class ProfileGeneralInfoCardComponent implements OnInit {
  @Input() formGroupName!: string;
  @Output() saveData = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private router: Router,
    private rootFormGroup: FormGroupDirective,
    private notificationSvc: NotificationService
  ) {}

  ngOnInit(): void {
    const parentForm = this.rootFormGroup.control as FormGroup;
    if (this.formGroupName && parentForm) {
      this.form = parentForm.get(this.formGroupName) as FormGroup;
    }
  }

  searchInterests(keyword: string) {
    this.router.navigate([`search/interests/${keyword}`]);
  }

  onFileChange(evt: any) {
    const file = evt.target.files[0];
    const reader = new FileReader();
    if (!file.type.match(/image-*/)) {
      this.notificationSvc.error('Invalid format', 'ERROR!');
      this.resetInput();
    }

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleReaderLoaded(e: any) {
    let reader = e.target;

    const result = reader.result;
    this.form.get('picture')?.setValue(result);
    this.saveData.emit();
    this.resetInput();
  }

  resetInput() {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) input.value = '';
  }
}
