import firebase from 'firebase';

export type MediaAsset = {
  url: string,
  format: string,
  height: number,
  width: number,
};

export type Media = {
  approved_for_syndication: number,
  caption: string,
  copyright: string,
  'media-metadata': MediaAsset[],
  subtype: string,
  type: string
};

export type Article = {
  abstract: string,
  adx_keywords: string,
  asset_id: number,
  byline: string,
  column: number,
  des_facet: string[],
  eta_id: number,
  geo_facet: any[],
  id: number,
  media: Media[],
  nytdsection: string,
  org_facet: string[],
  per_facet: string[],
  published_date: string,
  section: string,
  source: string,
  subsection: string,
  title: string,
  type: string,
  updated: string,
  uri: string,
  url: string
};

export type Field = {
  value: string,
  isValid: () => boolean,
  displayError: boolean,
  errorMessage: string,
};

export type userAuthParams = {
  email: string,
  password: string,
  authFunc: (email: string, password: string) => Promise<firebase.auth.UserCredential>
};