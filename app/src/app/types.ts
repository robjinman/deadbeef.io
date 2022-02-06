export interface User {
  id: string;
  email: string;
  name: string;
  posts: Post[];
}

export interface Post {

}

export interface Tag {
  name: string;
}

export interface NewsItem {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  tags: Tag[];
  summary: string;
  figure: string;
}
