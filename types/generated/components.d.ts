import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutAbout extends Schema.Component {
  collectionName: 'components_about_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText;
  };
}

export interface AboutActivities extends Schema.Component {
  collectionName: 'components_about_activities';
  info: {
    displayName: 'activities';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
  };
}

export interface AboutFeatures extends Schema.Component {
  collectionName: 'components_about_features';
  info: {
    displayName: 'features';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
  };
}

export interface BannerCategoryBanner extends Schema.Component {
  collectionName: 'components_banner_category_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    subtitle: Attribute.String;
    title: Attribute.String;
    message: Attribute.Text;
    image: Attribute.Media;
  };
}

export interface BoardActivities extends Schema.Component {
  collectionName: 'components_board_activities';
  info: {
    displayName: 'activities';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
  };
}

export interface BoardAdvisoryBoard extends Schema.Component {
  collectionName: 'components_board_advisory_boards';
  info: {
    displayName: 'Advisory Board';
  };
  attributes: {
    name: Attribute.String;
    designation: Attribute.String;
  };
}

export interface CommonMenuItem extends Schema.Component {
  collectionName: 'components_common_menu_items';
  info: {
    displayName: 'MenuItem';
    description: '';
  };
  attributes: {
    displayName: Attribute.String & Attribute.Required;
    order: Attribute.String;
    isDislpay: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface CommonMeta extends Schema.Component {
  collectionName: 'components_common_metas';
  info: {
    displayName: 'Meta';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
  };
}

export interface CommonPageInfo extends Schema.Component {
  collectionName: 'components_common_page_infos';
  info: {
    displayName: 'PageInfo';
    description: '';
  };
  attributes: {
    pageInfo: Attribute.Component<'common.page'>;
    metaInfo: Attribute.Component<'common.meta'>;
    menuInfo: Attribute.Component<'common.menu-item'>;
  };
}

export interface CommonPage extends Schema.Component {
  collectionName: 'components_common_pages';
  info: {
    displayName: 'Page';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    excerpt: Attribute.Text;
  };
}

export interface CommonPoint extends Schema.Component {
  collectionName: 'components_common_points';
  info: {
    displayName: 'Point';
    description: '';
  };
  attributes: {
    listItem: Attribute.String;
  };
}

export interface CoursesCategoryCourseDetail extends Schema.Component {
  collectionName: 'components_courses_category_course_details';
  info: {
    displayName: 'CourseDetail';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    listItem: Attribute.Component<'common.point', true>;
  };
}

export interface CoursesCategoryCourseFee extends Schema.Component {
  collectionName: 'components_courses_category_course_fees';
  info: {
    displayName: 'CourseFee';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    amount: Attribute.String & Attribute.Required;
  };
}

export interface CoursesCategoryCourses extends Schema.Component {
  collectionName: 'components_courses_category_courses';
  info: {
    displayName: 'Courses';
  };
  attributes: {
    title: Attribute.String;
    slug: Attribute.String;
    excerpt: Attribute.String;
    content: Attribute.RichText;
  };
}

export interface CoursesCategoryExamSchedule extends Schema.Component {
  collectionName: 'components_courses_category_exam_schedules';
  info: {
    displayName: 'ExamSchedule';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    time: Attribute.String & Attribute.Required;
  };
}

export interface ListCategoryCharacteristic extends Schema.Component {
  collectionName: 'components_list_category_characteristics_v2';
  info: {
    displayName: 'Characteristic';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface ListCategoryCharacteristics extends Schema.Component {
  collectionName: 'components_list_category_characteristics';
  info: {
    displayName: 'characteristics';
  };
  attributes: {
    title: Attribute.String;
    listItem: Attribute.Component<'list-category.list-item', true>;
  };
}

export interface ListCategoryContent extends Schema.Component {
  collectionName: 'components_list_category_contents';
  info: {
    displayName: 'content';
    description: '';
  };
  attributes: {
    items: Attribute.Component<'list-category.item', true>;
  };
}

export interface ListCategoryCurriculam extends Schema.Component {
  collectionName: 'components_list_category_curriculams';
  info: {
    displayName: 'Curriculam';
  };
  attributes: {
    item: Attribute.String;
  };
}

export interface ListCategoryCurriculum extends Schema.Component {
  collectionName: 'components_list_category_curricula';
  info: {
    displayName: 'Curriculum';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'list-category.curriculam', true>;
  };
}

export interface ListCategoryDepartmentList extends Schema.Component {
  collectionName: 'components_list_category_department_lists';
  info: {
    displayName: 'departmentList';
    description: '';
  };
  attributes: {
    item: Attribute.String;
  };
}

export interface ListCategoryDepartment extends Schema.Component {
  collectionName: 'components_list_category_departments';
  info: {
    displayName: 'Department';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface ListCategoryDescription extends Schema.Component {
  collectionName: 'components_list_category_descriptions';
  info: {
    displayName: 'Description';
    description: '';
  };
  attributes: {
    items: Attribute.Component<'list-category.list', true>;
  };
}

export interface ListCategoryItemList extends Schema.Component {
  collectionName: 'components_list_category_item_lists';
  info: {
    displayName: 'itemList';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface ListCategoryItem extends Schema.Component {
  collectionName: 'components_list_category_items';
  info: {
    displayName: 'item';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface ListCategoryItems extends Schema.Component {
  collectionName: 'components_list_category_items_v2';
  info: {
    displayName: 'items';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface ListCategoryKulliyaDepartment extends Schema.Component {
  collectionName: 'components_list_category_kulliya_departments';
  info: {
    displayName: 'kulliyaDepartment';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'list-category.department-list', true>;
  };
}

export interface ListCategoryListItem extends Schema.Component {
  collectionName: 'components_list_category_list_items';
  info: {
    displayName: 'listItem';
  };
  attributes: {
    listItem: Attribute.String;
  };
}

export interface ListCategoryList extends Schema.Component {
  collectionName: 'components_list_category_lists';
  info: {
    displayName: 'List';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface ListCategoryListitem extends Schema.Component {
  collectionName: 'components_list_category_listitems';
  info: {
    displayName: 'listitem';
  };
  attributes: {
    items: Attribute.Component<'list-category.item-list', true>;
  };
}

export interface ListCategoryProcessUniversities extends Schema.Component {
  collectionName: 'components_list_category_process_universities';
  info: {
    displayName: 'processUniversities';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'list-category.progress', true>;
  };
}

export interface ListCategoryProgress extends Schema.Component {
  collectionName: 'components_list_category_progresses';
  info: {
    displayName: 'progress';
  };
  attributes: {
    item: Attribute.String;
  };
}

export interface QuoteCategoryQuote extends Schema.Component {
  collectionName: 'components_quote_category_quotes';
  info: {
    displayName: 'Quote';
    description: '';
  };
  attributes: {
    quoter: Attribute.String;
    image: Attribute.Media;
    quoteExcerpt: Attribute.Text;
    button: Attribute.String;
    fullQuote: Attribute.Blocks;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.about': AboutAbout;
      'about.activities': AboutActivities;
      'about.features': AboutFeatures;
      'banner-category.banner': BannerCategoryBanner;
      'board.activities': BoardActivities;
      'board.advisory-board': BoardAdvisoryBoard;
      'common.menu-item': CommonMenuItem;
      'common.meta': CommonMeta;
      'common.page-info': CommonPageInfo;
      'common.page': CommonPage;
      'common.point': CommonPoint;
      'courses-category.course-detail': CoursesCategoryCourseDetail;
      'courses-category.course-fee': CoursesCategoryCourseFee;
      'courses-category.courses': CoursesCategoryCourses;
      'courses-category.exam-schedule': CoursesCategoryExamSchedule;
      'list-category.characteristic': ListCategoryCharacteristic;
      'list-category.characteristics': ListCategoryCharacteristics;
      'list-category.content': ListCategoryContent;
      'list-category.curriculam': ListCategoryCurriculam;
      'list-category.curriculum': ListCategoryCurriculum;
      'list-category.department-list': ListCategoryDepartmentList;
      'list-category.department': ListCategoryDepartment;
      'list-category.description': ListCategoryDescription;
      'list-category.item-list': ListCategoryItemList;
      'list-category.item': ListCategoryItem;
      'list-category.items': ListCategoryItems;
      'list-category.kulliya-department': ListCategoryKulliyaDepartment;
      'list-category.list-item': ListCategoryListItem;
      'list-category.list': ListCategoryList;
      'list-category.listitem': ListCategoryListitem;
      'list-category.process-universities': ListCategoryProcessUniversities;
      'list-category.progress': ListCategoryProgress;
      'quote-category.quote': QuoteCategoryQuote;
    }
  }
}
