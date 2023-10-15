import { Injectable } from '@angular/core';
import { user } from '../modal/users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  constructor() {}
  public users: user[] = [
    {
      firstName: 'Ravi',
      lastName: 'Kumar',
      role: 'Manager',
      email: 'ravi.kumar@save.in',
      sendAutomaticPasswordTo: 'admin@shcgroup.in',
      lastSignIn: '191.123.0.1 12/03/2023',
      status: 'Active',
      id: '11',
    },
    {
      firstName: 'Ram',
      lastName: 'Kumar',
      role: 'Manager',
      email: 'ram.kumar@save.in',
      sendAutomaticPasswordTo: 'admin@shcgroup.in',
      lastSignIn: '121.113.0.1 14/03/2023',
      status: 'Active',
      id: '12',
    },
    {
      firstName: 'Raj',
      lastName: 'Ram',
      role: 'Manager',
      email: 'raj.ram@save.in',
      sendAutomaticPasswordTo: 'admin@shcgroup.in',
      lastSignIn: '211.132.0.11 13/05/2023',
      status: 'Active',
      id: '13',
    },
    {
      firstName: 'Madhan',
      lastName: 'Raj',
      role: 'Manager',
      email: 'Madhan.Raj@save.in',
      sendAutomaticPasswordTo: 'admin@shcgroup.in',
      lastSignIn: '212.123.0.121 12/03/2023',
      status: 'Active',
      id: '14',
    },
  ];

  public getUserList(): Observable<user[]> {
    return of(this.users);
  }
}
