import { Injectable } from '@angular/core';
import { user } from '../modal/users';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor() { }
  public users:user[]=[];
}
