'use strict';

const DEFAULTS = {
  about: { order: '2', displayName: 'আমাদের সম্বন্ধে', title: 'আমাদের সম্বন্ধে' },
  bukhariJameMasjid: { order: '3', displayName: 'ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স', title: 'ইমাম বুখারী জামে মাসজিদ কমপ্লেক্স' },
  kulliyatulQuranilKareem: { order: '4', displayName: 'কুল্লিয়াতুল কুরআনিল কারীম ওয়াদ-দিরাসাতিল ইসলামিয়্যাহ', title: 'কুল্লিয়াতুল কুরআনিল কারীম ওয়াদ-দিরাসাতিল ইসলামিয়্যাহ' },
  darulHadithArabicMadrasa: { order: '5', displayName: 'দারুল হাদীস অ্যারাবিক মাদরাসা', title: 'দারুল হাদীস অ্যারাবিক মাদরাসা' },
  sunnahConference: { order: '6', displayName: 'সুন্নাহ কনফারেন্স', title: 'সুন্নাহ কনফারেন্স' },
  videos: { order: '7', displayName: 'ভিডিও সমূহ', title: 'ভিডিও সমূহ' },
  faq: { order: '8', displayName: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন', title: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন' },
  contact: { order: '9', displayName: 'যোগাযোগ', title: 'যোগাযোগ' },
  donate: { order: '10', displayName: 'দান করুন', title: 'দান করুন' },
};

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const uid = 'api::page-information.page-information';
    const existing = await strapi.entityService.findMany(uid);
    if (!existing) return;

    const updateData = {};
    for (const [key, val] of Object.entries(DEFAULTS)) {
      if (!existing[key]) {
        updateData[key] = {
          menuInfo: { displayName: val.displayName, order: val.order, isDislpay: true },
          metaInfo: { title: val.title, description: '' },
          pageInfo: { title: val.title, excerpt: '' },
        };
      }
    }

    if (Object.keys(updateData).length > 0) {
      await strapi.entityService.update(uid, existing.id, { data: updateData });
      strapi.log.info(`Seeded default Page Information menu entries: ${Object.keys(updateData).join(', ')}`);
    }
  },
};
