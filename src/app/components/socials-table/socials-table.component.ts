import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'socials-table',
  templateUrl: './socials-table.component.html',
  styleUrls: ['./socials-table.component.css'],
})
export class SocialsTableComponent implements OnInit {
  @ViewChild('newItemContainer') newItem!: ElementRef;
  @Input() formGroupName!: string;
  @Input() socials: any[] = [];

  form!: FormGroup;
  editing = true;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private renderer: Renderer2
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
    this.form
      .get('url')
      ?.valueChanges.pipe(
        (filter((value) => value !== null), takeUntil(this._unsubscribeAll))
      );
  }

  editSocials() {
    console.log('editando');
    this.form.enable();
    this.editing = true;
  }

  saveSocials() {
    console.log('guardado');
    this.form.disable();
    this.editing = false;
  }

  addSocial() {}

  addSocialInput() {
    debugger;

  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
