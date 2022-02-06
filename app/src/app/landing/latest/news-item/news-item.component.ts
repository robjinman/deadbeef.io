import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/types';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.sass']
})
export class NewsItemComponent implements OnInit {

  @Input() item!: NewsItem;

  constructor() { }

  ngOnInit(): void {
  }

}
