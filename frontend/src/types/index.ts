export type Media = {
  id: number;
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
};

export interface StrapiLink {
  id: number;
  url: string;
  text: string;
  newTab: boolean;
}
export interface SocialLink {
  id: number;
  title: string;
  platform?: string;
  url: string;
}
