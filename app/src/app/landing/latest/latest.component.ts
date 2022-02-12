import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.sass']
})
export class LatestComponent implements OnInit {
  items = [{
    id: "123",
    title: "Etiam non nunc ut leo varius accumsan at sed leo. Pellentesque congue viverra ex eu facilisis.",
    publishedAt: (new Date()).toLocaleDateString(),
    author: "Rob Jinman",
    tags: [],
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel odio purus. Proin ac ex vitae purus convallis hendrerit. Aliquam tempus, magna quis condimentum consequat, sem elit tincidunt lacus, in sodales libero lacus et lacus. Phasellus eget neque ligula. Suspendisse mattis porttitor velit. Ut quis urna lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam magna metus, tincidunt vel auctor a, convallis at enim. Mauris vitae congue ligula, eget laoreet turpis. ",
    figure: "https://via.placeholder.com/400x250"
  },
  {
    id: "123",
    title: "Etiam non nunc ut leo varius accumsan at sed leo. Pellentesque congue viverra ex eu facilisis.",
    publishedAt: (new Date()).toLocaleDateString(),
    author: "Rob Jinman",
    tags: [],
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel odio purus. Proin ac ex vitae purus convallis hendrerit. Aliquam tempus, magna quis condimentum consequat, sem elit tincidunt lacus, in sodales libero lacus et lacus. Phasellus eget neque ligula. Suspendisse mattis porttitor velit. Ut quis urna lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam magna metus, tincidunt vel auctor a, convallis at enim. Mauris vitae congue ligula, eget laoreet turpis. ",
    figure: "https://via.placeholder.com/400x250"
  },
  {
    id: "123",
    title: "Etiam non nunc ut leo varius accumsan at sed leo. Pellentesque congue viverra ex eu facilisis.",
    publishedAt: (new Date()).toLocaleDateString(),
    author: "Rob Jinman",
    tags: [],
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel odio purus. Proin ac ex vitae purus convallis hendrerit. Aliquam tempus, magna quis condimentum consequat, sem elit tincidunt lacus, in sodales libero lacus et lacus. Phasellus eget neque ligula. Suspendisse mattis porttitor velit. Ut quis urna lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam magna metus, tincidunt vel auctor a, convallis at enim. Mauris vitae congue ligula, eget laoreet turpis. ",
    figure: "https://via.placeholder.com/400x250"
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
