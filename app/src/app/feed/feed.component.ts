import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { PublishedArticles_publishedArticles } from '../__generated__/PublishedArticles';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  articles!: Observable<PublishedArticles_publishedArticles[]>;

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.articles = this._apiService.getArticles();
  }

}
