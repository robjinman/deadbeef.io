/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getArticles
// ====================================================

export interface getArticles_publishedArticles {
  __typename: "Article";
  id: string;
  title: string;
  content: string;
  publishedAt: string | null;
}

export interface getArticles {
  publishedArticles: getArticles_publishedArticles[];
}
