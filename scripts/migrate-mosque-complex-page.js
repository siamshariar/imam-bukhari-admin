/**
 * পুরনো `imam-bukhari-detail`, `mosque-project-summary`, `mosque-main-activitie`,
 * `mosque-complex`, এবং `our-project`(id=1, home/about-এর প্রিভিউ কার্ডের জন্য) থেকে
 * ডেটা পড়ে নতুন `mosque-complex-page` singleType-এ একবার লিখে দেয়।
 *
 * চালানোর আগে: home-page migration-এর README (README-home-page-migration.md) একই
 * নিয়ম প্রযোজ্য — আগে schema deploy+restart, তারপর এই script।
 *
 * চালানোর নিয়ম:
 *   STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-mosque-complex-page.js
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error('STRAPI_URL এবং STRAPI_TOKEN env var হিসেবে দিতে হবে। উদাহরণ:');
  console.error('STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-mosque-complex-page.js');
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

async function main() {
  console.log('পুরনো content-type গুলো থেকে ডেটা পড়া হচ্ছে...');

  const [detailRes, summaryRes, activitiesRes, complexRes, ourProjectsRes] = await Promise.all([
    api('/imam-bukhari-detail').catch(() => null),
    api('/mosque-project-summary?populate[content][populate]=items&populate=sliderImages').catch(() => null),
    api('/mosque-main-activitie?populate[activities][populate]=image').catch(() => null),
    api('/mosque-complex?populate[items][populate]=title').catch(() => null),
    api('/our-projects?populate=sliderImages').catch(() => null),
  ]);

  const detailAttrs = detailRes?.data?.attributes;
  const detail = detailAttrs
    ? { title: detailAttrs.title || '', subtitle: detailAttrs.subtitle || '' }
    : null;

  const summaryAttrs = summaryRes?.data?.attributes;
  const projectSummary = summaryAttrs
    ? {
        title: summaryAttrs.title || '',
        content: summaryAttrs.content
          ? { items: summaryAttrs.content.items?.map((i) => ({ title: i.title || '' })) || [] }
          : null,
        sliderImages: summaryAttrs.sliderImages?.data?.map((img) => img.id) || [],
      }
    : null;

  const activitiesAttrs = activitiesRes?.data?.attributes;
  const mainActivities = activitiesAttrs
    ? {
        arbTitle: activitiesAttrs.arbTitle || '',
        bnText: activitiesAttrs.bnText || '',
        ref: activitiesAttrs.ref || '',
        title: activitiesAttrs.title || '',
        activities:
          activitiesAttrs.activities?.map((a) => ({
            title: a.title || '',
            image: a.image?.data?.id || null,
          })) || [],
      }
    : null;

  const complexAttrs = complexRes?.data?.attributes;
  const complexInfo = complexAttrs
    ? {
        title: complexAttrs.title || '',
        details: complexAttrs.details || '',
        items: complexAttrs.items?.map((i) => ({ title: i.title || '' })) || [],
      }
    : null;

  const project1 = (ourProjectsRes?.data || []).find((p) => p.id === 1);
  const homeCard = project1
    ? {
        title: project1.attributes.title || '',
        subtitle: project1.attributes.subtitle || '',
        message: project1.attributes.message || '',
        images: project1.attributes.sliderImages?.data?.map((img) => img.id) || [],
      }
    : null;

  const payload = {
    data: {
      homeCard,
      detail,
      projectSummary,
      mainActivities,
      complexInfo,
    },
  };

  console.log('নতুন mosque-complex-page entry লেখা হচ্ছে...');
  const result = await api('/mosque-complex-page', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  console.log('সম্পন্ন। নতুন mosque-complex-page entry id:', result?.data?.id);
  console.log('Strapi admin > Mosque Complex Page-এ ঢুকে ডেটা যাচাই করে Publish করুন।');
}

main().catch((err) => {
  console.error('মাইগ্রেশন ব্যর্থ হয়েছে:', err.message);
  process.exit(1);
});
