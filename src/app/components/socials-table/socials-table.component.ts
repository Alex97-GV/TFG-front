import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'socials-table',
  templateUrl: './socials-table.component.html',
  styleUrls: ['./socials-table.component.css'],
})
export class SocialsTableComponent implements OnInit {
  @Input() formGroupName!: string;
  @Input() socials: string[] = ['Twitter', 'Instagram', 'Facebook', 'Youtube'];
  @Output() saveData = new EventEmitter<boolean>();

  hoverSaveSocials = false;

  form!: FormGroup;
  editing = false;

  private _unsubscribeAll: Subject<any>;

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder,
    private userSvc: UserService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    const parentForm = this.rootFormGroup.control as FormGroup;
    if (this.formGroupName && parentForm) {
      this.form = parentForm.get(this.formGroupName) as FormGroup;
      this.setSubscriptions();
    }
  }

  setSubscriptions() {
    // this.form.valueChanges.subscribe((val) => {
    //   debugger;
    // });
  }

  checkIfEmpty() {
    if (this.items.length == 0) this.addSocial();
  }

  editSocials() {
    this.checkIfEmpty();
    this.form.enable({ emitEvent: false });
    this.editing = true;
  }

  saveSocials() {
    this.deleteNotValids();
    this.form.disable({ emitEvent: false });
    this.editing = false;
    this.saveData.emit(true);
  }

  deleteNotValids() {
    if (this.items.length > 0) {
      this.items.controls = this.items.controls.filter((ctl) => ctl.valid);
    }
  }

  allConditionsAreValid(): boolean {
    return this.items.controls.every((control) => control.valid);
  }

  deleteSocial(index: number) {
    if (this.items.length > 0) {
      this.items.removeAt(index, { emitEvent: false });
    }
  }

  setControlName(name: string, index: number) {
    this.items.at(index).get('name')?.setValue(name, { emitEvent: false });
  }

  addSocial() {
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
