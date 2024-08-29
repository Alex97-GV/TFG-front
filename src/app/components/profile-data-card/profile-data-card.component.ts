import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'profile-data-card',
  templateUrl: './profile-data-card.component.html',
  styleUrls: ['./profile-data-card.component.css'],
})
export class ProfileDataCardComponent implements OnInit, OnDestroy {
  @Input() formGroupName!: string;

  hoverOverSave = false;

  form!: FormGroup;
  editing = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private rooFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    const parentForm = this.rooFormGroup.control as FormGroup;

    if (this.formGroupName && parentForm) {
      this.form = parentForm.get(this.formGroupName) as FormGroup;
      this.setSubscriptions();
    }
  }

  setSubscriptions() {
    this.form.valueChanges.subscribe((val) => {
      debugger;
    });
  }

  editData() {
    this.form.enable();
    this.editing = true;
  }

  saveData() {
    this.form.disable();
    this.editing = false;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.complete();
  }
}
