import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'socials-table',
  templateUrl: './socials-table.component.html',
  styleUrls: ['./socials-table.component.css'],
})
export class SocialsTableComponent implements OnInit {
  @Input() formGroupName!: string;
  @Input() socials: string[] = ['Twitter', 'Instagram', 'Facebook', 'Youtube'];

  hoverSaveSocials = false;

  form!: FormGroup;
  editing = false;

  private _unsubscribeAll: Subject<any>;

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    const parentForm = this.rootFormGroup.control as FormGroup;
    debugger;
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

  checkIfEmpty() {
    if (this.items.length == 0) this.addSocial();
  }

  editSocials() {
    debugger;
    this.checkIfEmpty();
    this.form.enable({ emitEvent: false });
    this.editing = true;
  }

  saveSocials() {
    debugger;
    this.deleteNotValids();
    this.form.disable({ emitEvent: false });
    this.editing = false;
  }

  deleteNotValids() {
    if (this.items.length > 0) {
      this.items.controls.map((control, i) => {
        if (control.invalid) this.deleteSocial(i);
      });
    }
  }

  deleteSocial(index: number) {
    if (this.items.length > 0) {
      this.items.removeAt(index, { emitEvent: false });
    }
  }

  setControlName(name: string, index: number) {
    debugger;
    this.items.at(index).get('name')?.setValue(name, { emitEvent: false });
  }

  addSocial() {
    debugger;
    this.items.push(
      this.fb.group({
        name: ['', Validators.required],
        url: ['', Validators.required],
      })
    );
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
