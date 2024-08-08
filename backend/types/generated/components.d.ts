import type { Schema, Attribute } from '@strapi/strapi';

export interface WidgetBio extends Schema.Component {
  collectionName: 'components_widget_bios';
  info: {
    displayName: 'bio';
    icon: 'alien';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedSocialLink extends Schema.Component {
  collectionName: 'components_widget_social_links';
  info: {
    displayName: 'socialLink';
    icon: 'earth';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    platform: Attribute.Enumeration<
      ['facebook', 'youtube', 'x', 'linkedin', 'instagram']
    >;
  };
}

export interface SharedSocialLinkList extends Schema.Component {
  collectionName: 'components_widget_social_link_lists';
  info: {
    displayName: 'socialLinkList';
    icon: 'earth';
    description: '';
  };
  attributes: {
    SocialLink: Attribute.Component<'shared.social-link', true>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
    sharedImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedLink extends Schema.Component {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
    icon: 'earth';
  };
  attributes: {
    url: Attribute.String;
    text: Attribute.String;
    newTab: Attribute.Boolean;
  };
}

export interface SharedButton extends Schema.Component {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'button';
    icon: 'cursor';
  };
  attributes: {
    text: Attribute.String;
    type: Attribute.Enumeration<['solid', 'outline']>;
    color: Attribute.Enumeration<['primary', 'secondary', 'danger']>;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
    icon: 'cube';
    description: '';
  };
  attributes: {
    bio: Attribute.Component<'widget.bio'>;
    picture: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    social_links: Attribute.Relation<
      'sections.hero',
      'oneToMany',
      'api::social-link.social-link'
    >;
  };
}

export interface SectionsFeatureVideo extends Schema.Component {
  collectionName: 'components_sections_feature_videos';
  info: {
    displayName: 'featureVideo';
    icon: 'cube';
  };
  attributes: {
    title: Attribute.String;
    Description: Attribute.String;
    video: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface MetaMetadata extends Schema.Component {
  collectionName: 'components_meta_metadata';
  info: {
    displayName: 'metadata';
    icon: 'database';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'widget.bio': WidgetBio;
      'shared.social-link': SharedSocialLink;
      'shared.social-link-list': SharedSocialLinkList;
      'shared.seo': SharedSeo;
      'shared.link': SharedLink;
      'shared.button': SharedButton;
      'sections.hero': SectionsHero;
      'sections.feature-video': SectionsFeatureVideo;
      'meta.metadata': MetaMetadata;
    }
  }
}
