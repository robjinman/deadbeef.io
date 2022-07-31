/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PublishedArticles
// ====================================================

export interface PublishedArticles_publishedArticles {
  __typename: "Article";
  id: string;
  title: string;
  content: string;
  publishedAt: string | null;
}

export interface PublishedArticles {
  publishedArticles: PublishedArticles_publishedArticles[];
}
