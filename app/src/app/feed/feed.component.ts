import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { getArticles_publishedArticles } from '../__generated__/getArticles';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  articles!: Observable<getArticles_publishedArticles[]>;

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.articles = this._apiService.getArticles();
  }

}
