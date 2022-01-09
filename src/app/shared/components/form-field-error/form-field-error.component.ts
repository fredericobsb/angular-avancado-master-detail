import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null{
    if(this.formControl.invalid && this.formControl.touched){
        if(this.formControl.errors.required) {
          return "dado obrigatório";
        }
        else if (this.formControl.errors.minlength) {
          const requiredLength = this.formControl.errors.minlength.requiredLength;
          return `deve ter no mínimo  ${requiredLength} caracteres`; 
        }
    } else if(this.formControl.errors && this.formControl.errors.maxLength) {
        const requiredLength = this.formControl.errors.maxlength.requiredLength;
        return `deve ter no máximo  ${requiredLength} caracteres`; 
    } else {
      return null;
    }
  }

}
