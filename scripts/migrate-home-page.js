/**
 * এই স্ক্রিপ্টটা পুরনো content-type গুলো (home, our-project, home-slider,
 * recent-activitie, founder-message, member) থেকে ডেটা পড়ে নতুন `home-page`
 * singleType-এ একবার লিখে দেয়।
 *
 * চালানোর আগে অবশ্যই:
 *   ১) নতুন schema (src/api/home-page, src/components/home-page/*) deploy/restart
 *      হয়ে গিয়ে server-এ home_pages টেবিল তৈরি হয়ে থাকতে হবে।
 *   ২) Strapi admin > Settings > API Tokens থেকে "Full access" টাইপের একটা টোকেন
 *      বানিয়ে নিচের env var-এ বসাতে হবে। টোকেন কখনো কোডে/git-এ commit করবেন না।
 *
 * চালানোর নিয়ম:
 *   STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-home-page.js
 *
 * এটা idempotent না — বারবার চালালে home-page entry বারবার overwrite (PUT) হবে,
 * duplicate তৈরি হবে না, কিন্তু চালানোর আগে ম্যানুয়ালি ভেরিফাই করে নেওয়া ভালো।
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error('STRAPI_URL এবং STRAPI_TOKEN env var হিসেবে দিতে হবে। উদাহরণ:');
  console.error('STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-home-page.js');
  process.exit(1);
}

const api = async (path, options = {}) => {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${options.method || 'GET'} ${path} -> ${res.status}: ${body}`);
  }
  return res.json();
};

// আগের project card shape-এ কনভার্ট করে — শুধু id/url রেখে media relation বসাবে
const toProjectCard = (project) => {
  if (!project) return null;
  const images = project.attributes.sliderImages?.data?.map((img) => img.id) || [];
  return {
    title: project.attributes.title || '',
    subtitle: project.attributes.subtitle || '',
    message: project.attributes.message || '',
    images,
  };
};

async function main() {
  console.log('পুরনো content-type গুলো থেকে ডেটা পড়া হচ্ছে...');

  const [homeRes, ourProjectsRes, sliderRes, activitiesRes, founderRes] = await Promise.all([
    api('/home?populate[HomeBanner][populate]=image').catch(() => null),
    api('/our-projects?populate=sliderImages').catch(() => null),
    api('/home-slider?populate=sliderImages').catch(() => null),
    api('/recent-activities?populate=sliderImage').catch(() => null),
    api('/founder-message').catch(() => null),
  ]);

  const homeAttrs = homeRes?.data?.attributes || {};
  const banner = homeAttrs.HomeBanner
    ? {
        title: homeAttrs.HomeBanner.title || '',
        subtitle: homeAttrs.HomeBanner.subtitle || '',
        message: homeAttrs.HomeBanner.message || '',
        image: homeAttrs.HomeBanner.image?.data?.id || null,
      }
    : null;

  const projects = ourProjectsRes?.data || [];
  const project1 = projects.find((p) => p.id === 1); // মসজিদ কমপ্লেক্স
  const project2 = projects.find((p) => p.id === 2); // কুল্লিয়া
  const project3 = projects.find((p) => p.id === 3); // দারুল হাদিস

  const sliderImageIds =
    sliderRes?.data?.attributes?.sliderImages?.data?.map((img) => img.id) || [];

  const recentActivities = (activitiesRes?.data || [])
    .sort((a, b) => a.id - b.id)
    .map((activity) => ({
      title: activity.attributes.title || '',
      subtitle: activity.attributes.subtitle || '',
      para: activity.attributes.para || '',
      sliderImage: activity.attributes.sliderImage?.data?.id || null,
    }));

  const founderMessageId = founderRes?.data?.id || null;

  const payload = {
    data: {
      banner,
      aboutShortText: homeAttrs.aboutShortText || '',
      projectsSectionTitle: 'আমাদের প্রকল্পসমূহ',
      mosqueComplexCard: toProjectCard(project1),
      kulliyaCard: toProjectCard(project2),
      darulHadithCard: toProjectCard(project3),
      founderMessage: founderMessageId,
      introVideo: {
        title: 'এক নজরে ইমাম বুখারী ট্রাস্ট',
        videoId: 'C-g--nnudKU', // data/block.js-এর বর্তমান hardcoded ভ্যালু, migration-এর পর admin থেকে চাইলে বদলানো যাবে
      },
      recentActivities,
      academicCommittee: {
        showOnHome: false, // আগে home-এ এই section commented-out ছিল, তাই ডিফল্ট বন্ধ রাখা হলো
        title: 'একাডেমিক কমিটির সম্মানিত সদস্যবৃন্দ',
      },
      slider: sliderImageIds,
    },
  };

  console.log('নতুন home-page entry লেখা হচ্ছে...');
  const result = await api('/home-page', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  console.log('সম্পন্ন। নতুন home-page entry id:', result?.data?.id);
  console.log('এবার Strapi admin > Home Page-এ ঢুকে ডেটা চোখে দেখে যাচাই করে নিন,');
  console.log('বিশেষ করে project card-গুলোর ছবি এবং founder message relation ঠিকমতো বসেছে কিনা।');
}

main().catch((err) => {
  console.error('মাইগ্রেশন ব্যর্থ হয়েছে:', err.message);
  process.exit(1);
});
