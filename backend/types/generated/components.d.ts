import type { Struct, Schema } from '@strapi/strapi';

export interface WidgetBio extends Struct.ComponentSchema {
  collectionName: 'components_widget_bios';
  info: {
    displayName: 'bio';
    icon: 'alien';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.String;
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_widget_social_links';
  info: {
    displayName: 'socialLink';
    icon: 'earth';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'youtube', 'x', 'linkedin', 'instagram']
    >;
  };
}

export interface SharedSocialLinkList extends Struct.ComponentSchema {
  collectionName: 'components_widget_social_link_lists';
  info: {
    displayName: 'socialLinkList';
    icon: 'earth';
    description: '';
  };
  attributes: {
    SocialLink: Schema.Attribute.Component<'shared.social-link', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    sharedImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
    icon: 'earth';
  };
  attributes: {
    url: Schema.Attribute.String;
    text: Schema.Attribute.String;
    newTab: Schema.Attribute.Boolean;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'button';
    icon: 'cursor';
  };
  attributes: {
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['solid', 'outline']>;
    color: Schema.Attribute.Enumeration<['primary', 'secondary', 'danger']>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
    icon: 'cube';
    description: '';
  };
  attributes: {
    bio: Schema.Attribute.Component<'widget.bio', false>;
    picture: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    social_links: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-link.social-link'
    >;
  };
}

export interface SectionsFeatureVideo extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_videos';
  info: {
    displayName: 'featureVideo';
    icon: 'cube';
  };
  attributes: {
    title: Schema.Attribute.String;
    Description: Schema.Attribute.String;
    video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface MetaMetadata extends Struct.ComponentSchema {
  collectionName: 'components_meta_metadata';
  info: {
    displayName: 'metadata';
    icon: 'database';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
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
