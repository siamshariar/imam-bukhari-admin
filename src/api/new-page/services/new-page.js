'use strict';

/**
 * new-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-page.new-page');
