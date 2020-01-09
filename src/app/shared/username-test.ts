import { AbstractControl} from '@angular/forms';

export function usernamevalidator(control:AbstractControl):{[key:string]:any}| null{
const forbidden = /admin/.test(control.value);
return forbidden ? {'forbidden': {value:control.value}}:null;
}