import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'profile-data-card',
  templateUrl: './profile-data-card.component.html',
  styleUrls: ['./profile-data-card.component.css'],
})
export class ProfileDataCardComponent implements OnInit, OnDestroy {
  @Input() formGroupName!: string;
  @Output() saveEvent = new EventEmitter<boolean>();

  hoverOverSave = false;

  form!: FormGroup;
  editing = false;

  private _unsubscribeAll: Subject<void>;

  constructor(
    private rooFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject<void>();
  }

  ngOnInit(): void {
    const parentForm = this.rooFormGroup.control as FormGroup;

    if (this.formGroupName && parentForm) {
      this.form = parentForm.get(this.formGroupName) as FormGroup;
    }
  }

  editData() {
    this.form.enable();
    this.form.get('email')?.disable();
    this.editing = true;
  }

  saveData() {
    this.form.disable();
    this.editing = false;
    this.saveEvent.emit(true);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.complete();
  }
}
