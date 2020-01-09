import { AbstractControl} from '@angular/forms'

export function passwordvalidator(control:AbstractControl):{[key:string]:boolean}|null{
    const password = control.get('password');
    const confirmpassword = control.get('confirmpassword');
    return password && confirmpassword && password.value !== confirmpassword.value ? {'mismatch':true} : null;
}