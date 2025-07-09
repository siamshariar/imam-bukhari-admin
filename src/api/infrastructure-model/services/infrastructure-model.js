'use strict';

/**
 * infrastructure-model service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::infrastructure-model.infrastructure-model');
