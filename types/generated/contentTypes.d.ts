import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutContentAboutContent extends Schema.SingleType {
  collectionName: 'about_contents';
  info: {
    singularName: 'about-content';
    pluralName: 'about-contents';
    displayName: 'About';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    content: Attribute.Blocks & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-content.about-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-content.about-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutMouAboutMou extends Schema.SingleType {
  collectionName: 'about_mous';
  info: {
    singularName: 'about-mou';
    pluralName: 'about-mous';
    displayName: 'Mou';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutMouTitle: Attribute.String;
    aboutMouPara1: Attribute.Text;
    aboutMouPara2: Attribute.Text;
    aboutMouList1: Attribute.Component<'list-category.list', true>;
    aboutMouList2: Attribute.Component<'list-category.list', true>;
    aboutMouList3: Attribute.Component<'list-category.list', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-mou.about-mou',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-mou.about-mou',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAcademicHeadMessageAcademicHeadMessage
  extends Schema.SingleType {
  collectionName: 'academic_head_messages';
  info: {
    singularName: 'academic-head-message';
    pluralName: 'academic-head-messages';
    displayName: 'Academic Head Message';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    excerpt: Attribute.Text & Attribute.Required;
    description: Attribute.Blocks & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::academic-head-message.academic-head-message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::academic-head-message.academic-head-message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdmissionInformationAdmissionInformation
  extends Schema.SingleType {
  collectionName: 'admission_informations';
  info: {
    singularName: 'admission-information';
    pluralName: 'admission-informations';
    displayName: 'Admission Information';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    informations: Attribute.Component<'courses-category.course-detail', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::admission-information.admission-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::admission-information.admission-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdvisoryBoardAdvisoryBoard extends Schema.CollectionType {
  collectionName: 'advisory_boards';
  info: {
    singularName: 'advisory-board';
    pluralName: 'advisory-boards';
    displayName: 'Advisors';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    designation: Attribute.String;
    image: Attribute.Media;
    description: Attribute.Blocks;
    slug: Attribute.UID<'api::advisory-board.advisory-board', 'name'> &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::advisory-board.advisory-board',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::advisory-board.advisory-board',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'Blogs';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    excerpt: Attribute.Text & Attribute.Required;
    coverImage: Attribute.Media;
    content: Attribute.Blocks & Attribute.Required;
    slug: Attribute.UID<'api::blog.blog', 'title'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBookBook extends Schema.CollectionType {
  collectionName: 'books';
  info: {
    singularName: 'book';
    pluralName: 'books';
    displayName: 'Books';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    excerpt: Attribute.Text & Attribute.Required;
    author: Attribute.String;
    translator: Attribute.String;
    editor: Attribute.String;
    coverImage: Attribute.Media & Attribute.Required;
    purchaseUrl: Attribute.String;
    pdfUrl: Attribute.String;
    description: Attribute.Blocks;
    slug: Attribute.UID<'api::book.book', 'title'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::book.book', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::book.book', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCharacteristicCharacteristic extends Schema.SingleType {
  collectionName: 'characteristics';
  info: {
    singularName: 'characteristic';
    pluralName: 'characteristics';
    displayName: 'Characteristic';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    items: Attribute.Component<'courses-category.course-detail', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::characteristic.characteristic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::characteristic.characteristic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCharacteristicsDarulHadithCharacteristicsDarulHadith
  extends Schema.SingleType {
  collectionName: 'characteristics_darul_hadiths';
  info: {
    singularName: 'characteristics-darul-hadith';
    pluralName: 'characteristics-darul-hadiths';
    displayName: 'Characteristics Darul Hadith';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'list-category.characteristic', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::characteristics-darul-hadith.characteristics-darul-hadith',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::characteristics-darul-hadith.characteristics-darul-hadith',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCharacteristicsKulliaCharacteristicsKullia
  extends Schema.SingleType {
  collectionName: 'characteristics_kullias';
  info: {
    singularName: 'characteristics-kullia';
    pluralName: 'characteristics-kullias';
    displayName: 'Characteristics kullia';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    items: Attribute.Component<'list-category.characteristics', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::characteristics-kullia.characteristics-kullia',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::characteristics-kullia.characteristics-kullia',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactInfoContactInfo extends Schema.SingleType {
  collectionName: 'contact_infos';
  info: {
    singularName: 'contact-info';
    pluralName: 'contact-infos';
    displayName: 'Contact';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    house: Attribute.String;
    road: Attribute.String;
    district: Attribute.String;
    googleMapUrl: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-info.contact-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-info.contact-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCourseCourse extends Schema.CollectionType {
  collectionName: 'courses';
  info: {
    singularName: 'course';
    pluralName: 'courses';
    displayName: 'Courses';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    displayHome: Attribute.Boolean & Attribute.DefaultTo<true>;
    title: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::course.course', 'title'> & Attribute.Required;
    description: Attribute.Blocks;
    courseDetail: Attribute.Component<'courses-category.course-detail', true>;
    image: Attribute.Media;
    excerpt: Attribute.Text;
    courseFee: Attribute.Component<'courses-category.course-fee', true>;
    examSchedule: Attribute.Component<'courses-category.exam-schedule', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDarulHadithArabicMadrasaDetailDarulHadithArabicMadrasaDetail
  extends Schema.SingleType {
  collectionName: 'darul_hadith_arabic_madrasa_details';
  info: {
    singularName: 'darul-hadith-arabic-madrasa-detail';
    pluralName: 'darul-hadith-arabic-madrasa-details';
    displayName: 'Darul Hadith Arabic Madrasa detail';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::darul-hadith-arabic-madrasa-detail.darul-hadith-arabic-madrasa-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::darul-hadith-arabic-madrasa-detail.darul-hadith-arabic-madrasa-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDarulHadithCurriculumDarulHadithCurriculum
  extends Schema.SingleType {
  collectionName: 'darul_hadith_curricula';
  info: {
    singularName: 'darul-hadith-curriculum';
    pluralName: 'darul-hadith-curricula';
    displayName: 'Darul Hadith Curriculum';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    darulHadithCurriculum: Attribute.Component<'list-category.curriculum'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::darul-hadith-curriculum.darul-hadith-curriculum',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::darul-hadith-curriculum.darul-hadith-curriculum',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDarulHadithSummaryDarulHadithSummary
  extends Schema.SingleType {
  collectionName: 'darul_hadith_summaries';
  info: {
    singularName: 'darul-hadith-summary';
    pluralName: 'darul-hadith-summaries';
    displayName: 'Darul Hadith Summary';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'list-category.listitem'>;
    sliderImages: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::darul-hadith-summary.darul-hadith-summary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::darul-hadith-summary.darul-hadith-summary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDonateDonate extends Schema.SingleType {
  collectionName: 'donates';
  info: {
    singularName: 'donate';
    pluralName: 'donates';
    displayName: 'Donate';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::donate.donate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::donate.donate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Events';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    excerpt: Attribute.Text;
    date: Attribute.Date;
    time: Attribute.Time;
    content: Attribute.Blocks;
    image: Attribute.Media;
    slug: Attribute.UID<'api::event.event', 'title'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'FAQ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    displayHome: Attribute.Boolean & Attribute.DefaultTo<true>;
    question: Attribute.String & Attribute.Required;
    answer: Attribute.Text & Attribute.Required;
    slug: Attribute.UID<'api::faq.faq', 'question'> & Attribute.Required;
    isDisplayHome: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiFounderMessageFounderMessage extends Schema.SingleType {
  collectionName: 'founder_messages';
  info: {
    singularName: 'founder-message';
    pluralName: 'founder-messages';
    displayName: 'Founder Message';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    excerpt: Attribute.Text & Attribute.Required;
    description: Attribute.Blocks & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::founder-message.founder-message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::founder-message.founder-message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGalleryGallery extends Schema.CollectionType {
  collectionName: 'galleries';
  info: {
    singularName: 'gallery';
    pluralName: 'galleries';
    displayName: 'Gallery';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    images: Attribute.Media & Attribute.Required;
    slug: Attribute.UID<'api::gallery.gallery', 'title'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gallery.gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::gallery.gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeHome extends Schema.SingleType {
  collectionName: 'homes';
  info: {
    singularName: 'home';
    pluralName: 'homes';
    displayName: 'Home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    HomeBanner: Attribute.Component<'banner-category.banner'>;
    aboutShortText: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiHomeSliderHomeSlider extends Schema.SingleType {
  collectionName: 'home_sliders';
  info: {
    singularName: 'home-slider';
    pluralName: 'home-sliders';
    displayName: 'Home slider';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sliderImages: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-slider.home-slider',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-slider.home-slider',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiImamBukhariDetailImamBukhariDetail
  extends Schema.SingleType {
  collectionName: 'imam_bukhari_details';
  info: {
    singularName: 'imam-bukhari-detail';
    pluralName: 'imam-bukhari-details';
    displayName: 'Imam Bukhari Detail';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::imam-bukhari-detail.imam-bukhari-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::imam-bukhari-detail.imam-bukhari-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInfrastructureModelInfrastructureModel
  extends Schema.SingleType {
  collectionName: 'infrastructure_models';
  info: {
    singularName: 'infrastructure-model';
    pluralName: 'infrastructure-models';
    displayName: 'Infrastructure model';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    sliderImages: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::infrastructure-model.infrastructure-model',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::infrastructure-model.infrastructure-model',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKulliaMainActivitieKulliaMainActivitie
  extends Schema.SingleType {
  collectionName: 'kullia_main_activities';
  info: {
    singularName: 'kullia-main-activitie';
    pluralName: 'kullia-main-activities';
    displayName: 'Kullia Main activitie';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arbTitle: Attribute.String;
    bnText: Attribute.String;
    ref: Attribute.String;
    title: Attribute.String;
    Features: Attribute.Component<'about.features', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kullia-main-activitie.kullia-main-activitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kullia-main-activitie.kullia-main-activitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKulliaProjectSummaryKulliaProjectSummary
  extends Schema.SingleType {
  collectionName: 'kullia_project_summaries';
  info: {
    singularName: 'kullia-project-summary';
    pluralName: 'kullia-project-summaries';
    displayName: 'Kullia Project Summary';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Component<'list-category.content'>;
    sliderImages: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kullia-project-summary.kullia-project-summary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kullia-project-summary.kullia-project-summary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKulliaRecommendedDepartmentKulliaRecommendedDepartment
  extends Schema.SingleType {
  collectionName: 'kullia_recommended_departments';
  info: {
    singularName: 'kullia-recommended-department';
    pluralName: 'kullia-recommended-departments';
    displayName: 'Kullia Recommended Department';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    kulliaDepartment: Attribute.Component<'list-category.kulliya-department'>;
    progressUniversity: Attribute.Component<'list-category.process-universities'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kullia-recommended-department.kullia-recommended-department',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kullia-recommended-department.kullia-recommended-department',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKulliyatulQuranilKareemDetailKulliyatulQuranilKareemDetail
  extends Schema.SingleType {
  collectionName: 'kulliyatul_quranil_kareem_details';
  info: {
    singularName: 'kulliyatul-quranil-kareem-detail';
    pluralName: 'kulliyatul-quranil-kareem-details';
    displayName: 'Kulliyatul Quranil Kareem Detail';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kulliyatul-quranil-kareem-detail.kulliyatul-quranil-kareem-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kulliyatul-quranil-kareem-detail.kulliyatul-quranil-kareem-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMemberMember extends Schema.CollectionType {
  collectionName: 'members';
  info: {
    singularName: 'member';
    pluralName: 'members';
    displayName: 'Members';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    designation: Attribute.String;
    kulliyaDesignation: Attribute.String;
    image: Attribute.Media;
    slug: Attribute.UID<'api::member.member', 'name'> & Attribute.Required;
    description: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::member.member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::member.member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMosqueComplexMosqueComplex extends Schema.SingleType {
  collectionName: 'mosque_complexes';
  info: {
    singularName: 'mosque-complex';
    pluralName: 'mosque-complexes';
    displayName: 'Mosque Complex';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    details: Attribute.Text;
    items: Attribute.Component<'list-category.items', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mosque-complex.mosque-complex',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mosque-complex.mosque-complex',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMosqueMainActivitieMosqueMainActivitie
  extends Schema.SingleType {
  collectionName: 'mosque_main_activities';
  info: {
    singularName: 'mosque-main-activitie';
    pluralName: 'mosque-main-activities';
    displayName: 'Mosque Main activitie';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arbTitle: Attribute.String;
    bnText: Attribute.String;
    ref: Attribute.String;
    title: Attribute.String;
    activities: Attribute.Component<'about.activities', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mosque-main-activitie.mosque-main-activitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mosque-main-activitie.mosque-main-activitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMosqueProjectSummaryMosqueProjectSummary
  extends Schema.SingleType {
  collectionName: 'mosque_project_summaries';
  info: {
    singularName: 'mosque-project-summary';
    pluralName: 'mosque-project-summaries';
    displayName: 'Mosque Project Summary';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Component<'list-category.description'>;
    sliderImages: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mosque-project-summary.mosque-project-summary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mosque-project-summary.mosque-project-summary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewPageNewPage extends Schema.CollectionType {
  collectionName: 'new_pages';
  info: {
    singularName: 'new-page';
    pluralName: 'new-pages';
    displayName: 'NewPages';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pageInfo: Attribute.Component<'common.page-info'>;
    coverImage: Attribute.Media;
    content: Attribute.Blocks;
    sliderImages: Attribute.Media;
    title: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::new-page.new-page', 'title'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::new-page.new-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::new-page.new-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNoticeNotice extends Schema.CollectionType {
  collectionName: 'notices';
  info: {
    singularName: 'notice';
    pluralName: 'notices';
    displayName: 'Notices';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Blocks & Attribute.Required;
    slug: Attribute.UID<'api::notice.notice', 'title'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notice.notice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notice.notice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOurProjectOurProject extends Schema.CollectionType {
  collectionName: 'our_projects';
  info: {
    singularName: 'our-project';
    pluralName: 'our-projects';
    displayName: 'Our project';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    message: Attribute.Text;
    sliderImages: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::our-project.our-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::our-project.our-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageInformationPageInformation extends Schema.SingleType {
  collectionName: 'page_informations';
  info: {
    singularName: 'page-information';
    pluralName: 'page-informations';
    displayName: 'Page Information';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    home: Attribute.Component<'common.page-info'>;
    about: Attribute.Component<'common.page-info'>;
    advisors: Attribute.Component<'common.page-info'>;
    members: Attribute.Component<'common.page-info'>;
    courses: Attribute.Component<'common.page-info'>;
    videos: Attribute.Component<'common.page-info'>;
    admissionInformation: Attribute.Component<'common.page-info'>;
    contact: Attribute.Component<'common.page-info'>;
    blogs: Attribute.Component<'common.page-info'>;
    events: Attribute.Component<'common.page-info'>;
    photoGallery: Attribute.Component<'common.page-info'>;
    books: Attribute.Component<'common.page-info'>;
    notices: Attribute.Component<'common.page-info'>;
    faq: Attribute.Component<'common.page-info'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-information.page-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-information.page-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRecentActivitieRecentActivitie
  extends Schema.CollectionType {
  collectionName: 'recent_activities';
  info: {
    singularName: 'recent-activitie';
    pluralName: 'recent-activities';
    displayName: 'Recent activitie';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    para: Attribute.String;
    sliderImage: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::recent-activitie.recent-activitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::recent-activitie.recent-activitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSettingSetting extends Schema.SingleType {
  collectionName: 'settings';
  info: {
    singularName: 'setting';
    pluralName: 'settings';
    displayName: 'Setting';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    email: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    facebookUrl: Attribute.String;
    youtubeUrl: Attribute.String;
    xUrl: Attribute.String;
    linkedinUrl: Attribute.String;
    logo: Attribute.Media & Attribute.Required;
    favicon: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubscriptionSubscription extends Schema.SingleType {
  collectionName: 'subscriptions';
  info: {
    singularName: 'subscription';
    pluralName: 'subscriptions';
    displayName: 'Subscription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subscriptionTitle: Attribute.String;
    subscriptionPara: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::about-content.about-content': ApiAboutContentAboutContent;
      'api::about-mou.about-mou': ApiAboutMouAboutMou;
      'api::academic-head-message.academic-head-message': ApiAcademicHeadMessageAcademicHeadMessage;
      'api::admission-information.admission-information': ApiAdmissionInformationAdmissionInformation;
      'api::advisory-board.advisory-board': ApiAdvisoryBoardAdvisoryBoard;
      'api::blog.blog': ApiBlogBlog;
      'api::book.book': ApiBookBook;
      'api::characteristic.characteristic': ApiCharacteristicCharacteristic;
      'api::characteristics-darul-hadith.characteristics-darul-hadith': ApiCharacteristicsDarulHadithCharacteristicsDarulHadith;
      'api::characteristics-kullia.characteristics-kullia': ApiCharacteristicsKulliaCharacteristicsKullia;
      'api::contact-info.contact-info': ApiContactInfoContactInfo;
      'api::course.course': ApiCourseCourse;
      'api::darul-hadith-arabic-madrasa-detail.darul-hadith-arabic-madrasa-detail': ApiDarulHadithArabicMadrasaDetailDarulHadithArabicMadrasaDetail;
      'api::darul-hadith-curriculum.darul-hadith-curriculum': ApiDarulHadithCurriculumDarulHadithCurriculum;
      'api::darul-hadith-summary.darul-hadith-summary': ApiDarulHadithSummaryDarulHadithSummary;
      'api::donate.donate': ApiDonateDonate;
      'api::event.event': ApiEventEvent;
      'api::faq.faq': ApiFaqFaq;
      'api::founder-message.founder-message': ApiFounderMessageFounderMessage;
      'api::gallery.gallery': ApiGalleryGallery;
      'api::home.home': ApiHomeHome;
      'api::home-slider.home-slider': ApiHomeSliderHomeSlider;
      'api::imam-bukhari-detail.imam-bukhari-detail': ApiImamBukhariDetailImamBukhariDetail;
      'api::infrastructure-model.infrastructure-model': ApiInfrastructureModelInfrastructureModel;
      'api::kullia-main-activitie.kullia-main-activitie': ApiKulliaMainActivitieKulliaMainActivitie;
      'api::kullia-project-summary.kullia-project-summary': ApiKulliaProjectSummaryKulliaProjectSummary;
      'api::kullia-recommended-department.kullia-recommended-department': ApiKulliaRecommendedDepartmentKulliaRecommendedDepartment;
      'api::kulliyatul-quranil-kareem-detail.kulliyatul-quranil-kareem-detail': ApiKulliyatulQuranilKareemDetailKulliyatulQuranilKareemDetail;
      'api::member.member': ApiMemberMember;
      'api::mosque-complex.mosque-complex': ApiMosqueComplexMosqueComplex;
      'api::mosque-main-activitie.mosque-main-activitie': ApiMosqueMainActivitieMosqueMainActivitie;
      'api::mosque-project-summary.mosque-project-summary': ApiMosqueProjectSummaryMosqueProjectSummary;
      'api::new-page.new-page': ApiNewPageNewPage;
      'api::notice.notice': ApiNoticeNotice;
      'api::our-project.our-project': ApiOurProjectOurProject;
      'api::page-information.page-information': ApiPageInformationPageInformation;
      'api::recent-activitie.recent-activitie': ApiRecentActivitieRecentActivitie;
      'api::setting.setting': ApiSettingSetting;
      'api::subscription.subscription': ApiSubscriptionSubscription;
    }
  }
}
