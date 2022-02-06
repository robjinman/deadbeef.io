import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../types';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  users!: Observable<User[]>;

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.users = this._apiService.getUsers();
  }

}
