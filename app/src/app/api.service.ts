import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getArticles, getArticles_publishedArticles } from './__generated__/getArticles';

@Injectable({
  providedIn: "root"
})
export class GetArticlesGql extends Query<getArticles> {
  override document = gql`
    query getArticles {
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
export class ApiService {
  constructor(private _getArticles: GetArticlesGql) { }

  getArticles(): Observable<getArticles_publishedArticles[]>{
    return this._getArticles
      .watch()
      .valueChanges.pipe(
        map(result => result.data.publishedArticles)
      );
  }
}
