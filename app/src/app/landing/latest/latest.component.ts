import { Component, OnInit } from '@angular/core';

export interface NewsItem {

}

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.less']
})
export class LatestComponent implements OnInit {
  items: NewsItem[] = [1, 2, 3, 4];

  constructor() { }

  ngOnInit(): void {
  }

}
