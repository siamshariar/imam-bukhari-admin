'use strict';

/**
 * advisory-board service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::advisory-board.advisory-board');
