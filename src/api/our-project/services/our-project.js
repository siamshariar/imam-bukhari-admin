'use strict';

/**
 * our-project service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::our-project.our-project');
