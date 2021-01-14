import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as data from '../../assets/contacts/contacts.json';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getData(): Observable<any>{
    let l_data = data["default"];
    return of(l_data)
  }
}
