import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './types'

interface GetUsersResponse {
  users: User[];
}

@Injectable({
  providedIn: "root"
})
export class GetUsersGql extends Query<GetUsersResponse> {
  override document = gql`
    query getUsers {
      users {
        id
        name
        email
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _getUsersGql: GetUsersGql) { }

  getUsers(): Observable<User[]>{
    return this._getUsersGql
      .watch()
      .valueChanges.pipe(
        map(result => result.data.users)
      );
  }
}
