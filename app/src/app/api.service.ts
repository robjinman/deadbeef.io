import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloLink } from '@apollo/client/core';
import { gql, Mutation, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Login, Login_login } from './__generated__/Login';
import { PublishedArticles, PublishedArticles_publishedArticles } from './__generated__/PublishedArticles';

@Injectable({
  providedIn: 'root'
})
export class AuthMiddleware extends ApolloLink {
  constructor(identityService: IdentityService) {
    const handler = (operation: any, forward: any) => {
      const token = identityService.token;

      if (token) {
        operation.setContext({
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });
      }
      return forward(operation);
    };

    super(handler);
  }
}

@Injectable({
  providedIn: "root"
})
export class GetArticlesGql extends Query<PublishedArticles> {
  override document = gql`
    query PublishedArticles {
      publishedArticles {
        id
        title
        content
        publishedAt
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class LoginGql extends Mutation<Login> {
  override document = gql`
    mutation Login($email: String!, $password: String!, $captcha: String) {
      login(email: $email, password: $password, captcha: $captcha) {
        token,
        user {
          name,
          activated
        }
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private _token: string|null = localStorage.getItem('userName');
  private _userName: string|null = localStorage.getItem('token');

  constructor() {
  }

  get userName(): string|null {
    return this._userName;
  }

  set userName(value: string|null) {
    this._userName = value;
    if (this._userName) {
      localStorage.setItem('userName', this._userName);
    }
    else {
      localStorage.removeItem('userName');
    }
  }

  get token(): string|null {
    return this._token;
  }

  set token(value: string|null) {
    this._token = value;
    if (this._token) {
      localStorage.setItem('token', this._token);
    }
    else {
      localStorage.removeItem('token');
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _identityService: IdentityService,
              private _getArticles: GetArticlesGql,
              private _login: LoginGql) { }

  getArticles(): Observable<PublishedArticles_publishedArticles[]>{
    return this._getArticles
      .watch()
      .valueChanges.pipe(
        map(result => result.data.publishedArticles)
      );
  }

  login(username: string, password: string, captcha?: string): Observable<Login_login|null>{
    return this._login.mutate({ username, password, captcha })
      .pipe(
        map(result => result?.data?.login || null),
        tap((auth : Login_login|null) => {
          this._identityService.userName = auth?.user?.name || null;
          this._identityService.token = auth?.token || null;
        })
      );
  }
}
