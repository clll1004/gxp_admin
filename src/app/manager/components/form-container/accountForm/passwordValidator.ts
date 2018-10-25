/**
 * Created by GRE511 on 2018-07-06.
 */
import { AbstractControl } from '@angular/forms';

export class AccountFormValidator {
  static checkPassword(AC: AbstractControl) {
    const password = AC.get('usr_pw').value;
    const confirmPassword = AC.get('usr_pw_cf').value;
    if(password != confirmPassword) {
      AC.get('usr_pw_cf').setErrors({checkPassword: true})
    } else {
      return null;
    }
  }
}