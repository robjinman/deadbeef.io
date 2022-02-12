import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.sass']
})
export class NewsItemComponent implements OnInit {

  @Input() item!: any; // TODO

  constructor() { }

  ngOnInit(): void {
  }

}
